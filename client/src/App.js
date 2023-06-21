import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav';
import Status from './pages/Status.js';
import Statuss from './pages/StatusList.js';
import Season from './pages/Season.js';
import Seasons from './pages/SeasonList.js';
import Genre from './pages/Genre.js';
import Genres from './pages/GenreList.js';
import AnimeDetails from './pages/AnimeDetails';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PopularAnime from './pages/PopularAnime';
import TrendingAnime from './pages/TrendingAnime';
import WatchAnime from './pages/WatchAnime';
import GlobalStyle from './styles/globalStyles';
import PageNotFound from './pages/PageNotFound';
import io from 'socket.io-client';

const socket = io("/");

function App() {
  function changeMetaArr(propertyChanged, change) {
    document.title = change;
  }
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home changeMetaArr={changeMetaArr} socket={socket} />} />
        <Route
          path="/trending"
          element={<TrendingAnime changeMetaArr={changeMetaArr} socket={socket} />}
        />
        <Route
          path="/popular"
          element={<PopularAnime changeMetaArr={changeMetaArr} socket={socket} />}
        />
        <Route
          path="/search/:name"
          element={<SearchResults changeMetaArr={changeMetaArr} socket={socket} />}
        />
        <Route
          path="/anime/:id"
          element={<AnimeDetails changeMetaArr={changeMetaArr} socket={socket} />}
        />
        <Route
          path="/watch/:episode"
          element={<WatchAnime changeMetaArr={changeMetaArr} socket={socket} />}
        />
        <Route
          path="/genres"
          element={<Genres />}
        />
        <Route
          path='/genre/:genre'
          element={<Genre socket={socket} changeMetaArr={changeMetaArr} />}
        />
        <Route
          path="*"
          element={<PageNotFound changeMetaArr={changeMetaArr} />}
        />
        <Route
          path="/status"
          element={<Statuss />}
        />
        <Route
          path='/status/:status'
          element={<Status socket={socket} changeMetaArr={changeMetaArr} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
