    const axios = require('axios');
    const cheerio = require('cheerio');
    const express = require("express");
    const bodyParser = require("body-parser");
    const ejs = require("ejs");

    const app = express();

    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));

  const url = 'https://www.iplt20.com/stats/2020/most-runs';

  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const statsTable = $('tbody > tr');
      console.log(statsTable.length);
      const toprunscorers = [];

        function removeLinebreak(str){
          return str.replace(/[\r\n]+/gm," ");
        }
      statsTable.each(function(){
          const	player = $(this).find(".top-players__player-name").text();
          const players = removeLinebreak(player).replace(/ /g, '');
          const match = $(this).find(".top-players__padded").text();
          const matches = removeLinebreak(match).replace(/ /g, '');
          const runs =removeLinebreak($(this).find(".top-players__r").text()).replace(/ /g, '');
      toprunscorers.push({
         name: players,
         Matches:matches,
         Runs:runs
       });
     });
   app.get('/', function(req, res) {
       res.render('index', {obj: toprunscorers});
   });
})
    .catch(console.error);

app.listen(3000,function(){
  console.log("server started on port 3000")
})
