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
  const [dropDownToggle, setDropDownToggle] = useState(false);
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
    setDropDownToggle(false);
  }

  const searchQuery = (e) => {
    if(e.target.value !== ""){
      let moviesArr = movies.filter(movie => movie.title.toLowerCase().includes(e.target.value.toLowerCase()));
      setMovies(moviesArr);
    } else {
      fetchData();
    }
  }

  return (
    <div className="App">
      <div className="header">
        <div className="dropdown">
            <button className="dropbtn" onClick={() => setDropDownToggle(true)}>Sort By...</button>
            {dropDownToggle && (
              <div className="dropdown-content">
                <div className="dropdownHeader">
                  <span>Sort by</span>
                  <i className="fa fa-times closeIcon" onClick={() => setDropDownToggle(false)} />
                </div>
                <div className="dropdownOptions">
                  <div  onClick={() => sortMovies("id")}>Episode</div> 
                  <div onClick={() => sortMovies("year")}>Year</div>
                </div>
            </div>
            )}
        </div>
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
                  
                </div>  : <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%"
                }}>
                  No Movie Selected
                  </div>
              }
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App
