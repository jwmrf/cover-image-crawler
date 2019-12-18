const apijs = require('./api/imageCrawler');
let api = new apijs();
module.exports.capture = async function(url){
    await api.start(url)
}