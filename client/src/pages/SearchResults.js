import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchResultsSkeleton from '../components/skeletons/SearchResultsSkeleton';
import { Helmet } from 'react-helmet';
import image from "../logo.png";



function SearchResults({ changeMetaArr, socket }) {
  let urlParams = useParams().name;
  urlParams = urlParams.replace(':', '').replace('(', '').replace(')', '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const title = `Search results for: ${urlParams}`;
  const content = 'Anime Hashira - Watch Anime Online For Free';
 
  // React.useEffect(()=>{
  //   changeMetaArr("title", `Search results for: ${urlParams}`)
  // })
  useEffect(() => {
    async function getResults() {
      setLoading(true);
      window.scrollTo(0, 0);
      socket.emit("search", urlParams);
      socket.on("searchRes", (res) => {
        setLoading(false);
        setResults(res.results);
      });
    }
    getResults();
  }, [urlParams]);



  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={content} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content={image} />
      </Helmet>
      {loading ? (
        <SearchResultsSkeleton />
      ) : (
        <Parent>
          <Heading>
            <span>Search</span> Results
          </Heading>
          <CardWrapper>
            {results.map((item, i) => (
              <Wrapper to={`/anime/${item.id}`} key={i}>
                <img src={item.image} alt="" />
                <p>{item.title.english || item.title.romanji}</p>
              </Wrapper>
            ))}
          </CardWrapper>
          {results.length === 0 && <h2>No Search Results Found</h2>}
        </Parent>
      )}
    </>
  );
}

const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  h2 {
    color: #ffffff;
  }
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CheckboxWrapper = styled.div`
  color: #ffffff;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  label {
    padding-right: 0.5rem;
  }
  label:not(:first-child) {
    margin-left: 2rem;
  }
`;

const CardWrapper = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  row-gap: 2rem;
  column-gap: 2rem;

  ::after {
    content: "";
    flex: auto;
  } */

  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }
`;

const Wrapper = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: #ffffff;
    font-size: 1rem;
    font-family: 'Gilroy-Medium', sans-serif;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: #ffffff;
  font-family: 'Gilroy-Light', sans-serif;
  span {
    font-family: 'Gilroy-Bold', sans-serif;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

export default SearchResults;
