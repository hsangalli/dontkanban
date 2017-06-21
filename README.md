# Kanban
Project developed with Vue.js, Node (Express) and MongoDB.

## Requirements
Before running the project, you need to install the following programs:  
> **Node.js**  
> **NPM**  

## Installation  
> ```git clone https://github.com/hsangalli/kanban.git```  
> ```cd kanban```  

## Run With Docker

The big advantage to run with docker is that the Mongo database is already configured, you don't need to worry about database configurations.
### Requirements Docker
To run with docker you need the programs:
> **Docker**  
> **Docker-compose**

### Start Server
To run the project with docker, execute:
> ```make run```

or

> ```docker-compose up```

## Run Without Docker
Execute
> ```npm install```  

And set the environment variable ```MONGO_URL``` to a valid mongo instance.
Example:
> ```export MONGO_URL=mongodb://localhost/kanban```  

### Start Server
To run the application, execute:
> ```node server.js```  



Open your browser in http://localhost:3000/
