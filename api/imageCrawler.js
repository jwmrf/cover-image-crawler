'use strict';
var request = require('request');
var jQuery = require('cheerio');
var sizeOf = require('image-size');
var http = require('https');


class ImageCrawler {
  constructor() {
    this._id = ""
  }

  //Método inicial que recebe a url do website.
  async start(req, res) {
      console.log(req)
    var retorno = await this.TakeImages(req);
    return retorno;
  }

  //Responsável por verificar se o SRC da tag imagem é um endereço http.
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
        listaVertical, lista.unshift("Erro, tente outra url");
      }
      if (numero == 0) {
        resolve(lista[0])
      }


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
          }
        }
        // Quando a imagem do 'Each' for a última da página, ele dispara o timer de 2 segundos para retorno
        if (imagem.attr('src') == site('img').last().attr('src') && numero == index + 1) {
          setTimeout(async function () {
            if (lista[0] != "Erro, tente outra url") {
              resolve(lista[0]);
            } else {
              resolve(listaVertical[0]);
            }
          }, 1000);
        }
      });
    });
  }

  TakeImages(url) {
    return new Promise(async function (resolve, reject) {
      let verifica = await new ImageCrawler().TrataUrl(url);
      if (verifica >= 0) {

        request({ method: 'GET', url: url, headers: { 'User-Agent': 'curl/7.47.0' } }, async function (erro, resposta, body) {
          if (erro) {
            resolve("Erro, tente outra url");
            console.log(erro);
          } else {
            var site = jQuery.load(body);
            var maiorImagem = await new ImageCrawler().Requesta(site);
            resolve(maiorImagem);
          }
        });
      } else {
        resolve("Erro, tente outra url");
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
          try{
            resolve(sizeOf(buffer));
          }catch(erro){
            resolve(undefined)
          }
        });
      });
    })
  };
}
module.exports = ImageCrawler;