const apijs = require('./api/imageCrawler');
let api = new apijs();

module.exports.capture = async function (url, callback) {
    return api.start(url, callback)
}
