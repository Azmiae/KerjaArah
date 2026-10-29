@echo off
setlocal
cd /d "%~dp0"

:: Cek argumen CLI (misal: run.bat backend / run.bat frontend / run.bat all / run.bat stop)
if /i "%1"=="backend" goto start_backend
if /i "%1"=="frontend" goto start_frontend
if /i "%1"=="all" goto start_all
if /i "%1"=="stop" goto stop_all
if /i "%1"=="kill" goto stop_all

:menu
cls
title KerjaArah Launcher
echo ============================================================
echo                 KERJAARAH - LAUNCHER
echo ============================================================
echo.
echo   [1] Jalankan Keduanya (Backend + Frontend) - Rekomendasi
echo   [2] Jalankan Backend Saja (Port 8000)
echo   [3] Jalankan Frontend Saja (Port 5173)
echo   [4] Hentikan Semua Layanan yang Berjalan (Stop Port 8000 & 5173)
echo   [5] Keluar
echo.
echo ============================================================
set /p opt="Pilih opsi [1-5] (Tekan Enter untuk [1]): "
if "%opt%"=="" set opt=1
if "%opt%"=="1" goto start_all
if "%opt%"=="2" goto start_backend
if "%opt%"=="3" goto start_frontend
if "%opt%"=="4" goto stop_all
if "%opt%"=="5" exit /b 0
goto menu

:stop_all
title KerjaArah - Stop Services
echo ============================================================
echo   Menghentikan Layanan KerjaArah...
echo ============================================================
echo.
echo [1/2] Menghentikan proses di Port 8000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":8000\>"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo [2/2] Menghentikan proses di Port 5173 ^& 5174 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":5173\> :5174\>"') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo.
echo [OK] Semua proses pada port 8000, 5173, dan 5174 telah dibebaskan.
echo.
pause
goto menu

:start_all
echo.
echo [1/3] Membebaskan port 8000 & 5173 dari proses sebelumnya...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":8000\>"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":5173\> :5174\>"') do taskkill /F /PID %%a >nul 2>&1

echo [2/3] Menjalankan Backend dan Frontend di jendela terpisah...
start "KerjaArah Backend (Port 8000)" cmd /c ""%~f0" backend"
start "KerjaArah Frontend (Port 5173)" cmd /c ""%~f0" frontend"
echo.
echo [3/3] [OK] Layanan telah dimulai bersih:
echo - Frontend Web : http://localhost:5173
echo - Backend API  : http://127.0.0.1:8000
echo - Swagger Docs : http://127.0.0.1:8000/docs
echo.
timeout /t 5 >nul
exit /b 0

:start_backend
title KerjaArah - Backend (Port 8000)
echo ============================================================
echo   Backend KerjaArah (FastAPI)
echo   Alamat: http://127.0.0.1:8000 (Docs: /docs)
echo ============================================================
echo.
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":8000\>"') do taskkill /F /PID %%a >nul 2>&1
cd /d "%~dp0backend"
if exist ".venv\Scripts\python.exe" (
    ".venv\Scripts\python.exe" main.py
) else (
    python main.py
)
if %ERRORLEVEL% NEQ 0 pause
exit /b 0

:start_frontend
title KerjaArah - Frontend (Port 5173)
echo ============================================================
echo   Frontend KerjaArah (Vite React)
echo   Alamat: http://localhost:5173
echo ============================================================
echo.
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /r ":5173\> :5174\>"') do taskkill /F /PID %%a >nul 2>&1
cd /d "%~dp0frontend"
cmd /c "npm run dev"
if %ERRORLEVEL% NEQ 0 pause
exit /b 0

