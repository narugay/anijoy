import { useNavigate } from "react-router-dom";
import "./Genres.css";
import { useState } from "react";

const Seasons = () => {
  const [genresinfo, setGenresInfo] = useState([
    {
      title: "Action",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    },
    {
      title: "Adventure",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
    },
    {
      title: "Comedy",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
    },
    {
      title: "Drama",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    },
    {
      title: "Fantasy",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
    {
      title: "Horror",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-RCJ7M71zLmrh.jpg",
    },
    {
      title: "Mahou Shoujo",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/9756-d5M8NffgJJHB.jpg",
    },
    {
      title: "Mecha",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99423-xu78CeWOO5FW.jpg",
    },
    {
      title: "Music",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20665-j4kSsfhfkM24.jpg",
    },
    {
      title: "Mystery",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21234-7lfSSPoMmwr2.jpg",
    },
    {
      title: "Psychological",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    },
    {
      title: "Romance",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-XIr3PeczUjjF.png",
    },
    {
      title: "Sci-fi",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
    },
    {
      title: "Slice of Life",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
    },
    {
      title: "Sports",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20464-PpYjO9cPN1gs.jpg",
    },
    {
      title: "Supernatural",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20447-nlgQQzcgWbgw.jpg",
    },
    {
      title: "Thriller",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/108632-yeLbrgPN4Oni.jpg",
    },
  ]);
  const [formatsInfo, setFormatsInfo] = useState([
    {
      title: "TV",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    },
    {
      title: "OVA",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
    },
    {
      title: "TV SHORT",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
    },
    {
      title: "ONA",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
    {
      title: "MOVIE",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    },
    {
      title: "SPECIAL",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
    {
      title: "MUSIC",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
  ]);
  const [seasonsInfo, setSeasonsInfo] = useState([
    {
      title: "WINTER",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101759-MhlCoeqnODso.jpg",
    },
    {
      title: "SPRING",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
    },
    {
      title: "SUMMER",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20997-nE9VyUa08vS0.jpg",
    },
    {
      title: "FALL",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/97940-1URQdQ4U1a0b.jpg",
    },
  ]);
  const [statusesInfo, setStatusesInfo] = useState([
    {
      title: "RELEASING",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    },
    {
      title: "FINISHED",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
    },
    {
      title: "CANCELLED",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
    },
  ]);
  const navigate = useNavigate();
  return (
    <>
      <h1 className="seasons-title">Seasons</h1>
      <div className="seasonsdiv">
        {seasonsInfo.map((genreinfo) => {
          return (
            <div
              onClick={(e) => {
                navigate(
                  "/season/" + e.target.innerText.toLowerCase()
                );
              }}
              className="season"
              style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ),url(${genreinfo.image})`,
              }}
            >
              {genreinfo.title}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Seasons;
