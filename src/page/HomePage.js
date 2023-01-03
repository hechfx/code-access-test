
const Page = require("../structures/Page");

module.exports = class HomePage extends Page {
    constructor() {
        super("/", {
            isPrivate: true
        })
    }

    async onLoad(req, res, accessHandler) {
        const ip = req.headers["x-forwarded-for"]
        const userCode = accessHandler.users[ip]
		let protocol;
		
		if (req.get("host") === "localhost") {
			protocol = "http"
		} else {
			protocol = "https"
		}

        if (req.query["code"] !== userCode || userCode === undefined) {
            return res.render("request", {
                url: `${protocol}://${req.get("host")}`
            })
        } else {
            res.redirect("/endpoint")
        }
    }
}