pipeline {
   agent any
   environment {
       NODE_HOME = "C:\\Program Files (x86)\\nodejs"
       PATH = "${env.NODE_HOME}\\;${env.PATH}"
   }
   stages {
       stage('Checkout') {
           steps {
               // Checkout code from GitHub using credentials
               git url: 'https://github.com/nttd-Shreyas/DemoPlaywrightJenkins.git',
                   branch: 'main'
           }
       }
       stage('Install Dependencies') {
           steps {
               script {
                   // Ensure npm is installed and then install Playwright
                   bat 'npm install'
               }
           }
       }
       stage('Run Playwright Tests') {
           steps {
               script {
                   // Run Playwright tests
                   bat 'npx playwright test'
               }
           }
       }
   }
   post {
       always {
           // Archive test results or other artifacts if needed
           // archiveArtifacts artifacts: '**/test-results.xml'
           bat 'echo Build Finished!'
       }
   }
}