function startGame() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // Retrieve the play count from the cookie
    let playCount = parseInt(getCookie(phoneNumber)) || 0;

    // Check if the user with this phone number has played twice
    if (playCount >= 2) {
        alert('You have already played twice!');
    } else {
        // Increment the play count and set the updated value in the cookie
        playCount++;
        setCookie(phoneNumber, playCount.toString(), 30);

        // Make the cards visible
        const cards = document.querySelectorAll('.card-container');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

function revealDiscount(cardId) {
    if (!confirm("Are you sure you want to open " + cardId + "?")) {
        return;
    }

    const card = document.getElementById(cardId).querySelector('.card');
    // ... rest of the function ...


    card.style.transform = "rotateY(180deg)";
    
    // Insert the random discount and code into the card
    const discount = getRandomDiscount();
    const code = getRandomCode();
    document.getElementById("redeemText").style.display = "block";
    document.getElementById("redeemSteps").style.display = "block";
    
    // Calculate expiry date (14 days from now)
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    const expiryDateText = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    card.querySelector('.card-back-content').innerHTML = `<div class="discountMessage">${discount}</div><div class="discountMessage1">*capped discount at $275*</div><div><br></div><div>Discount Code: ${code}</div><div>Phone number: ${phoneNumber.value}</div><div>Expiry Date: ${expiryDateText}</div><br><div>Screenshot this to redeem the voucher! :)</div>`;
    
    
    // Disable further interactions for all cards
    document.getElementById("card1").onclick = null;
    document.getElementById("card2").onclick = null;
    document.getElementById("card3").onclick = null;
}

// Function to generate a random discount
function getRandomDiscount() {
    const randomNum = Math.random();
    let discounts = [];

    if (randomNum < 0.60) { // 60% chance
        discounts.push("25% Off (Min Spend $100)");
    } else if (randomNum < 0.95) { // 35% chance
        discounts.push("30% Off (Min Spend $100)");
    } else { // 5% chance
        discounts.push("40% Off (Min Spend $100)");
    }
    const randomIndex = Math.floor(Math.random() * discounts.length);
    return discounts[randomIndex];
}

// Function to generate a random discount code
function getRandomCode() {
    const randomNum = Math.floor(Math.random() * 100000);
    return `FLEYE${String(randomNum).padStart(5, '0')}`;  // Pads with zeros to ensure 5 digits
}

function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function gameEnd() {
    // Disable the input and button
    document.getElementById('phoneNumber').setAttribute('disabled', true);
    document.querySelector('button').setAttribute('disabled', true);

    // ... any other logic you want to execute when the game ends
}
