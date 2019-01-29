const swag = require('./../models/swag')

module.exports = {
    add: (req, res, next) => {
        const { cart } = req.session.user
        const { id } = req.query

        const item = cart.findIndex((item) => item.id == id)

        if (item === -1) {
            const swagItem = swag.find((item) => item.id == id)
            
            if(swagItem) {
                cart.push(swagItem)
                req.session.user.total += swagItem.price
            }
        }

        res.status(200).send(req.session.user)
    },
    delete: (req, res, next) => {
        const { id } = req.query
        const { cart } = req.session.user

        const swagItem = swag.find((item) => item.id == id)

        if (swagItem) {
            cart.splice(cart.findIndex((item) => item.id == id), 1)
            req.session.user.total -= swagItem.price
        }


        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        const { user } = req.session
        user.cart = []
        user.total = 0

        res.status(200).send(req.session.user)
    }
}