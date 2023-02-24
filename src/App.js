import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Dropdown,
  FormControl,
  Navbar,
  Row,
} from "react-bootstrap";
import "./style.css"

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const fetchData = async () => {
    const res = await fetch("https://swapi.dev/api/films/?format=json");
    const data = await res.json();
    setMovies(data.results);
  }

  useEffect(() => {
    fetchData();
  }, [])



  const get_roman = (num) => {
    let roman = num; 
    ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"].forEach((item, index) => {
      if((index + 1) === num)  roman = item
    })
    return roman
  }

  const sortMovies = (sortBy) => {
    let moviesArr;
    if(sortBy === "id"){
      moviesArr = movies.sort((a, b) => a.episode_id - b.episode_id) 
    }else if(sortBy === "year"){
      moviesArr = movies.sort((a, b) => {
        const fDate = new Date(a.release_date);
        const sDate = new Date(b.release_date);
        return fDate.getTime() - sDate.getTime()
      })
    }
    setMovies(moviesArr);
  }

  const searchQuery = (e) => {
    if(e.target.value === ""){
      fetchData();
    } else {
      let moviesArr = movies.filter(movie => movie.title.includes(e.target.value));
      setMovies(moviesArr);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <Dropdown alignright="true" className="filter">
          <Dropdown.Toggle variant="secondary">
            Sort By...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="dropDownFilter">
              <p>Sort By</p>
              <div className="dropdownOptions">
                <span  onClick={() => sortMovies("id")}>Episode</span> 
                <span onClick={() => sortMovies("year")}>Year</span>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Text className="search">
          <FormControl
            type="search"
            placeholder="Type to search..."
            aria-label="Search"
            onChange={searchQuery}
          />
        </Navbar.Text>
      </div>
      <Container className="movies__container">
        <Row>
          <Col className="movies__list">
              {
                movies.map(movie => (
                  <Row className="movie__item" onClick={() => setSelectedMovie(movie)} key={movie.episode_id}>
                    <Col xs={3}>{`EPISODE ${movie.episode_id}`}</Col>
                    <Col xs={6}>{`Episode ${get_roman(movie.episode_id)} - ${movie.title}`}</Col>
                    <Col xs={3}>{movie.release_date}</Col>
                  </Row>
                ))
              }
          </Col>
          <Col>
              {
                selectedMovie !== null ? 
                <div className="movie__detail">
                  <p className="movie_heading">{selectedMovie.title}</p>
                  <p className="desc">{selectedMovie.opening_crawl}</p>
                  <p className="directedBy">{`Directed By: ${selectedMovie.director}`}</p>
                  
                </div>  : <div>No Movie Selected</div>
              }
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App
