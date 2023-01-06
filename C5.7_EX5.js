const inNode = document.querySelector('.content');

const useRequest = async (num_page, limit, callback) => {
    await fetch(`https://picsum.photos/v2/list?page=${num_page}&limit=${limit}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        localStorage.setItem('pics_json', JSON.stringify(json));
        if (callback) {
            callback(json);
        }
    })}

function displayContent(apiData) {
    let cards = '';
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


function FailPageLimitRangeMessage() {
    inNode.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
}    

    function FailPageRangeMessage() {
    inNode.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
}

function FailLimitRangeMessage() {
    inNode.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>';
}

const isNumeric = n => !!Number(n);


btn.addEventListener('click', () => {
    const num_page = document.getElementById('num_page').value;
    const limit = document.getElementById('limit').value;
    console.log(typeof num_page)
    console.log(isNumeric(num_page))
    if ((num_page < 1 || num_page > 10 || !isNumeric(num_page)) && (limit < 1 || limit > 10 || !isNumeric(limit))) {
        FailPageLimitRangeMessage();
    } else if (num_page < 1 || num_page > 10 || !isNumeric(num_page)) {
        FailPageRangeMessage();
    } else if (limit < 1 || limit > 10 || !isNumeric(limit)) {
        FailLimitRangeMessage();
    } else {
        useRequest(num_page, limit, displayContent);
    }
}, false);

window.addEventListener("load", () => {
    lastPicsJSON = JSON.parse(localStorage.getItem('pics_json'));
    displayContent(lastPicsJSON)
}, false);