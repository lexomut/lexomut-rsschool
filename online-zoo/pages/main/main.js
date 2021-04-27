const popup=document.querySelector('.popup'),
    buttonContainer=document.querySelector('.together-we-care__button-container'),
    shadow=document.querySelector('.shadow'),
    close=document.querySelector('.together-we-care__close'),
    donationButton=document.querySelector(".donation__button > .button-arrow");



document.addEventListener('click',function f(e){

    console.dir(e.target)
    if (e.target.className.includes('pay-and-feed__button') ||e.target.className.includes('footer__button')){
        popup.style.display = 'flex';
        document.body.style.overflowY = 'hidden';}
    if(e.target.className.includes('together-we-care__close') || e.target.className=='shadow'){
        popup.style.display = 'none';
        document.body.style.overflowY = '';

}
})