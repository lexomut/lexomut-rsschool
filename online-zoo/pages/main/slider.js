const sliderItems=document.querySelectorAll('.meet-some__slider>a'),
    slider=document.querySelector('.meet-some__slider'),
arr= [],
    arrow=document.querySelector('.meet-some__arrow');
document.querySelector('.icon-Union-left').style.opacity='20%'
slider.style.left='0rem'
let sliderLeft=0
arrow.addEventListener('click', sliderMove)

for(let item of sliderItems){
    arr.push(item.cloneNode(true))
}

for (let i = arr.length-1;i>=0;i--){

    document.querySelector('.meet-some__slider').append(arr[i])
}

function sliderMove(e) {
    if(e.target.className.includes('right')&& sliderLeft>-184){
        sliderLeft-=48
        slider.style.left=sliderLeft+'rem'

    }
    if(e.target.className.includes('left')&& sliderLeft<0 ){
        sliderLeft+=48
        slider.style.left=sliderLeft+'rem'
    }


    if (sliderLeft>=0 ){
        document.querySelector('.icon-Union-left').style.opacity='20%'

    }
    else {
        document.querySelector('.icon-Union-left').style.opacity='100%'

    }

    if (sliderLeft<=-184){
        document.querySelector('.icon-Union-left').nextElementSibling.style.opacity='20%'
        console.log('opacity')
    }
    else{
        document.querySelector('.icon-Union-left').nextElementSibling.style.opacity='100%'
        console.log('no-opacity')
    }

}
