const flashcards = [
    { image: 'images/picWes.png', text: 'Wesley' },
    { image: 'images/luca.png', text: 'Luca' },
    { image: 'images/dada.png', text: 'Dada' },
    { image: 'images/mama.png', text: 'Mama' },
    { image: 'images/boy.png', text: 'Boy' },
    { image: 'images/girl.png', text: 'Girl' },
    { image: 'images/goSign.png', text: 'Go' },
    { image: 'images/yesSign.png', text: 'Yes' },
    { image: 'images/noSign.png', text: 'No' },
    { image: 'images/help.png', text: 'Help' },
    { image: 'images/eat.png', text: 'Eat' },
    { image: 'images/oatmeal.png', text: 'Oatmeal' },
    { image: 'images/cookie.png', text: 'Cookie' },
    { image: 'images/popsicle.png', text: 'Popsicle' },
    { image: 'images/iceCream2.png', text: 'Ice Cream' },
    { image: 'images/dog.png', text: 'Dog' },
    { image: 'images/cat.png', text: 'Cat' },
    { image: 'images/cow.png', text: 'Cow' },
    { image: 'images/horse.png', text: 'Horse' },
    { image: 'images/car.png', text: 'Car' },
    { image: 'images/bike.png', text: 'Bike' },
    { image: 'images/orange.png', text: 'Orange' },
    { image: 'images/yellow.png', text: 'Yellow' },
    { image: 'images/purple.svg', text: 'Purple' },
    { image: 'images/red.png', text: 'Red' },
    { image: 'images/blue.png', text: 'Blue' },
];

let currentIndex = 0;

function updateFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const image = flashcard.querySelector('.flashcard-image');
    const text = flashcard.querySelector('.flashcard-text');

    image.src = flashcards[currentIndex].image;
    text.innerText = flashcards[currentIndex].text;
}

function previousFlashcard() {
    currentIndex = (currentIndex - 1) % flashcards.length;
    updateFlashcard();
}

function nextFlashcard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    updateFlashcard();
}

function speakText() {
    const text = flashcards[currentIndex].text;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

document.getElementById('nextButton').addEventListener('click', nextFlashcard);
document.getElementById('previousButton').addEventListener('click', previousFlashcard);

// Initialize the first flashcard
updateFlashcard();
