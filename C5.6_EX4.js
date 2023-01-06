const useRequest = async (width, height, callback) => {
    await fetch(`https://picsum.photos/${width}/${height}`)
    .then((response) => { 
        if (callback) {
            callback(response.url);
        }
    })
}

const inNode = document.querySelector('.content');

function DisplayImg(url) {
    let cardBlock = `
        <div class='card'>
            <img 
                src=${url}
                class='card-img'>
        </div>
        `
    inNode.innerHTML = cardBlock;
}

function FailRangeMessage() {
    inNode.innerHTML = '<p>одно число или оба числа вне диапазона от 100 до 300</p>';
}


btn.addEventListener('click', () => {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    // console.log(100 <= width, 100 <= height <= 300);
    if ((100 <= width && width <= 300) && (100 <= height && height <= 300)) {
        useRequest(width, height, DisplayImg)
    } else {
        FailRangeMessage();
    }

}, false);