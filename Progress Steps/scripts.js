const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle');


var currentActive =1;
next.addEventListener('click', () =>{
     currentActive++
     if (currentActive > circles.lenght) {
             currentActive = circles.lenght
     }
     udpate();
})

prev.addEventListener('click', () => {
    currentActive--
    if (currentActive < 1 ) {
            currentActive = 1 ;
    }
    udpate();
})

function udpate() {

   //Udpate Active Class In Circle 
   
     circles.forEach((circle, idx) => {

        if(idx < currentActive){

           circle.classList.add('active')

        }else{

            circle.classList.remove('active')
        }
     })

   //Udpate The Progress Bar

 var activeCircles = document.querySelectorAll('.active')

 progress.style.width = (activeCircles.length - 1) / (circles.length - 1) * 100 + "%";
    
   //change the button enable and the disable state 

if(currentActive === 1){

    prev.disabled = true

}else if (currentActive === circles.length) {

    next.disabled = true

}else {

  prev.disabled = false

  next.disabled = false
}
}