const Page = require("../structures/Page");

module.exports = class EndpointPage extends Page {
    constructor() {
        super("/endpoint")
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
            res.render("request", {
                url: `${protocol}://${req.get("host")}`
            })
        } else {
            res.render("endpoint", {
                url: `${protocol}://${req.get("host")}`,
                ip: ip,
                code: userCode
            })
        }
    }
}