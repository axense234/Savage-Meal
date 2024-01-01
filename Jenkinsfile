pipeline {
  agent any
  stages {
    stage('Git Setup') {
      parallel {
        stage('Git Setup') {
          steps {
            git(url: 'https://github.com/axense234/Savage-Meal.git', branch: 'master')
          }
        }

        stage('NPM Check') {
          steps {
            sh 'npm --version'
          }
        }

      }
    }

    stage('AWS ECR Login') {
      steps {
        sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g6t2k7y6'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t savage-meal-ts .'
      }
    }

    stage('AWS ECR Push') {
      steps {
        sh 'docker tag savage-meal-ts:latest public.ecr.aws/g6t2k7y6/savage-meal-ts:latest'
        sh 'docker push public.ecr.aws/g6t2k7y6/savage-meal-ts:latest'
      }
    }

  }
}