# Skalavel

Skalavel is a typescript framework to create complete and scalables (**skalavel**)
web applications.

## Create a simple project

To create a simple project use the `skalavel` npm package:

```sh
mkdir my-skalavel-app
cd my-skalavel-app
npm init -y
npm install skalavel
```

Now create a file named index.js:

```javascript
// Import the necesary classes.
// - Server - Create a server
// - Router - Create a router in the server
// - Controller - Create a web controller
// - controllerLoader - Load a controller for the router, this is a function
// - log - An instance of the Log class to print with colours format
const { Server, Router, Controller, controllerLoader, log } = require('skalavel');

// Create a controller class named MainController, it has two methods
// the first method respond with a html response, and the second method
// respond with a json response.
class MainController extends Controller {
  html() {
    this.htmlRes('<h1>Hello, Skalavel!</h1>');
  }

  json() {
    this.jsonRes({ json: true });
  }
}

// Create the server and the router instances
const server = new Server();
const router = new Router();

// Now create the routes and load the MainController, calling the html method
// and the json method, the routes has the same names of the methods
router.get('/', controllerLoader(MainController, 'home')); // home, because the method of controller is named "home"
router.get('/json', controllerLoader(MainController, 'json')); // json, because the method of controller is named "json"

// Load the router in the server
server.setRouter(router);

// Listen the server, and print with colours using the log skalavel library, pass
// the port, and then a callback.
const PORT = 8000;

server.listen(PORT, () => {
  log.success(`Server is listening successfully on port ${PORT}`);
});
```

## Explaining

In this example, we view a lot of concepts:

- Server

With the server you must create a http server, the main proposite
of the server, is load the router, and listen the application in a specified
port.

- Router

The router create the routes for the server. The router is manually integrated with
the server (use the `Server.setRouter` method). To load the controllers use the
`controllerLoader` function as this:

```javascript
router.get('/get', controllerLoader(MyController, 'getRoute'));
router.post('/post', controllerLoader(MyController, 'postRoute'));
router.put('/put', controllerLoader(MyController, 'putRoute'));
router.delete('/delete', controllerLoader(MyController, 'deleteRoute'));
```

The methods of the router are:

- get (parameters: url, callback)
- post (parameters: url, callback)
- put (parameters: url, callback)
- delete (parameters: url, callback)

The internal methods of the router are:

- \_createRoute (parameters: method, url, callback)

The internal properties of the router are:

- \_register (The routes register)

- log (Log)

The log contains a methods for show pretty printed logs (with colours), the
methods of the log library are:

- success (green)
- error (red & exit with statuscode 1)
- warning (yellow)
- info (blue)

- Controller - controllerLoader

The Controller class contains a methods for create a web controller, the controllerLoader,
process the Controller `_register` and pass it to the router, the router validate the `_register`
object, and pass it to the server, rendering your response. The methods of the Controller class are:

- htmlRes - Send a html response
- jsonRes - Send a json response
- redirect - Redirect to a passed url

Methods arguments:

- htmlRes: (response: string, statuscode: number)
- jsonRes: (response: string, statuscode: number)
- redirect (url: string)

The internal methods are:

- \_rawRes - Send a raw or custom response, parameters: (response: string, headers: object, statuscode: number)

The internal data are:

- req - The http req object (http.IncomingMessage)
- \_register - The controller history register, it's processed by the controller loader

The controllerLoader, receive this parameters:

- Controller (skalavel.Controller) - A class extending the skalavel.Controller class.
- method (string) - The method to execute (in string format) of the Controller parameter

## Using skalavel with typescript

To use skalavel with typescript, see the following steps:

- **Setup a typescript project**

```sh
mkdir ~/my-skalavel-typescript-project
cd ~/my-skalavel-typescript-project
yarn init -y
yarn add -D typescript @types/node ts-node nodemon
yarn add skalavel
# Edit the package.json
vim package.json
```

