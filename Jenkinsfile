pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling latest code...'
            }
        }

        stage('Install') {
            steps {
                dir('brewhouse_bot') {
                    sh 'npm ci'
                }
            }
        }

        stage('Test') {
            steps {
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
                        sh 'cd /opt/brewhouse-bot && npm install --omit=dev'
                        sh 'pm2 delete brewhouse-bot || true'
                        sh "TELEGRAM_TOKEN=${TELEGRAM_TOKEN} pm2 start /opt/brewhouse-bot/src/bot.js --name brewhouse-bot"
                        sh 'pm2 save'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Bot is live!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}