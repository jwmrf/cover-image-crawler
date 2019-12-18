'use strict';
var request = require('request');
var jQuery = require('cheerio');
var sizeOf = require('image-size');
var http = require('https');

class ImageCrawler {
  constructor() {
    this._id = ""
  }

  async start(req, res) {
    var retorno = await this.TakeImages(req);
    if (res) {
      res(null, retorno);
    } else {
      return retorno;
    }
  }

  TrataUrl(url) {
    return new Promise(function (resolve, reject) {
      if (url == undefined) {
        resolve(-1);
      }
      let verificaHttp = url.search("http");
      resolve(verificaHttp);
    });
  }

  Requesta(site) {
    return new Promise(function (resolve, reject) {
      let lista = [];
      let listaVertical = [];
      let maior = 0;
      let numero = site('img').length;
      if (undefined == site('img').last().attr('src')) {
        listaVertical, lista.unshift("");
      }
      if (numero == 0) {
        resolve(lista[0])
      }

      var promises = [];
      site('img').each(async function (index, value) {
        var imagem = site(this);
        let verifica = await new ImageCrawler().TrataUrl(imagem.attr('src'));
        if (verifica >= 0) {
          var tamanho = await new ImageCrawler().TakeSize(imagem.attr('src'));
          if (tamanho != undefined) {
            if (tamanho.width > tamanho.height && tamanho.type != 'gif') {
              if (tamanho.width * tamanho.height > maior) {
                maior = tamanho.width * tamanho.height;
                lista.unshift(imagem.attr('src'));
              }
            } else if (tamanho.width < tamanho.height && tamanho.type != 'gif') {
              listaVertical.unshift(imagem.attr('src'));
            }
            promises.push(tamanho)
          }
        }
      });

      Promise.all(promises).then(function (values) {
        setTimeout(function () {
          resolve(lista[0])

        }, 1000)
      }
      ).catch()
    });
  }

  TakeImages(url) {
    return new Promise(async function (resolve, reject) {
      let verifica = await new ImageCrawler().TrataUrl(url);
      if (verifica >= 0) {

        request({ method: 'GET', url: url, headers: { 'User-Agent': 'curl/7.47.0' } }, async function (erro, resposta, body) {
          if (erro) {
            resolve("");
            console.log(erro);
          } else {
            var site = jQuery.load(body);
            var maiorImagem = await new ImageCrawler().Requesta(site);
            resolve(maiorImagem);
          }
        });
      } else {
        resolve("");
      }
    });
  }

  TakeSize(urlImagem) {
    return new Promise(function (resolve, reject) {
      http.get(urlImagem, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        }).on('end', function () {
          var buffer = Buffer.concat(chunks);
          try {
            resolve(sizeOf(buffer));
          } catch (erro) {
            resolve(undefined)
          }
        });
      });
    })
  };
}
module.exports = ImageCrawler;