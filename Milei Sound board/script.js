
const sounds = ['afuera', 'bananas', 'preparate', 'viva la libertad'];

let currentlyPlaying = null; 

sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = sound;

    btn.addEventListener('click', () => {
        const audioElement = document.getElementById(sound);
        if (currentlyPlaying) {
       
            currentlyPlaying.pause();
        }
      
        audioElement.play();
        currentlyPlaying = audioElement; 
    });

    document.getElementById('buttons').append(btn);
});
