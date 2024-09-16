pipeline {
   agent any
//    environment {
//        NODE_HOME = tool name: 'NodeJS 18.x', type: 'NodeJS'
//        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
//    }
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
                   bat 'npm test'
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