@echo off
git init
git remote set-url origin https://github.com/MilPredo/XenoCore.git
taskkill /im node.exe /f
echo Fetching latest dev branch...
git checkout develop
git pull origin develop
echo Done!...
echo Starting InSys!...
npm i
start cmd /k "echo Starting Front-End Application... && npm run dev && exit"
cd server
npm i
start cmd /k "echo Starting Back-End Application... npm run dev && exit"
echo running...
start "" "http://127.0.0.1:5173"
taskkill /im node.exe /f
pause