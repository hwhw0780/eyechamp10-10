let hasFlipped = false; // Track if the user has already picked a card
let userName = '';
let userPhone = '';
let cards; // Declare cards globally but initialize later

// Set the probabilities for each prize in percentages (must add up to 100)
const prizeProbabilities = [0, 1, 3, 16, 30, 50];

// Corresponding prizes for the images (you can map this to your images like '7.png', '8.png', etc.)
const prizes = [
    { imgSrc: '7.png', altText: 'iPhone 15 Pro Max' },
    { imgSrc: '8.png', altText: 'Apple Ipad' },
    { imgSrc: '9.png', altText: '$100 Voucher' },
    { imgSrc: '10.png', altText: '$50 Voucher' },
    { imgSrc: '11.png', altText: 'Mystery Gift T1' },
    { imgSrc: '12.png', altText: 'Mystery Gift T2' }
];

function startGame() {
    userName = document.getElementById('name').value;
    userPhone = document.getElementById('phoneNumber').value;

    if (userName && userPhone) {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('cards-container').style.display = 'flex';

        // Now that the cards are visible, select them
        cards = document.querySelectorAll('.card'); // Get all card elements

        // Attach event listeners to the cards for flipping
        cards.forEach((card, index) => {
            card.addEventListener('click', () => confirmCardSelection(card, index + 1)); // Pass card index +1 for user-friendly numbering
        });
    } else {
        alert('Please enter both name and phone number.');
    }
}

// Confirmation dialog before flipping a card
function confirmCardSelection(card, cardNumber) {
    const confirmation = confirm(`Are you sure you want to pick box ${cardNumber}?`);

    // Only proceed to flip the card if the user confirms
    if (confirmation) {
        flipCard(card); // If user confirms, flip the card
    }
}

function flipCard(card) {
    if (hasFlipped) return; // Stop if a card has already been flipped
    if (card.classList.contains('flipped')) return; // Prevent double flipping of the same card

    // Flip the selected card
    card.classList.add('flipped');
    card.classList.add('highlight'); // Highlight the selected card
    hasFlipped = true; // Mark that a card has been flipped

    // Determine the prize based on probabilities
    const prize = choosePrizeWithProbability();

    // Update the card's back image to show the correct prize image
    card.querySelector('.card-back img').src = prize.imgSrc;
    card.querySelector('.card-back img').alt = prize.altText;

    // Display the user's greeting message after the flip
    showGreeting(userName, userPhone, prize.altText);

    // After 3 seconds, flip all the other cards
    setTimeout(() => {
        flipAllCards();
    }, 3000);
}

function choosePrizeWithProbability() {
    let cumulativeProbability = 0;
    const randomNum = Math.random() * 100;

    for (let i = 0; i < prizeProbabilities.length; i++) {
        cumulativeProbability += prizeProbabilities[i];
        if (randomNum <= cumulativeProbability) {
            return prizes[i];
        }
    }
}

function flipAllCards() {
    cards.forEach(card => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
        }
    });
}

function showGreeting(name, phone, prize) {
    const greetingMessage = `Congratulations, ${name} (${phone})! You have won: ${prize}`;
    document.getElementById('greetingMessage').textContent = greetingMessage;
    document.getElementById('greeting').style.display = 'block';
}