Configure the `start` and the `build` and the `dev` command.

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "nodemon --exec ts-node dist/index.js --watch src --ext .js,.ts"
  }
}
```

Create a typescript project with `tsc`:

```sh
npx tsc --init
# Edit the tsconfig.json
vim tsconfig.json
```

Place this content on this:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "downlevelIteration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "exclude": ["node_modules", "**/__tests__/*"]
}
```

Now create a `src` and `dist` folders and edit the `src/index.ts` file (create it!)

```sh
mkdir src dist
touch src/index.ts
vim src/index.ts
```

Place this content in it file:

```typescript
// Import all necesary elements
import { Server, Router, Controller, controllerLoader, log } from 'skalavel';

// Create the interface of the MainController, type anotations for controller
interface IMainController {
  html(): void;
  json(): void;
  redirection(): void;
}

// Create the `MainController` and implement `IMainController`
class MainController extends Controller implements IMainController {
  html(): void {
    this.htmlRes('<h1>Hello, World!</h1>');
  }

  json(): void {
    this.jsonRes({ json: true });
  }

  redirection(): void {
    // Redirect to /, rendering a html response
    this.redirect('/');
  }
}

// Define the app constants
const PORT: number = 8000;

// Create the server and the router
const server: Server = new Server();
const router: Router = new Router();

// Create the routes using the router and the controllerLoader
router.get('/', controllerLoader(MainController, 'html'));
router.get('/json', controllerLoader(MainController, 'json'));
router.get('/redirection', controllerLoader(MainController, 'redirection'));

// Load the router on the server
server.setRouter(router);

// Listen the server
server.listen(PORT, (): void => {
  log.success(`Server is listening on port ${PORT}`);
});
```

Now execute your app on develop mode:

```sh
yarn dev
```

Go to `localhost:8000` and test this routes:

- / - Render a html response
- /json - Render a json response
- /redirection - Redirect to /

If the web browser is keep loading infinity, please report it on a issue (place your code!)

**NOTE**: The possibly problem is in the router, or you are visiting a not
found page (the not found page (404) does not exists)

If you want to compile your application for production use this commands sequence:

```sh
yarn build
yarn start
```

It create a folder named `dist` in it exists the file `index.js` (the compiled code)

**NOTE**: Between this, all code is writed on typescript

## Skalavel Tasks

The tasks are functions that executes before the server listen, to create it use the
`skalavel.Task` class, and extend it as this:

```typescript
import { Task, log } from 'skalavel';

class PrintPortTask extends Task {
  // All tasks main function is named run
  run(): void {
    log.info('The server is programmed to run in the port 8000');
  }
}
```

Now load it on the server, like this:

```sh
server.setTasks([PrintPortTask])
```

It is all, your tasks are executed before the server listen.

## Thank you

Skalavel is in develop. The features to the future are:

- Middlewares
- Router
  - Get routes (with parameters)
  - Delete routes (with parameters)

This "framework" is inspired in [archos.js](https://github.com/AlphaTechnolog/archos.js), why I
rewrite `archos.js` in typescript.

Skalavel is rewrited because:

- Archos.js is too unmaintainable
- Archos.js is not in [npmjs](https://npmjs.com)
- Archos.js is not multiplatform

Now Skalavel is to manually to programming, I'm engaged to create a cli (like Archos.js cli)
for skalavel, but in `npm`

## Changelog

Version 0.1.1:

- Created a global app state named `global` at `skalavel` package
- Created a environment parser (`.env` parser with dotenv) named `env` it load's all data in the global state

Version 0.1.2:

- Added Changelog to `README.md`

Version 0.1.3:

- Removed testing `.env` file

Version 0.1.4:

- Added an option in the environment library to get a parsed dotenv value

Version 0.1.5:

- Updated README.md

Version 0.1.6:

- Fixing README.md problems

## Examples

Coming soon...