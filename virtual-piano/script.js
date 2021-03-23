const piano = document.querySelector('.piano');
const notesBtn = document.querySelector('.btn-notes')
const lettersBtn = document.querySelector('.btn-letters')
const fullscreenBtn = document.querySelector('.fullscreen')
const body = document.querySelector('body')
let switchOut=false


piano.addEventListener('mousedown', (event) => {
    if (event.target.className.includes('piano-key')&& !(event.clientY<240||event .clientY>510)) switchOut=true
    keypress(event)
});
const type = 'mouseover';
piano.addEventListener(type, (event) => {
    if ((event.buttons == 1 || event.buttons == 2)&& switchOut) keypress(event)
});
window.addEventListener('keydown', (event) => keypress(event))



body.addEventListener('mouseup', (event) =>{
    switchOut=false
    releaseKey(event)
});
piano.addEventListener('mouseout', (event) => {

    if (event.buttons == 1 || event.buttons == 2) releaseKey(event)
});
window.addEventListener('keyup', (event) => releaseKey(event))



notesBtn.onclick = function activateNotes () {

    notesBtn.classList.add('btn-active')
    lettersBtn.classList.remove('btn-active')
    for (let elem of document.getElementsByClassName('piano-key'))
        elem.classList.remove('letter')

}
lettersBtn.onclick = function activateLetters() {

    lettersBtn.classList.add('btn-active')
    notesBtn.classList.remove('btn-active')
    for (let elem of document.getElementsByClassName('piano-key'))
        elem.classList.add('letter')

}


function keypress(e) {


    if (e.repeat) return
    // console.log(e)
    if(e.clientY<240||e .clientY>510) return;
    const key = piano.querySelector(`.piano-key[data-letter="${(e.code + "")[3]}"]`) || e.target
    if (!key.getAttribute('data-note')) return
    const src = `./assets/audio/${key.getAttribute('data-note')}.mp3`
    key.classList.add('piano-key-active')
    playAudio(src)
}

function releaseKey(e) {
    const key = piano.querySelector(`.piano-key[data-letter="${(e.code + "")[3]}"]`) || e.target
    key.classList.remove('piano-key-active')

}

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play()

}

fullscreenBtn.onclick = function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


