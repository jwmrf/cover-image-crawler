Get the url of main image of page's using scraping in each IMG tag on the site and return the larggest width image found.

Usually it takes 1 second to return the result, if not found the return will be empty.

## Installation

```
npm install cover-image-crawler
```

## Use example

```
const imageCrawler = require('cover-image-crawler');

imageCrawler.capture('https://www.diariodepernambuco.com.br/noticia/viver/2019/07/vintage-culture-e-mais-cinco-atracoes-em-festival-eletronico-no-recife.html', function(err,url){
  if(!err){
    console.log(image)
  }
})
```

## Use example - Async/Await

```
const imageCrawler = require('cover-image-crawler');

async function test(){
    
    let teste =  await imageCrawler.capture('https://g1.globo.com/monitor-da-violencia/noticia/cresce-n-de-mulheres-vitimas-de-homicidio-no-brasil-dados-de-feminicidio-sao-subnotificados.ghtml')
    console.log(teste)
}
test()

Open to contributions and improvements
```
## Test now on Heroku : https://info-link-api.herokuapp.com/

