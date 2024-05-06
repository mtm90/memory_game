const cards = [
    { id: 1, img: 'aquarius.png' },
    { id: 2, img: 'aries.png' },
    { id: 3, img: 'cancer.png' },
    { id: 4, img: 'capricorn.png' },
    { id: 5, img: 'gemini.png' },
    { id: 6, img: 'leo.png' },
    { id: 7, img: 'libra.png' },
    { id: 8, img: 'pisces.png' },
    { id: 9, img: 'sagittarius.png' },
    { id: 10, img: 'scorpio.png' },
    { id: 11, img: 'taurus.png' },
    { id: 12, img: 'virgo.png' },
];

const duplicatedCards = cards.concat(cards);

let selectedCards = [];
let matchedCards = [];
let startTime;

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
            showCompletionMessage();
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
    
    // Shuffle the duplicatedCards array
    shuffleArray(duplicatedCards);

    duplicatedCards.forEach(card => {
        const newCard = createCard(card);
        gameContainer.appendChild(newCard);
    });

    // Start the timer
    startTime = new Date();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initializeGame();

function showCompletionMessage() {
    const endTime = new Date();
    const elapsedTime = Math.floor((endTime - startTime) / 1000); // Convert milliseconds to seconds
    let message;

    if (elapsedTime < 30) {
        message = `Congratulations! You completed the game in ${elapsedTime} seconds. That was fast!`;
    } else if (elapsedTime >= 30 && elapsedTime <= 45) {
        message = `Congratulations! You completed the game in ${elapsedTime} seconds. That was nice but you can do better!`;
    } else if (elapsedTime > 45 && elapsedTime <= 120) {
        message = `Congratulations! You completed the game in ${elapsedTime} seconds. That was kinda mid, try again!`;
    } else {
        message = `Congratulations! You completed the game in ${elapsedTime} seconds. That was kinda slow, you can certainly do better!`;
    }

    alert(message);
}

