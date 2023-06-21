import axios from 'axios';
import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowToBottom, BiFullscreen } from 'react-icons/bi';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { Helmet } from 'react-helmet';
import WatchAnimeSkeleton from '../components/skeletons/WatchAnimeSkeleton';
import useWindowDimensions from '../hooks/useWindowDimensions';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ServersList from '../components/WatchAnime/ServersList';
import PlayerContainer from '../components/Wrappers/PlayerContainer';
import EpisodeLinksList from '../components/EpisodeLinks/EpisodeLinksList';
import logoImg from "../logo.png";
import "video.js/dist/video-js.css";

function WatchAnime({socket}) {
  let episodeSlug = useParams().episode;

  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [currentServer, setCurrentServer] = useState('');
  const [loading, setLoading] = useState(true);
  const [damt, setDamt] = useState('');
  const [epis, setEpis] = useState({})
  const { width } = useWindowDimensions();
  const [fullScreen, setFullScreen] = useState(false);
  const [source, setSource] = useState(0);
  const [episodeList, setEpisodeList] = useState([])
  const [subtits, setSubtits] = useState([])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [banner, setBanner] = useState('');

  useEffect(() => {
  
    async function getEpisodeLinks() {
      setLoading(true);
      window.scrollTo(0, 0);
      socket.emit("epServers", episodeSlug)
      socket.on("ServEp", (res) => {
        setLoading(false);
        setDamt(encodeURI(JSON.stringify(res)));
        setEpisodeLinks(res.sources);
        setSubtits(res.subtitles);
        setSource(0);
        setCurrentServer(res.sources[0]);
      });
    }
    getEpisodeLinks();
  }, [episodeSlug]);


  function fullScreenHandler(e) {
    setFullScreen(!fullScreen);
    let video = document.getElementById('video');

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      window.screen.orientation.lock('landscape-primary');
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    async function getAnimeBanner() {
      let slug = episodeSlug.split('$episode')[0];
      socket.emit("animeInfoP", slug)
      socket.on("InfoAnimeP", (res) => {
        setContent((content) => {
          content = res.description
          let len = 200;
          return (content =
            content.length > len ? content.substring(0, len - 3) + '...' : content);
        });
        setEpis(res.episodes.filter((i) => { return i.id == episodeSlug})[0])
        //setTitle(`Watch ${res.title.english}`)
        setBanner(res.image)
        setEpisodeList(res.episodes)
      });
    }
    if (loading === false) {
      getAnimeBanner();
    }
  }, [loading, episodeSlug]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={banner} />
      </Helmet>
      {loading && <WatchAnimeSkeleton />}
      {!loading && (
        <Wrapper>
          {episodeLinks.length > 0 && currentServer !== '' && (
            <div>
              <div>
                <Titles>
                  <p>
                    <span>
                      {epis.title}
                    </span>
                  </p>
                </Titles>
              </div>

              <div>
                                  <div>
                    <PlayerContainer>
                      <IconContext.Provider
                        value={{
                          size: '1.5rem',
                          color: '#FFFFFF',
                          style: {
                            verticalAlign: 'middle',
                          },
                        }}
                      >
                        <p>{currentServer.quality}</p>
                        <div>
                          <div className="tooltip">
                            <button
                              onClick={() =>{
                    setSource((source+1));
                    setCurrentServer(episodeLinks[source])
                            }
                              }
                            >
                              <HiOutlineSwitchHorizontal />
                            </button>
                            <span className="tooltiptext">Change Server</span>
                          </div>
                        </div>
                      </IconContext.Provider>
                    </PlayerContainer>
                    <iframe src={`https://wtf-six-rose.vercel.app/embed?data=${damt}`} />
                      {width <= 600 && (
                        <div>
                          <IconContext.Provider
                            value={{
                              size: '1.8rem',
                              color: '#FFFFFF',
                              style: {
                                verticalAlign: 'middle',
                                cursor: 'pointer',
                              },
                            }}
                          >
                            <BiFullscreen
                              onClick={(e) => fullScreenHandler(e)}
                            />
                          </IconContext.Provider>
                        </div>
                      )}
                  </div>
                {(episodeList.length > 1) && (
                  <EpisodeButtons>
                    {width <= 600 && (episodeList.filter((i) => {return i.number == (epis.number-1)}).length !== 0) && (
                      <IconContext.Provider
                        value={{
                          size: '1.8rem',
                          style: {
                            verticalAlign: 'middle',
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={
                            '/watch/' +
                            episodeList.filter((i) => {return i.number == (epis.number-1)})[0].id
                          }
                          style={
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, '$1') === '1'
                              ? {
                                  pointerEvents: 'none',
                                  color: 'rgba(255,255,255, 0.2)',
                                }
                              : {}
                          }
                        >
                          <HiArrowSmLeft />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                    {width > 600 && (episodeList.filter((i) => {return i.number === (epis.number-1)}).length !== 0) && (
                      <IconContext.Provider
                        value={{
                          size: '1.3rem',
                          style: {
                            verticalAlign: 'middle',
                            marginBottom: '0.2rem',
                            marginRight: '0.3rem',
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={
                            '/watch/' +
                            episodeList.filter((i) => {return i.number == (epis.number-1)})[0].id
                          }
                          style={
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, '$1') === '1'
                              ? {
                                  pointerEvents: 'none',
                                  color: 'rgba(255,255,255, 0.2)',
                                }
                              : {}
                          }
                        >
                          <HiArrowSmLeft />
                          Previous
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                    {width <= 600 && (episodeList.filter((i) => {return i.number === (epis.number+1)}).length !== 0) && (
                      <IconContext.Provider
                        value={{
                          size: '1.8rem',
                          style: {
                            verticalAlign: 'middle',
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={
                            '/watch/' +
                            episodeList.filter((i) => {return i.number == (epis.number+1)})[0].id
                          }
                          style={
                            episodeList.length ===
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, '$1')
                              ? {
                                  pointerEvents: 'none',
                                  color: 'rgba(255,255,255, 0.2)',
                                }
                              : {}
                          }
                        >
                          <HiArrowSmRight />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}

                    {width > 600 && (episodeList.filter((i) => {return i.number === (epis.number+1)}).length !== 0) && (
                      <IconContext.Provider
                        value={{
                          size: '1.3rem',
                          style: {
                            verticalAlign: 'middle',
                            marginBottom: '0.2rem',
                            marginLeft: '0.3rem',
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={
                            '/watch/' +
                            episodeList.filter((i)=>{return i.number == (epis.number+1)})[0].id
                          }
                          style={
                            episodeList.length ===
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, '$1')
                              ? {
                                  pointerEvents: 'none',
                                  color: 'rgba(255,255,255, 0.2)',
                                }
                              : {}
                          }
                        >
                          Next
                          <HiArrowSmRight />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                  </EpisodeButtons>
                )}
                
              </div>
              {episodeList.length > 1 && (
                <EpisodeLinksList
                  episodeArray={episodeList}
                />
              )}
            </div>
          )}
        </Wrapper>
      )}
    </div>
  );
}

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.6);
  background-image: url('https://i.ibb.co/28yS92Z/If-the-video-does-not-load-please-refresh-the-page.png');
  background-size: 23rem;
  background-repeat: no-repeat;
  background-position: center;

  video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #logo{
    postion: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
  }

  div {
    position: absolute;
    z-index: 10;
    padding: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding-bottom: 66.3%;
    background-size: 13rem;
  }
`;

const Wrapper = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const EpisodeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EpisodeLinks = styled(Link)`
  color: #ffffff;
  padding: 0.6rem 1rem;
  background-color: #404040;
  text-decoration: none;
  font-family: 'Gilroy-Medium', sans-serif;
  border-radius: 0.4rem;

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 50%;
  }
`;

const Titles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  margin-bottom: 0.5rem;
  p {
    font-size: 1.7rem;
    font-family: 'Gilroy-Light', sans-serif;
  }

  span {
    font-family: 'Gilroy-Bold', sans-serif;
  }

  a {
    font-family: 'Gilroy-Medium', sans-serif;
    background-color: #404040;
    text-decoration: none;
    color: #ffffff;
    padding: 0.7rem 1.1rem 0.7rem 1.5rem;
    border-radius: 0.4rem;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
    p {
      font-size: 1.3rem;
    }
    a {
      padding: 0.7rem;
      border-radius: 50%;
      margin-left: 1rem;
    }
  }
`;

export default WatchAnime;
