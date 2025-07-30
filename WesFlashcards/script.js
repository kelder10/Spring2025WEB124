const flashcards = [
    { image: 'images/boy.png', text: 'Boy' },
    { image: 'image2.jpg', text: 'Description for image 2' },
    { image: 'image3.jpg', text: 'Description for image 3' },
    { image: 'image4.jpg', text: 'Description for image 4' },
    { image: 'image5.jpg', text: 'Description for image 5' },
    { image: 'image6.jpg', text: 'Description for image 6' },
    { image: 'image7.jpg', text: 'Description for image 7' },
    { image: 'image8.jpg', text: 'Description for image 8' },
    { image: 'image9.jpg', text: 'Description for image 9' },
    { image: 'image10.jpg', text: 'Description for image 10' },
    { image: 'image11.jpg', text: 'Description for image 11' },
    { image: 'image12.jpg', text: 'Description for image 12' },
    { image: 'image13.jpg', text: 'Description for image 13' },
    { image: 'image14.jpg', text: 'Description for image 14' },
    { image: 'image15.jpg', text: 'Description for image 15' },
    { image: 'image16.jpg', text: 'Description for image 16' },
    { image: 'image17.jpg', text: 'Description for image 17' },
    { image: 'image18.jpg', text: 'Description for image 18' },
    { image: 'image19.jpg', text: 'Description for image 19' },
    { image: 'image20.jpg', text: 'Description for image 20' },
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

