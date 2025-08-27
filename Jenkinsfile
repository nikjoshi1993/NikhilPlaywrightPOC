pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root'
        }
    }
    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
        stage('Publish Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                junit 'playwright-report/*.xml'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
