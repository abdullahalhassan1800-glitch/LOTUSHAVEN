$proc = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "G:\realestate" -WindowStyle Hidden -PassThru
$proc.WaitForExit()
