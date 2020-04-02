"use strict"

function errorHandler(err, req, res, next) {
    console.log(err.name)
    if (err.name === 'ValidationError') {
        const firstIndex = err.message.indexOf(':')
        const oldData = err.message.slice(firstIndex + 1)
        const data = oldData.split(',')
        let temp = []
        data.forEach(element => {
            const check = element.split(':')
            temp.push(check[1])
        });
        const result = temp.join(',')
        res.status(404).json({
            status: 'Error',
            message: `${result}`
        })
    } else if (err.status === 404) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
    else {
        res.status(500).json(err.message)
    }
}

module.exports = errorHandler