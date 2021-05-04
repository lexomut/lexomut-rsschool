const popup=document.querySelector('.popup'),
    buttonContainer=document.querySelector('.together-we-care__button-container'),
    shadow=document.querySelector('.shadow'),
    close=document.querySelector('.together-we-care__close'),
    donationButton=document.querySelector(".donation__button > .button-arrow");



document.addEventListener('click',function f(e){
    if (e.target==donationButton){
        popup.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        document.querySelector(".together-we-care").style.display = 'none';
        document.querySelector(".make-your-donation").style.display = 'block';
        document.querySelector(".form-2").style.display = 'none';
        document.querySelector(".form-3").style.display = 'none';
        // console.log(donationButton.previousElementSibling.value);
        document.querySelector('.make-your-donation__other-amount-btn').nextElementSibling.value=donationButton.previousElementSibling.value
        document.querySelector('.make-your-donation__other-amount-btn').classList.add('popup__btn_active')
    }

    // console.dir(e.target)
    if (e.target.className.includes('pay-and-feed__button') ||e.target.className.includes('footer__button')||e.target.className.includes('cams__title-button')){
        popup.style.display = 'flex';
        document.body.style.overflowY = 'hidden';}
    if(e.target.className.includes('popup__close') || e.target.className=='shadow'){
        popup.style.display = 'none';
        document.body.style.overflowY = '';
        document.querySelector(".together-we-care").style.display = 'block';
        document.querySelector(".make-your-donation").style.display = 'none';
        document.querySelector(".form-1").style.display = 'block';
        document.querySelector(".form-2").style.display = 'none';
        document.querySelector(".form-3").style.display = 'none';

    }



    if(e.target.className.includes('together-we-care__button')) {
        // console.log(e.target.innerHTML.slice(1))
        // e.target.innerHTML.slice(1)

        document.querySelector(".together-we-care").style.display = 'none';
        document.querySelector(".make-your-donation").style.display = 'block';
        const btns=  document.querySelectorAll(".make-your-donation button")
        // console.log(btns)
        // console.log(e.target.innerHTML)
        for (let elem of btns){

            elem.classList.remove('popup__btn_active')
            if (elem.innerHTML.includes(e.target.innerHTML)){
                elem.classList.add('popup__btn_active')
                // console.log(elem.innerHTML)
                if (elem.innerHTML.includes('Other amount')){
                    // console.log(elem.nextSibling)
                    document.querySelector('.make-your-donation__other-amount-btn').nextElementSibling.disabled=false

                    elem.nextElementSibling.focus()
                }
            }

        }

    }

    if(e.target.closest('.make-your-donation__grid button')) {
        const  btn =  document.querySelectorAll(".make-your-donation__grid button")

        // console.log(btn)
        // console.log(e.target.innerHTML)
        for (let elem of btn){

            elem.classList.remove('popup__btn_active')
            // document.querySelector('.make-your-donation__other-amount-btn').nextElementSibling.value=''
            document.querySelector('.make-your-donation__other-amount-btn').nextElementSibling.disabled=true
        }

        e.target.classList.add('popup__btn_active')
                // console.log(e.target.innerHTML)

                if (e.target.innerHTML.includes('Other amount')){
                    // console.log(elem.nextSibling)
                    document.querySelector('.make-your-donation__other-amount-btn').nextElementSibling.disabled=false
                    e.target.nextElementSibling.focus()

                }
            }
    if(e.target.className.includes('make-your-donation__button_1')) {
        // console.log(e.target.innerHTML.slice(1))
        // e.target.innerHTML.slice(1)

        document.querySelector(".form-1").style.display = 'none';
        document.querySelector(".form-2").style.display = 'block';
    }

    if(e.target.className.includes('make-your-donation__button_2')) {
        // console.log('ok')
        document.querySelector(".form-3").style.display = 'block';
        document.querySelector(".form-2").style.display = 'none';
    }

    if(e.target.className.includes('make-your-donation__back-btn_2')) {
        // console.log('ok')
        document.querySelector(".form-1").style.display = 'block';
        document.querySelector(".form-2").style.display = 'none';
    }
    if(e.target.className.includes('make-your-donation__back-btn_3')) {
        // console.log('ok')
        document.querySelector(".form-2").style.display = 'block';
        document.querySelector(".form-3").style.display = 'none';
    }
    if(e.target.className.includes('complete-btn')) {
        popup.style.display='none'
        document.body.style.overflowY = '';

        alert("Thank you for your donation")
        document.querySelector(".form-1").style.display = 'block';
    }








})

function isNumberKey(evt,count){
    var charCode = (evt.which) ? evt.which : event.keyCode
        // console.log(evt)
    if ((charCode > 31 && (charCode < 48 || charCode > 57))||evt.target.value.length>count)
        return false;
    return true;
}

const arias = document.querySelectorAll('.form-3 input, .form-3 select');

for (let aria of arias) {
    aria.addEventListener('change', (event) =>{
        document.querySelector('.complete-btn').style.display='none'

        if (document.getElementById('Credit-Card-Number').value.length==16){

            if(document.getElementById('CVV-Number').value.length==3){
                if(Number.isInteger(+document.querySelector('.year-select').value)){

                    if(Number.isInteger(+document.querySelector('.year-select').value)){

                        document.querySelector('.complete-btn').style.display='flex'

                    }
                }
            }
        }

    })
}