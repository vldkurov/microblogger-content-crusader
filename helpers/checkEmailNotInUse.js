const checkEmailNotInUse = async (req, res, next) => {
    console.log('req.body', req.body);
}

module.exports = checkEmailNotInUse

// custom: {
//     options: async (email) => {
//         let params = [email]
//         let sql = 'SELECT name, email FROM authors WHERE email=?'
//
//         await db.get(sql, params, function (err, rows) {
//             if (rows) {
//                 throw new Error(`E-mail ${email} already in use`)
//             }
//         })
//     }
// },