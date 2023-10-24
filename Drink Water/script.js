// Selecciona todos los elementos con la clase 'small-cup' y los almacena en la variable 'smallCups'
const smallCups = document.querySelectorAll('.small-cup');

// Obtiene referencias a elementos HTML con los ID 'litres', 'remained', y 'percentage' y los almacena en variables correspondientes
const litres = document.getElementById('litres');
const remained = document.getElementById('remained');
const percentage = document.getElementById('percentage');

// Llama a la función 'updateBigcup' para inicializar el estado de la taza grande y los valores
updateBigcup();

// Agrega un event listener a cada elemento 'small-cup'
smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => { highlightCups(idx); });
});

// Función que resalta las tazas según la cantidad de agua que se ha bebido
function highlightCups(idx) {
    if (idx === 7 && smallCups[idx].classList.contains('full')) idx--;

    if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) idx--;

    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full'); // Agrega la clase 'full' para resaltar la taza
        } else {
            cup.classList.remove('full'); // Elimina la clase 'full' para desactivar la resaltación de la taza
        }
    });

    // Llama a la función 'updateBigcup' para actualizar la taza grande y los valores
    updateBigcup();
}

// Función para actualizar la taza grande y los valores
function updateBigcup() {
    // Cuenta cuántas tazas pequeñas están llenas
    const fullCups = document.querySelectorAll('.small-cup.full').length;
    const totalCups = smallCups.length;

    // Si no hay tazas llenas, oculta la barra de porcentaje
    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        // Si hay tazas llenas, muestra la barra de porcentaje y ajusta su altura y texto
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 300}px`; // Ajusta la altura de la barra de porcentaje
        percentage.innerText = `${(fullCups / totalCups) * 100}%`; // Muestra el porcentaje de tazas llenas

    }

    // Si todas las tazas están llenas, oculta el mensaje de lo que queda por beber
    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        // Si no todas las tazas están llenas, muestra el mensaje y calcula cuánta agua queda por beber
        remained.style.visibility = 'visible';
        litres.innerText = `${2 - (250 * (fullCups / 1000))}L`; // Calcula y muestra la cantidad de agua que queda por beber
    }
}
