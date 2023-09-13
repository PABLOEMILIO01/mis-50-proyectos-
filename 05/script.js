const loadingText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')


var load = 0
var int = setInterval(blurring, 30)

function blurring () {
    load++;
    if(load> 99){
        clearInterval(int);
    }

    loadingText.innerHTML= `${load}%`;
    loadingText.style.opacity=scale(load, 0, 100, 10, 0);
    bg.style.filter=`blur(${scale(load, 0, 100, 20, 0)}px)`



}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}