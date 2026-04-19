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
                echo 'Deploying to production...'
                sh """
                    rsync -a \
                      --exclude='node_modules' \
                      --exclude='.git' \
                      --exclude='.env' \
                      brewhouse_bot/ ${APP_DIR}/

                    cd ${APP_DIR}

                    npm ci --omit=dev

                    pm2 delete ${APP_NAME} || true

                    TELEGRAM_TOKEN=${TELEGRAM_TOKEN} pm2 start src/bot.js --name ${APP_NAME}

                    pm2 save
                """
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