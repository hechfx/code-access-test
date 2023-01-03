const WebServer = require("./structures/Webserver")
const AccessHandler = require("./util/AccessHandler")

const accessHandler = new AccessHandler()
const instance = new WebServer()

instance.startListening(80, "127.0.0.1", accessHandler)