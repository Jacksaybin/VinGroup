import http.server
import socketserver
import os

PORT = 3003
os.chdir(r'C:\VINFAST - VGREEN\client')

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🌐 Frontend server running on http://localhost:{PORT}")
    httpd.serve_forever()
