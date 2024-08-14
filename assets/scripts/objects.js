const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];

const renderMovie = (filter = '') => {
  const movieList = document.getElementById("movie-list");

  movieList.innerHTML = '';

  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }

  const filteredMovie = !filter
      ? movies
      : movies.filter(movie => movie.info.title.toLowerCase().includes(filter.toLowerCase()));

  filteredMovie.forEach(movie => {
    const { info } = movie;
    let text = info.title + " - ";
    const newMovieEl = document.createElement("li");

    for (const key in info) {
      if (key !== 'title') {
        text += `${key}: ${info[key]}`;
      }
    }
    newMovieEl.innerHTML = text;
    movieList.appendChild(newMovieEl);
  })
}

const clearInputFields = () => {

  const title = document.getElementById("title");
  const extraName = document.getElementById("extra-name");
  const extraValue = document.getElementById("extra-value");

  title.value = '';
  extraName.value = '';
  extraValue.value = '';
}

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (title.trim() === ""
      || extraName.trim() === ""
      || extraValue.trim() === ""
  ) {
    alert("Input fields must not be empty");
    return;
  }

  const newMovie = {
    info: {
      title: title,
      [extraName]: extraValue,
    },
    id: Math.random()
  }

  movies.push(newMovie);
  renderMovie();
  clearInputFields();
}

const searchMovieHandler = () => {
  const movieName = document.getElementById("filter-title").value;
  renderMovie(movieName);
}

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);