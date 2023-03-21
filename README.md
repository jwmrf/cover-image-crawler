# cover-image-crawler 

[![npm package](https://nodei.co/npm/cover-image-crawler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cover-image-crawle/)

[![NPM download][download-image]][download-url]
[![Package Quality][quality-image]][quality-url]

[quality-image]: https://packagequality.com/shield/cover-image-crawler.svg
[quality-url]: https://packagequality.com/#?package=cover-image-crawler
[download-image]: https://img.shields.io/npm/dm/cover-image-crawler.svg?style=flat-square
[download-url]: https://npmjs.org/package/cover-image-crawler

Get the url of main image of page's using scraping in each IMG tag on the site and return the largest image found.

Usually it takes 1 second to return the result, if not found the return will be empty.

## Installation

```
npm install cover-image-crawler
```

## Use example

```
const imageCrawler = require('cover-image-crawler');

imageCrawler.capture('https://www.diariodepernambuco.com.br/noticia/viver/2019/07/vintage-culture-e-mais-cinco-atracoes-em-festival-eletronico-no-recife.html', function(err, image_url){
  if(!err){
    console.log(image_url);
  }
})
```

## Use example - Async/Await

```
const imageCrawler = require('cover-image-crawler');

async function test(){
    
    let teste =  await imageCrawler.capture('https://www.bbc.com/news/world-us-canada-50863967');
    console.log(teste);
}
test()

Open to contributions and improvements
```
## Newspaper sites working with accuracy
* https://www.nytimes.com
* https://oglobo.globo.com
* https://www.theguardian.com
* https://www.washingtonpost.com/
* https://www.wsj.com/
* https://www.bbc.com/news/
* ...

### Test now on Vercel : https://info-link-node-api.vercel.app/

### Work for future versions: 

> Ability options how: HTML tags to make the scraping (beyond <img)

