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

<details>

  <summary>Click to Open</summary>
  
### Requirements Docker
To run with docker you need the programs:
> **Docker**  
> **Docker-compose**

### Start Server
To run the project with docker, execute:
> ```make run```

or

> ```docker-compose up```

</details>

## Run Without Docker

<details>

  <summary>Click to Open</summary>
  
  
To run without Docker execute
> ```npm install```  

And set the environment variable ```MONGO_URL``` to a valid mongo instance.
Example:
> ```export MONGO_URL=mongodb://localhost/kanban```  

### Start Server
To run the application, execute:
> ```node server.js```  

</details>

Open your browser in http://localhost:3000/
