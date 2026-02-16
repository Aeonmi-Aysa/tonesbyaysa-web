@echo off
echo Starting Tones by Aysa Web Server...
echo.
cd /d C:\Users\wlwil\Desktop\healtonefront
echo Current directory: %CD%
echo.
echo Starting server on http://localhost:8000
echo.
echo Open these URLs in your browser:
echo   - Test Page: http://localhost:8000/test-payments.html
echo   - Payment Page: http://localhost:8000/premium-packages.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
