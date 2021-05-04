// repository code for carts
//      {
//          cart id: "925",
//          products: [{ id: 123, quantity: 1},
//                     {id: 345, quantity, 2}
//          ]
//      }
const Repository = require('./repository')

class CartsRepository = extend Repositroy {}

module.exports = new CartsRepository('carts.json')