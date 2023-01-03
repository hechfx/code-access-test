module.exports = class AccessHandler {
    constructor(ip) {
        this.ip = ip
        this.users = new Map()
    }
}