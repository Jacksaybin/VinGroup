#!/bin/bash
# Script cài đặt các tiện ích phát triển cho Ubuntu VPS
# Chạy với quyền root hoặc sudo

set -e

# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài đặt các tiện ích cơ bản
sudo apt install -y curl wget htop unzip build-essential git

# Cài đặt Node.js & npm (LTS)ssh -p 36361 ubuntu@157.66.158.186
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Cài đặt PM2
yarn_global="$(npm list -g yarn | grep yarn)"
if [ -z "$yarn_global" ]; then
  sudo npm install -g pm2
fi

# Cài đặt Docker
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  rm get-docker.sh
fi

# Cài đặt code-server
if ! command -v code-server &> /dev/null; then
  curl -fsSL https://code-server.dev/install.sh | sh
fi

echo "Hoàn tất cài đặt các tiện ích phát triển!"
echo "Khởi động lại VPS hoặc đăng xuất để áp dụng nhóm Docker cho user."
