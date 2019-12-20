const apijs = require('./api/imageCrawler');
const api = new apijs();

module.exports.capture = async function (url, callback) {
    return api.start(url, callback);
}
