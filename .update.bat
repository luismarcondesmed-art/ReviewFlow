@echo off
cd /d "%~dp0"
node scripts/autosubmit.mjs --once
exit /b %errorlevel%
