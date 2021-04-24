const filters = document.querySelector('.filters'),
    img = document.querySelector('.editor>img'),
    filterInputs = document.querySelectorAll('.filters input'),
    resetBtn = document.querySelector('.btn-reset'),
    defaultFilter = [],
    nextBtn = document.querySelector('.btn-next'),
    loadBtn = document.querySelector('.btn-load--input'),
    saveBtn = document.querySelector('.btn-save'),
    fullscreenBtn = document.querySelector('.fullscreen');



let currentFilter = []
let counter = makeCounter()
for (let item of filterInputs) {
    defaultFilter.push(item.value)
    currentFilter.push(item.value)
}

nextBtn.addEventListener('click', nextClick)
resetBtn.addEventListener('click', resetClick)
filters.addEventListener('input', addFilter);
loadBtn.addEventListener('change', addFile);
saveBtn.addEventListener('click', saveImage);


function addFilter(event) {
    let filter = ''
    for (let i = 0; i < filterInputs.length; i++) {
        filter = filter + `${filterInputs[i].name}(${currentFilter[i] + '' + filterInputs[i].dataset.sizing})`
    }

    img.style.filter = filter
    event.target.nextElementSibling.innerHTML = `${event.target.value}`

    for (let i = 0; i < filterInputs.length; i++) {
        currentFilter[i] = filterInputs[i].value
    }
    drawImage()


}

function resetClick() {
    for (let i = 0; i < filterInputs.length; i++) {
        filterInputs[i].value = defaultFilter[i]
        img.style.filter = `${filterInputs[i].name}(${defaultFilter[i] + '' + filterInputs[i].dataset.sizing})`
        filterInputs[i].nextElementSibling.innerHTML = defaultFilter[i]

    }
    for (let i = 0; i < filterInputs.length; i++) {
        currentFilter[i] = defaultFilter[i]
    }
    drawImage()

}

function nextClick() {

    let date = new Date
    let time
    let hour = (date.getHours())
    switch (true) {
        case (hour < 5):
            time = 'night';
            break;
        case (hour < 12):
            time = 'morning';
            break;
        case (hour < 18):
            time = 'day';
            break;
        case (hour < 24):
            time = 'evening';
            break;
    }
    let src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${counter()}.jpg`
    const tempImg = document.createElement('img')
    tempImg.src = src
    tempImg.onload = () => {
        img.src = src
        drawImage()
    }
    //
    //

}

function makeCounter() {
    let count = 1
    return function () {
        if (count === 21) count = 1
        if (count < 10) return '0' + count++
        return count++
    }
}

function addFile(event) {
    const file = loadBtn.files[0];
    const reader = new FileReader();
    reader.onload = () => {

        img.src = reader.result;
        drawImage()
    }
    reader.readAsDataURL(file);
    event.target.value = ''

}

const canvas = document.querySelector('canvas');

function drawImage() {

    const img = new Image(),
        imageContainer = document.querySelector('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imageContainer.src
    img.onload = function () {
        imageContainer.style.display = 'none'
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        let filter = ''
        for (let i = 0; i < filterInputs.length; i++) {
            filter = filter + `${filterInputs[i].name}(${currentFilter[i] + '' + filterInputs[i].dataset.sizing})`
        }
        console.log(filter)
        ctx.filter = filter
        ctx.drawImage(img, 0, 0);


    };
}

drawImage()

function saveImage() {
    let link = document.createElement('a')
    link.download = 'download.png'
    link.href = canvas.toDataURL()
    link.click()
    link.delete

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


