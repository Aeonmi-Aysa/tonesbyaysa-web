# SIMPLE_LOGIN_FIX.ps1 - Final fix for healtonefront

Write-Host "Reading login.html..." -ForegroundColor Cyan

$file = "login.html"

if (-not (Test-Path $file)) {
    Write-Host "❌ login.html not found!" -ForegroundColor Red
    exit 1
}

$content = Get-Content $file -Raw

# Remove any duplicate or deferred _config.js
$content = $content -replace '<script src="(/)?_config\.js" defer></script>', ''

# Ensure clean single config load right after title
$pattern = '(?s)<title>.*?</title>.*?<script src="https://cdn\.jsdelivr\.net/npm/@supabase/supabase-js@2"></script>'
$replacement = '<title>$&</title>

    <!-- CONFIG MUST LOAD FIRST -->
    <script src="_config.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>'

$content = [regex]::Replace($content, $pattern, $replacement)

# Replace the initSupabase function with the debug version
$initPattern = 'function initSupabase\s*\(\)\s*\{[\s\S]*?return null;?\s*\}'
$initReplacement = @'
function initSupabase() {
    console.log("🚀 initSupabase running...");
    console.log("window.ENV →", window.ENV);

    const supabaseUrl = window.ENV?.SUPABASE_URL;
    const supabaseAnonKey = window.ENV?.SUPABASE_ANON_KEY;

    console.log("SUPABASE_URL value:", supabaseUrl);
    console.log("SUPABASE_ANON_KEY length:", supabaseAnonKey ? supabaseAnonKey.length : 0);

    if (!supabaseUrl || !supabaseUrl.startsWith("https://")) {
        console.error("❌ Missing or invalid SUPABASE_URL in window.ENV");
        return null;
    }

    if (!supabaseAnonKey) {
        console.error("❌ Missing SUPABASE_ANON_KEY in window.ENV");
        return null;
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        console.log("✅ Supabase client created successfully");
        return supabase;
    } catch (err) {
        console.error("❌ createClient failed:", err);
        return null;
    }
}
'@

$content = [regex]::Replace($content, $initPattern, $initReplacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)

Set-Content -Path $file -Value $content -Encoding UTF8

Write-Host "✅ login.html fixed successfully!" -ForegroundColor Green
Write-Host "Now close this window, hard refresh your login page (Ctrl + Shift + R) and check the console." -ForegroundColor Green