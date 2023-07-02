const {ctrlWrapper} = require("../../helpers");
const main = async (req, res) => {
    res.render('index.html')
}

module.exports = {
    main: ctrlWrapper(main)
}