import {
  Server,
  Router,
  Controller,
  controllerLoader,
  Validator
} from './lib/index.js'

class HomeController extends Controller {
  home() {
    const validator = new Validator(this.req.body, {
      name: 'required|string',
      description: 'required|string|min:10',
      completed: 'required|boolean',
      betweenTest: 'required|string|between:2,4',
    })
    if (!validator.ok()) {
      return this.jsonRes(validator.getErrors(), 400)
    }

    this.jsonRes(this.req.body)
  }
}

const server = new Server()
const router = new Router()

router.post('/', controllerLoader(HomeController, 'home'))

server.setRouter(router)

server.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
