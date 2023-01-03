const fs = require("fs")

module.exports = class WebServer {
    constructor() {
        this.express = require("express")()
        this.pages = []
    }

    async startListening(port, ip, accessHandler) {
        this.express.set('views', "D:\\Documents\\idwk\\src\\views");
        this.express.set('view engine', 'ejs');

        let pages = await this.loadPages()

        this.express.get("/favicon.ico", (req, res) => {
            res.sendFile("D:\\Documents\\idwk\\src\\resources\\images\\coca.png")
        })

        this.express.get("/static/css", (req, res) => {
            res.sendFile("D:\\Documents\\idwk\\src\\resources\\css\\css.css")
        })

        pages.forEach(page => {
            this.express.get(page.path, (req, res) => {
                const ip = req.headers["x-forwarded-for"]

                console.log(`${ip} is connecting.`)

                page.onLoad(req, res, accessHandler)
            })
        })

        this.express.listen(port, ip, () => {
            console.log(`${ip} listening on ${port}`)
        })
    }

    async loadPages() {
        const files = fs.readdirSync("src/page")

        files.forEach(file => {
            this.pages.push(new (require(`./../page/${file}`)))
        })

        return this.pages
    }
}