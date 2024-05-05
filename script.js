const cards = [
   
    { id: 1, img: 'club.png' },
  
    { id: 2, img: 'diamond.png' },
  
    { id: 3, img: 'heart.png' },

    { id: 4, img: 'spades.png' },
];


const duplicatedCards = cards.concat(cards);

let selectedCards = [];
let matchedCards = [];

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const imgElement = document.createElement('img');
  
    imgElement.src = card.img;
    cardElement.appendChild(imgElement);

    cardElement.addEventListener('click', () => {
        if (selectedCards.length < 2 && !selectedCards.includes(cardElement)) {
            imgElement.style.display = 'block';
            selectedCards.push(cardElement);

            if (selectedCards.length === 2) {
                setTimeout(() => {
                    checkForMatch();
                }, 1000);
            }
        }
    });

    return cardElement;
}

function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;
    const firstId = firstCard.dataset.id;
    const secondId = secondCard.dataset.id;

    if (firstId === secondId) {
        matchedCards.push(firstCard, secondCard);
        selectedCards = [];

        if (matchedCards.length === cards.length * 2) {
            alert('Congratulations! You won the game!');
        }
    } else {
        setTimeout(() => {
            hideCards();
        }, 1000);
    }
}

function hideCards() {
    selectedCards.forEach(card => {
        const img = card.querySelector('img');
        img.style.display = 'none';
    });
    selectedCards = [];
}

function initializeGame() {
    const gameContainer = document.querySelector('.game-container');

    duplicatedCards.forEach(card => {
        const newCard = createCard(card);
        gameContainer.appendChild(newCard);
    });
}

initializeGame();
