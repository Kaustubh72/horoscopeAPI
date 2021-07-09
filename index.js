const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.get('/', async function(req, res) 
{
    var prediction="";
    
    var horoscope = ["none","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
    let arr = ["null","Mar 21 – Apr 20","Apr 21 – May 21","May 22 – Jun 21","Jun 22 – Jul 23","Jul 24 – Aug 23","Aug 24 – Sep 23","Sep 24 – Oct 23","Oct 24 – Nov 22","Nov 23 – Dec 21","Dec 22 – Jan 20","Jan 21 – Feb 19","Feb 20 – Mar 20"];
    var json =[];
    for(id=1;id<13;id++){
      url = 'https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign='+id;
      var data = await new Promise(function (resolve, reject){
        request(url, function(error, response, html) {
          if(!error) {
            $ = cheerio.load(html);
            prediction = $('div.main-horoscope > p').text();
            resolve({
                id: arr[id],
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
