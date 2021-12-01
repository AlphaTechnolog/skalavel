const {
  Server,
  Router,
  Controller,
  controllerLoader,
  log,
  global,
  renderer
} = require('skalavel')

const path = require('path')

renderer.setViewPrefix(path.join(__dirname)) // This sets this __dirname to the views directory
global.set('port', 8000)

class HomeController extends Controller {
  home () {
    this.htmlRes(renderer.getRendered('index.html', {
      title: 'Welcome to my simple skalavel server',
      text: 'This is a test skalavel simple-server',
    }))
  }
}

const server = new Server()
const router = new Router()

router.get('/', controllerLoader(HomeController, 'home'))

server.setRouter(router)

server.listen(global.fetch('port'), () => {
  log.success(`The server is listening on port ${global.fetch('port')}`)
})