

function useRequest(limit, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://picsum.photos/v2/list/?limit=${limit}`);

    xhr.onload = function() {
    if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
    } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
            callback(result);
        }
    }
    };
    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}

const inNode = document.querySelector('.content');

function displayContent(apiData) {
    let cards = '';
    console.log(apiData)
    apiData.forEach(element => {
        let cardBlock = `
        <div class='card'>
            <img 
                src=${element.download_url}
                class='card-img'>
            <p>${element.author}</p>
        </div>
        `
        cards = cards + cardBlock;  
    });
    inNode.innerHTML = cards;
}

function displayFailMessage() {
    inNode.innerHTML = `<p>Число вне диапазона от 1 до 10</p>`
}

btn.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    console.log(value);
    if (value >= 1 && value <= 10) {
        useRequest(value, displayContent)
    } else {
        useRequest(value, displayFailMessage)
    }
}, false);
