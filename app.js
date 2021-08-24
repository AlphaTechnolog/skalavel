const {
  Server,
  Router,
  Controller,
  controllerLoader,
} = require('./lib');

class MyController extends Controller {
  html() {
    this.htmlRes('<h1>Hello, World!</h1>');
  }

  json() {
    this.jsonRes({
      hello: 'world',
    });
  }
}

const server = new Server();
const router = new Router();

router.get('/', controllerLoader(MyController, 'html'));
router.get('/json', controllerLoader(MyController, 'json'));

server.setRouter(router);

server.listen(8000, () => {
  console.log('Listening on port', 8000);
});
