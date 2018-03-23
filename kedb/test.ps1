param($minutes = 15)
#15=1h
$myShell = New-Object -com "Wscript.Shell"

for ($i = 0; $i -lt $minutes; $i++) {
  Start-Sleep -Seconds 250
  $myShell.sendkeys(".")
}

#open powershell and execute below cmds

#Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

#D:\Users\fkhan1\Desktop\AMS\test.ps1