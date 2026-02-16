Write-Host "Starting Tones by Aysa Web Server..." -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\wlwil\Desktop\healtonefront"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""
Write-Host "Files in directory:" -ForegroundColor Yellow
Get-ChildItem -Name | Select-Object -First 10
Write-Host ""
Write-Host "Starting server on http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Open these URLs in your browser:" -ForegroundColor Cyan
Write-Host "  - Test Page: http://localhost:8000/test-payments.html" -ForegroundColor White
Write-Host "  - Payment Page: http://localhost:8000/premium-packages.html" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python -m http.server 8000
