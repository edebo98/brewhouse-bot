pipeline {
    agent any

    environment {
        APP_DIR = '/home/ubuntu/brewhouse-bot'
        APP_NAME = 'brewhouse-bot'
        TELEGRAM_TOKEN = credentials('TELEGRAM_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/edebo98/brewhouse-bot'
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Running npm install...'
                dir('brewhouse_bot') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run tests') {
            steps {
                echo 'Running test suite...'
                dir('brewhouse_bot') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
    steps {
        withCredentials([string(credentialsId: 'TELEGRAM_TOKEN', variable: 'TELEGRAM_TOKEN')]) {
            sh 'mkdir -p /opt/brewhouse-bot'
            dir('brewhouse_bot') {
                sh 'rsync -a --exclude=node_modules --exclude=.git --exclude=.env . /opt/brewhouse-bot/'
                sh 'cd /opt/brewhouse-bot && npm ci --omit=dev'
                sh 'pm2 delete brewhouse-bot || true'
                sh "TELEGRAM_TOKEN=${TELEGRAM_TOKEN} pm2 start /opt/brewhouse-bot/src/bot.js --name brewhouse-bot"
                sh 'pm2 save'
            }
        }
    }
}

    post {
        success {
            echo 'Pipeline passed - Brew House bot is live!'
        }
        failure {
            echo 'Pipeline failed - previous version still running.'
        }
    }
}