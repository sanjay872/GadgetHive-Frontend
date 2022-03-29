pipeline {
    agent any 
    stages {
        stage('Compile and Clean') { 
            steps {
                script {
                    try
                    {
                        sh "sudo rm -r dist"
                    }
                    catch(error){
                        "no dist directory found!"
                    }
                }
            }
        }
      
        stage('deploy') { 
            steps {
                sh "ng build"
            }
        }
        
        stage('stop the server'){
            steps{
                script{
                    try{
                        sh 'sudo service httpd stop'
                    }
                    catch(error){
                        echo 'server not running'
                    }
                }
            }
        }

        stage('move file to server')
        {
            steps{
                sh 'sudo cp dist/*  /var/www/html'
            }
        }

        stage('start the server'){
        	steps {
        		sh 'sudo service httpd start'
        	}
        }
    }
}