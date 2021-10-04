# Choose your car web app
This project needs server running on 8080 with specific endpoints

## Steps to Install
  * Download and Install [node](https://nodejs.org/en/download/)
  * Install [Vue-cli](https://cli.vuejs.org/guide/installation.html)
## Commands to Development
```
 npm install
``` 
Start node server

```
cd apiserver

node apiserver/server.js
```
In a new terminal [/choose-your-car]

```
 npm run serve
```
## Features
- You can choose make and model of vehicles you want to look at
- Filter and Sort the vehicle based on your preference
- Can view both Card and Table formats
- Only Card mode on Monile
- Pagenation is also implemented on Table
- Most of the html code is in Pure HTML and CSS , no external library components are used
- Can make it feature rich and look modernized , will be adding it if i get some more time and allow the usage external libraries
- TSLint and Typescript for code quality purposes

# TSLint
This project includes a tslint config with AirBnb style. For a better experience, install VSCode Ext `TSLint Vue-TSX` and add Custom Setting:
```
"tslint.enable": true,
"tslint.autoFixOnSave": true,
```
