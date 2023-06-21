const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const app = express();
const {ANIME, META} = require('@consumet/extensions');
const zao = new ANIME.Zoro(zoroBase="https://sanji.to")
const zoro = new META.Anilist(zao);
//lol
const path = require("path");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}


const server = app.listen((process.env.PORT || 5000), () => {
  console.log(`ANIME HASHIRA API LISTENING AT ${process.env.PORT || 5000}`);
});

const io = require("socket.io")(server);
let users=0;


io.on("connection", (socket) => {
  users++;
  console.log(`Users Connected: ${users}`);

  socket.on("trending", ({page, perPage}) => {
    zoro.fetchTrendingAnime(page=page, perPage=perPage).then((res) => {
      socket.emit("Trending", res);
    });
  });

  socket.on("popular", ({page, perPage}) => {
    zoro.fetchPopularAnime(page=page).then((res) => {
      socket.emit("Popular", res);
    });
  });

  socket.on("animeInfo", (id) => {
    zoro.fetchAnimeInfo(id).then((res) => {
      socket.emit("InfoAnime", res);
    });
  });

  socket.on("animeInfoP", (id) => {
    zao.fetchAnimeInfo(id).then((res) => {
      socket.emit("InfoAnimeP", res);
    });
  });

  socket.on("epServers", (id) => {
    zao.fetchEpisodeSources(id).then((res) => {
      socket.emit("ServEp", res);
    });
  });
  socket.on("search", (term) => {
    zoro.search(term).then((res) => {
      socket.emit("searchRes", res);
    });
  });

  socket.on("season", ({season, page, perPage}) => {
    zoro.advancedSearch(season=`${season[0].toUpperCase() + season.substr(1)}`, page=page, perPage=perPage).then((res) => {
      socket.emit("Season", res);
    })
  })

  socket.on("status", ({status, page, perPage}) => {
    zoro.advancedSearch(status=`${status[0].toUpperCase() + status.substr(1)}`, page=page, perPage=perPage).then((res) => {
      socket.emit("Status", res);
    })
  })

  socket.on("genre", ({genre, page, perPage}) => {
    zoro.fetchAnimeGenres(genres=[`${genre[0].toUpperCase() + genre.substr(1)}`], page=page, perPage=perPage).then((res) => {
      socket.emit("Genre", res);
    })
  })

  
  socket.on("disconnect", () => {
    users--;
    console.log(`Users Connected: ${users}`);
  });
});
