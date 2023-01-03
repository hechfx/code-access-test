const Page = require("../structures/Page");


module.exports = class RequestAccessPage extends Page {
    constructor() {
        super("/request")
        this.r = (Math.random() + 1).toString(36).substring(7);
    }

    async onLoad(req, res, accessHandler) {

        const ip = req.headers["x-forwarded-for"]
		
		let protocol;
		
		if (req.get("host") === "localhost") {
			protocol = "http"
		} else {
			protocol = "https"
		}

        switch(accessHandler.users.has(ip)) {
            case true:
                res.send(`your key is ${accessHandler.users[ip]}`)
                break;
            case false:
                accessHandler.users[ip] = this.r

                res.render("code", {
                    code: accessHandler.users[ip],
                    url: `${protocol}://${req.get("host")}`
                })
                break;
        }
    }
}