const swag = require('./../models/swag')

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query

        if (category) {
            res.status(200).send(swag.filter((item) => item.category === category))
        }
        else {
            res.status(200).send(swag)
        }
    }
}