const feedback=[


    {'date': 'New Jersey, June 2020',
     'feed':'I am writing to thank you for your mission is to bring people closer to nature! Like myself, children were very impressed by the opportunity to explore the life of incredible animals in real-time.',
     'author':'Karen June 2020'
    },
    {'date': 'Toronto, November 2020',
        'feed':'We so enjoy the ever-evolving selection of animals from around the globe. THANK YOU for sharing these fascinating animal friends with us so that we may learn and increase our understanding of the animal kingdom.',
        'author':'Carol Larsen'
    },
    {'date': 'London, February 2020',
        'feed':'A fantastic experience for kids and adults alike! If anyone is looking for an attraction that educates people on wild animals –  it\'s for you! I highly recommend seeing for yourself the variety of animals on your screen.',
        'author':'C. Stockman'
    },
    {'date': 'Amsterdam, June 2020',
        'feed':'I want to thank you for the amazing sites you find to put your cameras to let each of us see things that we would probably never see on our own. There are so many positives on Zoo Online and I\'m grateful for it. Thank you so much!',
        'author':'Tomas Ray'
    },
    {'date': 'Toronto, June 2020',
        'feed':'I am writing to thank you for your mission is to bring people closer to nature! Like myself, children were very impressed by the opportunity to explore the life of incredible animals in real-time.',
        'author':'Tomas Stockman'
    },
    {'date': 'London November 2020',
        'feed':'Like myself, children were very impressed by the opportunity to explore the life of incredible animals in real-time.We so enjoy the ever-evolving selection of animals from around the globe.',
        'author':'C. Larsen'
    },

    ];
let couter=0;
let intervalID,
    timeoutID,
    rotate=0
interval()
const feedbackCart=document.querySelectorAll('.feed-back-cart')
// for (let j=0;j<feedback.length;j++){
function chengeFidback(move) {


for (let i=0; i<feedbackCart.length;i++){
    // feedbackCart[i].style.opacity='60%'
    feedbackCart[i].style.transform=`rotateY(${rotate}deg)`;

    feedbackCart[i].innerHTML=`<div class="feed-back-cart__icon">“</div>
                                <div class="feed-back-cart__title">${feedback[i+move].date}</div>
                                <div class="feed-back-cart__text">${feedback[i+move].feed}</div>
                                <div class="feed-back-cart__author">${feedback[i+move].author}</div>`



    }
}
// }
document.querySelector('.what-our-users__arrow-right').addEventListener('click',function () {
    couter++
    rotate+=360
    if (couter>2) couter=0
    chengeFidback(couter)
timeout()



})
document.querySelector('.what-our-users__arrow-left').addEventListener('click',function () {

    couter--
    rotate-=360
    if (couter<1) couter=2
    chengeFidback(couter)
    timeout()

})
function interval(){


    intervalID = setInterval(()=>{
        couter++
        rotate+=360
        if (couter>2) couter=0
        chengeFidback(couter)
    },15000)

}

function timeout() {
    clearInterval(intervalID)
    clearTimeout(timeoutID)
  timeout=setTimeout(interval,60000)

}