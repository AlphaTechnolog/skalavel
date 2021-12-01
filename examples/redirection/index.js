const {
  Server,
  Router,
  Controller,
  controllerLoader,
  log,
  global,
  Renderer
} = require('skalavel')

const path = require('path')

global.set('port', 8000)

class HomeController extends Controller {
  renderer = new Renderer()

  created () {
    this.rendererSettings()
  }

  rendererSettings () {
    console.log('hello')
    this.renderer.setViewPrefix(path.join(__dirname))
  }

  index () {
    this.redirect('/home')
  }

  home () {
    this.htmlRes(this.renderer.getRendered('index.html', {
      title: 'Welcome to the redirection example',
      text: 'Look at the url, and you can try to go to the / route and you will be redirected to /home (this)',
    }))
  }
}

const server = new Server()
const router = new Router()

router.get('/', controllerLoader(HomeController, 'index'))
router.get('/home', controllerLoader(HomeController, 'home'))

server.setRouter(router)

server.listen(global.fetch('port'), () => {
  log.success(`Server is listening on port ${global.fetch('port')}`)
})