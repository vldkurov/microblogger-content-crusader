const {LocalStorage} = require("node-localstorage");
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const headers = async (req, res, next) => {

    const token = JSON.parse(localStorage.getItem('token'))

    req.headers['authorization'] = 'Bearer' + ' ' + `${token}`

    next()
}

module.exports = headers