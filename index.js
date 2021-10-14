const PORT = 8100
const express = require('express')
const axios = require('axios').default;
const cheerio = require('cheerio');
const {attr} = require("cheerio/lib/api/attributes");
const app = express()
const anime = [];

app.get('/animes', function (req, res) {
    axios.get("https://www.animeforce.it/lista-anime/")
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html, {decodeEntities: false});
            $('#az-slider a', html).each(function () {
                const title = $(this).attr('title');
                const href = $(this).attr('href');
                if (!href.includes('#')) {
                    anime.push({
                        title,
                        href
                    })
                } else {
                    console.log(href.includes("#"))
                }

            })
            res.json(anime)
        }).catch((err) => {
        console.log(err)
    });
});
app.listen(PORT, () => console.log("Server Listen to port " + PORT));