const { forbidden } = require("../errors/indexErrors")

const checkPermissions = (requestUser, requestPermissions) => {
    if (requestUser != requestPermissions) {
        throw new forbidden("you are not allow to perform the specified action")
    } 
}

module.exports = checkPermissions