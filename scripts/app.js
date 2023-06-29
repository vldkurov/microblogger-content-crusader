const {app, axios} = require('../index')

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

app.get("/start-page", async (req, res) => {
    try {
        const response = await instance({
            url: "author/home",
            method: "get",
        });
        // res.status(200).json(response.data);
        res.status(200).render('pages/author/home.html', {
            records: response.data
        })
    } catch (err) {
        res.status(500).json({message: err});
    }
});

