$serverPath = "G:\realestate"
$serverScript = "server.js"
$logFile = "G:\realestate\server.log"

function Start-Server {
    & "C:\Program Files\nodejs\node.exe" "$serverPath$serverScript" >> $logFile 2>&1
}

# Check if already running
$existing = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node*" }
if ($existing) {
    Write-Host "Server is already running (PID: $existing.Id)"
} else {
    Write-Host "Starting server..."
    Start-Server
}
