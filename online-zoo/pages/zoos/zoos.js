const arr = [
    {
        'icon': 'icon-tiger',
        'text': 'Lorem ipsum dolor sit amet, consctetuer'
    },
    {
        'icon': 'icon-Coala',
        'text': 'One morning, when Gregor Samsa woke'
    },
    {
        'icon': 'icon-Alligator',
        'text': 'The quick, brown fox jumps over'
    },
    {
        'icon': 'icon-Lion',
        'text': 'A wonderful serenity has taken possession'
    }
]
let count = -1
const topArrow = document.querySelector('.sidebar__arrow-top'),
    ArrowDown = document.querySelector('.sidebar__extreme_bottom');


document.querySelector('.sidebar__extreme_top').addEventListener('click', () => {
    if (getComputedStyle(topArrow).transform !== 'none') {
        topArrow.style.transform = '';
        document.querySelector('.sidebar').style.width = ''
        document.querySelectorAll('.sidebar__item').forEach(item => {
            item.style.background = '';
            item.style.justifyContent = ''
        })
        document.querySelectorAll('.sidebar__icon').forEach(item => item.style.color = '')
        document.querySelectorAll('.sidebar_active .sidebar__icon').forEach(item => item.style.color = '')
        document.querySelectorAll('.sidebar__description').forEach(item => item.style.display = '')

    } else {
        topArrow.style.transform = 'rotate(180deg)';
        document.querySelector('.sidebar').style.width = '30rem'
        document.querySelectorAll('.sidebar__item').forEach(item => {
            item.style.background = 'none';
            item.style.justifyContent = 'space-between'
        })
        document.querySelectorAll('.sidebar__icon').forEach(item => item.style.color = '#F58021')
        document.querySelectorAll('.sidebar_active .sidebar__icon').forEach(item => item.style.color = '#FFFFFF')
        document.querySelectorAll('.sidebar__description').forEach(item => item.style.display = 'block')
    }


})
ArrowDown.addEventListener('click', () => {
    console.log('ok')

    let element = document.querySelectorAll('.sidebar__item')[3].cloneNode(true)
    if (count < arr.length - 1) count++
    else return
    console.log(element)
    element.innerHTML = `<div class="sidebar__circle">
                        <div class="sidebar__icon ${arr[count].icon}"></div>
                    </div>
                    <div class="sidebar__description">${arr[count].text}</div>`

    document.querySelector('.sidebar__extreme_bottom').before(element)
    if (getComputedStyle(topArrow).transform !== 'none') {
        document.querySelectorAll('.sidebar_active .sidebar__icon').forEach(item => item.style.color = '#FFFFFF')
        document.querySelectorAll('.sidebar__description').forEach(item => item.style.display = 'block')
        document.querySelectorAll('.sidebar__icon').forEach(item => item.style.color = '#F58021')
    }
    console.log(element)

    document.querySelectorAll('.sidebar__item')[0].remove()
})


document.querySelectorAll('.cam-slider__cart').forEach(item => addEventListener('click', changeVideo))

function changeVideo(e) {
    let currentSrc = e.target.getElementsByTagName('iframe')[0].src
    console.log(document.querySelector('.cams__main-video').firstElementChild.src)
    e.target.getElementsByTagName('iframe')[0].src = document.querySelector('.cams__main-video').firstElementChild.src
    document.querySelector('.cams__main-video').firstElementChild.src = currentSrc
}