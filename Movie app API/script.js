// Espera a que el contenido del documento HTML se cargue completamente.
document.addEventListener('DOMContentLoaded', function () {
    // Reemplaza 'tu_api_key' con tu propia clave de API de TMDb.
    const apiKey = 'bd0ca094efcb53c25e9d3f70afeeb329';

    // Obtiene referencias a elementos HTML por su ID.
    const searchForm = document.getElementById('search-form'); // Formulario de búsqueda.
    const searchInput = document.getElementById('search-input'); // Campo de entrada de búsqueda.
    const main = document.getElementById('main'); // Contenedor principal.

    // Agrega un controlador de eventos al formulario de búsqueda.
    searchForm.addEventListener('submit', function (e) {
        // Evita que el formulario se envíe de forma predeterminada (recarga de página).
        e.preventDefault();

        // Obtiene el valor ingresado por el usuario en el campo de búsqueda.
        const query = searchInput.value;

        // Realiza una llamada a la API de TMDb para buscar películas.
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => response.json()) // Convierte la respuesta en formato JSON.
            .then(data => {
                // Procesa los resultados de la API y actualiza el contenido dentro de 'main'.
                main.innerHTML = ''; // Limpia cualquier contenido anterior en 'main'.

                // Itera a través de las películas encontradas en los resultados.
                data.results.forEach(movie => {
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
            })
            .catch(error => console.error(error)); // Maneja cualquier error y lo muestra en la consola.
    });
});
