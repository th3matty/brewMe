# BrewMe

BrewMe is app which allows Hobby-Brewers making Receipes and sharing those with friends

22.04.21 Project is still in development

## Installation

For the installation you need to clone both projects. "BrewMe" & "matthis-brew-backend"

#### BrewMe
Use the package manager npm to install BrewMe

```bash
npm install
```
#### matthis-brew-backend

For this repo you need to follow a few steps.

1. clone project ( you find it listed in my repos)
2. You need an account on MongoDB. Create a cluster and get the link on hitting the button "Connect" => Connect your applicaction => "your LINK"
3. create on root level a nodemone.json file with following content
 
```bash
nodemon.json 

{
  "env": {
    "NODE_ENV": "development",
    "MONGO_CONNECT": "YOUR MONGODB CLUSTER", => The link you created in step 2
    "CREATE_KEY": "Password",
    "TOKEN_EXPRES_MIN": 30,
    "SALTING_ROUNDS": 12,
    "AUTH_ENDPOINT": "http://localhost:3000/",
    "GREETER": "Hello",
    "LOGIN_URL": "http://localhost:4006/#/login",
    "PORT": 3000
  }
}

after inserting tis file, => npm install

Start the server with npm script "start:dev - matthis...."
Server is up and running on Port 3000

Then you can start running "BrewMe" with npm start ( on port 4006 )

Thats it.
You can registrate your first user.

Right now (22.04.21) you can confirm your emailadress 
after creating a user on clicking the link showing in the terminal(have a look in the backend!)
Follow the link and you should receive a message in the browser that it went succesfully.

Afterwards you can login(frontend) and hopefully enjoy the app :)

```


