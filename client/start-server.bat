@echo off
echo ?? Starting VinFast V-Green Frontend Server...
echo ?? Serving from: %CD%
echo ?? URL: http://localhost:8080
echo.
python -m http.server 8080
