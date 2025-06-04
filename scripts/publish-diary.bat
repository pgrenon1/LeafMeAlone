@echo off
cd /d %~dp0..
curl -X POST http://localhost:3000/api/publish-diary 