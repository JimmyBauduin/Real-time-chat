# T-JAV-501-LIL-5-1-dashboard-jimmy.bauduin

#job_board
job_board is a job offer website

##Installation

Use the package manager nodejs with Node Package Manager.
After clone or install this projects and launch in the folder associate (You will have to do this for the client folder and the server folder) :

```bash
npm install
```

```bash
npm start
```

### Usage
There are 2 package.json cause we have client and server in this project.

CLient : 

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "^5.0.0",
    "react-select": "^5.2.2",
    "socket.io-client": "^4.4.0",
    "web-vitals": "^2.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Server :

```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.2",
    "moment": "^2.29.1",
    "mongoose": "^6.1.8",
    "nodemon": "^2.0.15",
    "react-router-dom": "^5.3.0",
    "socket.io": "^4.4.0"
  }
}
```
