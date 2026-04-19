#!/bin/bash
set -e
exec > /var/log/userdata.log 2>&1

echo "=== Starting setup at $(date) ==="

echo "=== Updating system ==="
apt-get update -y
apt-get upgrade -y

echo "=== Installing Java ==="
apt-get install -y openjdk-17-jdk

echo "=== Installing Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "=== Installing PM2 ==="
npm install -g pm2

echo "=== Installing Jenkins ==="
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \
  tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | \
  tee /etc/apt/sources.list.d/jenkins.list > /dev/null

apt-get update -y
apt-get install -y jenkins

echo "=== Starting Jenkins ==="
systemctl start jenkins
systemctl enable jenkins

echo "=== Configuring permissions ==="
usermod -aG ubuntu jenkins

ln -sf $(which node) /usr/local/bin/node
ln -sf $(which npm) /usr/local/bin/npm
ln -sf $(which pm2) /usr/local/bin/pm2

echo "=== Creating app directory ==="
mkdir -p /home/ubuntu/brewhouse-bot
chown ubuntu:ubuntu /home/ubuntu/brewhouse-bot

echo "=== Setup complete at $(date) ==="