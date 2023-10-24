const joke = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', getJokes);

async function getJokes() {
    const config = {
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        const response = await fetch('https://icanhazdadjoke.com/', config);
        const data = await response.json();
        joke.innerText = data.joke;
    } catch (error) {
        console.error("Error al obtener el chiste:", error);
    }
}
//OTHER METOD   

// const joke = document.getElementById('joke');
// const jokeBtn = document.getElementById('jokeBtn');

// getjokes();

// jokeBtn.addEventListener('click',getjokes)

// function getjokes(){
//     const config = {
//         headers: {
//             "Accept": "application/json"
//         }
//     }
//     fetch('https://icanhazdadjoke.com/', config)
//     .then(res => res.json())
//     .then(data => {
     
//         joke.innerText = data.joke;
//     });

// }
