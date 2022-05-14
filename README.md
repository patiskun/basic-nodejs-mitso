# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package
  manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop). 

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```
## Or Running via docker
Run in terminal:

```
 docker-compose up
```
If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:
```
 docker-compose down
```
Rebuild images & start containers:
```
 docker compose up --build 
```
Сonnected services:

- PostgreSQL
- pgAdmin
- Express

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation
by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit
https://swagger.io/.

## Development

If you're using VSCode, you can get a better developer experience from integration with
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
