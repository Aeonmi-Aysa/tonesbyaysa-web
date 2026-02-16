export default async (request: Request, context: any) => {
  const url = new URL(request.url);
  
  // Only inject env vars for HTML pages
  if (!url.pathname.endsWith('.html') && url.pathname !== '/') {
    return context.next();
  }

  const response = await context.next();
  let html = await response.text();

  // Inject environment variables before any <script> tag
  const envScript = `
  <script>
    window.ENV = {
      SUPABASE_URL: '${Deno.env.get('SUPABASE_URL') || ''}',
      SUPABASE_ANON_KEY: '${Deno.env.get('SUPABASE_ANON_KEY') || ''}',
      STRIPE_PUBLISHABLE_KEY: '${Deno.env.get('STRIPE_PUBLISHABLE_KEY') || ''}'
    };
  </script>
  `;

  // Insert before the first <script> tag or before </head>
  if (html.includes('<script>')) {
    html = html.replace('<script>', envScript + '<script>');
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', envScript + '</head>');
  } else {
    // Fallback: add at the end of body
    html = html.replace('</body>', envScript + '</body>');
  }

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
};

export const config = {
  path: "/*",
};
