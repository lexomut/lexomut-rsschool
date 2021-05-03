const arr=[
    {'icon':'icon-tiger',
    'text':'Lorem ipsum dolor sit amet, consctetuer'},
    {'icon':'icon-Coala',
        'text':'One morning, when Gregor Samsa woke'},
    {'icon':'icon-Alligator',
        'text':'The quick, brown fox jumps over'},
    {'icon':'icon-Lion',
        'text':'A wonderful serenity has taken possession'}
]
let count=-1
const topArrow= document.querySelector('.sidebar__arrow-top'),
    ArrowDown= document.querySelector('.sidebar__arrow')

topArrow.addEventListener('click',()=>{
    if(getComputedStyle(topArrow).transform !== 'none'){
        topArrow.style.transform='';
        document.querySelector('.sidebar').style.width=''
        document.querySelectorAll('.sidebar__item').forEach(item=>{item.style.background='';item.style.justifyContent='' })
        document.querySelectorAll('.sidebar__icon').forEach(item=>item.style.color='')
        document.querySelectorAll('.sidebar_active .sidebar__icon').forEach(item=>item.style.color='')
        document.querySelectorAll('.sidebar__description').forEach(item=>item.style.display='')

    }
    else {
    topArrow.style.transform='rotate(180deg)';
    document.querySelector('.sidebar').style.width='30rem'
    document.querySelectorAll('.sidebar__item').forEach(item=>{item.style.background='none';item.style.justifyContent='space-between' })
    document.querySelectorAll('.sidebar__icon').forEach(item=>item.style.color='#F58021')
    document.querySelectorAll('.sidebar_active .sidebar__icon').forEach(item=>item.style.color='#FFFFFF')
    document.querySelectorAll('.sidebar__description').forEach(item=>item.style.display='block')
}


})
ArrowDown.addEventListener('click',()=>{
    console.log('ok')
    if (count<arr.length)count++
    let element=document.querySelectorAll('.sidebar__item')[3].cloneNode(true)
    element.innerHTML=`<div class="sidebar__circle">
                        <div class="sidebar__icon ${arr[count].icon}"></div>
                    </div>
                    <div class="sidebar__description">${arr[count].text}</div>`
    document.querySelector('.sidebar__extreme_bottom').before(element)
    document.querySelectorAll('.sidebar__item')[0].remove()
})


