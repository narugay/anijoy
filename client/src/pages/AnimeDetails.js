import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import EpisodeLinksList from '../components/EpisodeLinks/EpisodeLinksList';
import AnimeDetailsSkeleton from '../components/skeletons/AnimeDetailsSkeleton';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Helmet } from 'react-helmet';

function AnimeDetails({socket}) {
  let id = useParams().id;
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowDimensions();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  useEffect(() => {
    async function getAnimeDetails() {
      setLoading(true);
      setExpanded(false); 
      window.scrollTo(0, 0);
      socket.emit("animeInfo", id);
      socket.on("InfoAnime", (res) => {
        setLoading(false);
        setAnimeDetails(res);
        setContent((content) => {
          content = res.description;
          let len = 200;
          return (content =
            content.length > len
              ? content.substring(0, len - 3) + '...'
              : content);
        });
        setBanner((banner) => {
          return (banner = res.cover);
        });
        setTitle(res.title.english);
      });
    }
    getAnimeDetails();
  }, [id]);

  function readMoreHandler() {
    setExpanded(!expanded);
  }



  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={banner} />
      </Helmet>
      {loading && <AnimeDetailsSkeleton />}
      {!loading && (
        <Content>
          {animeDetails && (
            <div>
              <Banner
                src={animeDetails.cover}
                alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img className="card-img" src={animeDetails.image} alt="" />
                    <Button
                      to={'/watch/' + animeDetails.episodes[0].id}
                    >
                      Watch Now
                    </Button>
                </Poster>
                <div>
                  <h1>{animeDetails.title.english}</h1>
                  <p>
                    <span>Type: </span>
                    {animeDetails.type}
                  </p>
                  {width <= 600 && expanded && (
                    <p>
                      <span>Plot Summary: </span>
                      {animeDetails.description}
                      <button onClick={() => readMoreHandler()}>
                        read less
                      </button>
                    </p>
                  )}
                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summary: </span>
                      {animeDetails.description.substring(0, 200) + '... '}
                      <button onClick={() => readMoreHandler()}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p>
                      <span>Plot Summary: </span>
                      {animeDetails.description}
                    </p>
                  )}

                  <p>
                    <span>Genre: </span>
                    {animeDetails.genres.join(", ")}
                  </p>
                  <p>
                    <span>Released: </span>
                    {animeDetails.releaseDate}
                  </p>
                  <p>
                    <span>Status: </span>
                    {animeDetails.status}
                  </p>
                  <p>
                    <span>Number of Episodes: </span>
                    {animeDetails.episodes.length}
                  </p>
                </div>
              </ContentWrapper>
              {animeDetails.episodes.length > 1 && (
                <EpisodeLinksList
                  episodeArray={animeDetails.episodes}
                  state={false}
                />
              )}
            </div>
          )}
        </Content>
      )}
    </div>
  );
}

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #808080;
    font-family: 'Gilroy-Regular', sans-serif;
    span {
      font-family: 'Gilroy-Bold', sans-serif;
      color: #ffffff;
    }
    p {
      text-align: justify;
    }
    h1 {
      font-family: 'Gilroy-Bold', sans-serif;
      font-weight: normal;
      color: #ffffff;
    }
    button {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-family: 'Gilroy-Bold', sans-serif;
        font-size: 1rem;
        color: #ffffff;
      }
    }
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }
`;

const Button = styled(Link)`
  font-size: 1.3rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: rgb(208, 204, 197);
  background-color: rgb(24, 26, 27);
  font-family: 'Gilroy-Bold', sans-serif;
  border-radius: 0.4rem;
  position: relative;
  top: -25%;
  white-space: nowrap;
  transition: 0.2s;

  :hover {
    transform: scale(0.95);
    background-color: rgb(155 0 59);
    color: rgb(255 255 255);
  }

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

export default AnimeDetails;
