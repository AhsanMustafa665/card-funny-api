const cardPic = document.getElementById('card-pic');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');

    const inputValue = input.value;
    if (isNaN(inputValue) || inputValue == "") {
        // alert('Please enter a number')
        error.innerText = "Please enter a number"
        cardPic.innerHTML = '';
    }
    else if (inputValue <= 0) {
        error.innerText = "Please enter a positive number"
        cardPic.innerHTML = ''
    }
    else if (inputValue >= 53) {
        error.innerText = "Not enough cards remaining to draw 53 additional"
    }
    else {
        cardPic.innerHTML = '';
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.cards))
        error.innerHTML = '';
    }
    input.value = '';

}
const displayCards = (cards) => {
    // console.log(cards);
    for (card of cards) {
        console.log(card);
        const div = document.createElement('div')
        div.className = 'col-lg-4 mb-5 rounded'

        div.innerHTML = `
        <div class="card" style="width: 18rem;">
       
                <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body bg-black">
                <h5 class="card-title text-white">${card.suit}</h5>
                <h4 class="card-text text-white">${card.code}</h4>
                <button onclick="cardDetails('${card.code}')" class="btn btn-success">See details</button>
            </div>
        </div>`
        cardPic.appendChild(div)

    }

}
const cardDetails = (code) => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
           
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                <div class="card-body bg-black">
                    <h5 class="card-title text-white">${singleCard.suit}</h5>
                    <h4 class="card-text text-white">${singleCard.code}</h4>
                    
                </div>
            </div>`
            cardPic.appendChild(div)
        })



}