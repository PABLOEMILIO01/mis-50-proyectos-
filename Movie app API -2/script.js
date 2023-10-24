document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'bd0ca094efcb53c25e9d3f70afeeb329';
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const main = document.getElementById('main');
    const tagsEl = document.getElementById('tags');

    const genres = [
        {
            "genres": [
              {
                "id": 28,
                "name": "Action"
              },
              {
                "id": 12,
                "name": "Adventure"
              },
              {
                "id": 16,
                "name": "Animation"
              },
              {
                "id": 35,
                "name": "Comedy"
              },
              {
                "id": 80,
                "name": "Crime"
              },
              {
                "id": 99,
                "name": "Documentary"
              },
              {
                "id": 18,
                "name": "Drama"
              },
              {
                "id": 10751,
                "name": "Family"
              },
              {
                "id": 14,
                "name": "Fantasy"
              },
              {
                "id": 36,
                "name": "History"
              },
              {
                "id": 27,
                "name": "Horror"
              },
              {
                "id": 10402,
                "name": "Music"
              },
              {
                "id": 9648,
                "name": "Mystery"
              },
              {
                "id": 10749,
                "name": "Romance"
              },
              {
                "id": 878,
                "name": "Science Fiction"
              },
              {
                "id": 10770,
                "name": "TV Movie"
              },
              {
                "id": 53,
                "name": "Thriller"
              },
              {
                "id": 10752,
                "name": "War"
              },
              {
                "id": 37,
                "name": "Western"
              }
            ]
          }
    ];

    var selectedGenre = [];

    setGenre();

    function setGenre() {
        tagsEl.innerHTML = '';
        genres.forEach(genreObj => {
            genreObj.genres.forEach(subGenre => {
                const t = document.createElement('div');
                t.classList.add('tag');
                t.id = subGenre.id;
                t.innerText = subGenre.name;
                t.addEventListener('click', () => {
                    if (selectedGenre.length == 0) {
                        selectedGenre.push(subGenre.id);
                    } else {
                        if (selectedGenre.includes(subGenre.id)) {
                            selectedGenre = selectedGenre.filter(id => id !== subGenre.id);
                        } else {
                            selectedGenre.push(subGenre.id);
                        }
                    }
                    showMovies();
                });
                tagsEl.append(t);
            });
        });
    }

    // Variable global para almacenar las películas.
    let movies = [];

    // Función para mostrar las películas.
    function showMovies() {
        main.innerHTML = ''; // Limpia cualquier contenido anterior en 'main'.

        // Filtra las películas que coinciden con los géneros seleccionados.
        const filteredMovies = movies.filter(movie => {
            // Comprueba si la película tiene al menos uno de los géneros seleccionados.
            return selectedGenre.some(genreId => movie.genre_ids.includes(genreId));
        });

        // Itera a través de las películas filtradas y las muestra.
        filteredMovies.forEach(movie => {
            // Crea un nuevo elemento 'div' para cada película.
            const movieElement = document.createElement('div');

            // Agrega la clase 'movie' al elemento 'div'.
            movieElement.classList.add('movie');

            // Define el contenido HTML del elemento 'div' con información de la película.
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="white">${movie.vote_average}</span>
                </div>
                <div class="overview">
                    ${movie.overview}
                </div>
            `;

            // Agrega el elemento 'div' de la película al contenedor 'main'.
            main.appendChild(movieElement);
        });
    }

    // Agrega un controlador de eventos al formulario de búsqueda.
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = searchInput.value;

        // Realiza una llamada a la API de TMDb para buscar películas.
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => response.json())
            .then(data => {
                movies = data.results; // Almacena las películas en la variable global.
                showMovies(); // Muestra las películas después de obtener los resultados.
            })
            .catch(error => console.error(error));
        
    });

    // Agrega un controlador de eventos a los tags.
    tagsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            const genreId = parseInt(e.target.id);
            handleGenreSelection(genreId);
        }
    });

    // Función para manejar la selección de géneros.
    function handleGenreSelection(genreId) {
        if (selectedGenre.includes(genreId)) {
            selectedGenre = selectedGenre.filter(id => id !== genreId);
        } else {
            selectedGenre.push(genreId);
        }
        showMovies(); // Muestra las películas después de seleccionar un género.
    }
});
