@echo off
title MEAN To-Do App

echo ============================================
echo   MEAN Stack To-Do List App
echo ============================================
echo.

:: Check that Node.js and npm are available before doing anything else
where node >nul 2>&1
if errorlevel 1 (
	echo ERROR: Node.js is not installed or is not available on PATH.
	pause
	exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
	echo ERROR: npm is not installed or is not available on PATH.
	pause
	exit /b 1
)

:: Install backend dependencies only when the dependency tree is missing/incomplete
if not exist "%~dp0backend\node_modules\express\" (
	echo Installing backend dependencies...
	pushd "%~dp0backend"
	call npm ci --no-audit --no-fund
	if errorlevel 1 (
		echo ERROR: Backend dependency installation failed.
		popd
		pause
		exit /b 1
	)
	popd
) else (
	echo Backend dependencies are ready.
)

:: Install frontend dependencies only when the dependency tree is missing/incomplete
if not exist "%~dp0frontend\node_modules\@angular\cli\" (
	echo Installing frontend dependencies...
	pushd "%~dp0frontend"
	call npm ci --no-audit --no-fund
	if errorlevel 1 (
		echo ERROR: Frontend dependency installation failed.
		popd
		pause
		exit /b 1
	)
	popd
) else (
	echo Frontend dependencies are ready.
)

echo.

:: Start the Express backend in a new window
echo [1/2] Starting backend on http://localhost:3000 ...
start "Backend - Node/Express" cmd /k "cd /d "%~dp0backend" && node server.js"

:: Small delay so backend has a moment to spin up
timeout /t 2 /nobreak >nul

:: Start the Angular dev server in a new window
echo [2/2] Starting frontend on http://localhost:4200 ...
start "Frontend - Angular" cmd /k "cd /d "%~dp0frontend" && npx ng serve --open"

echo.
echo Both servers are starting in separate windows.
echo.
echo   Backend  ^>  http://localhost:3000
echo   Frontend ^>  http://localhost:4200
echo.
echo Close this window or press any key to exit.
pause >nul
