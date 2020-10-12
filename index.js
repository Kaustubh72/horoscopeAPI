const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
app.use(cors())
app.get('/',async function(req, res) 
{
    var prediction="";
    var horoscope = ["none","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
    var json =[];
    for(id=1;id<13;id++){
      url = 'https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign='+id;
      var data = await new Promise(function (resolve, reject){
        request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
            prediction = $('div.main-horoscope > p').text();
            resolve({
                id: id,
                horoscope: horoscope[id],
                prediction: prediction,
            });
          }else{
            reject(undefined);
          }
        });
      });
      json.push(data);
    }  
  res.send(json);
});
app.listen(process.env.PORT || 80);
module.exports = app;
