const movieListDiv = document.getElementById('movie-list');
const reviewForm = document.getElementById('review-form');
const searchInput = document.getElementById('search-bar');

// Sample movie data
const movies = [
{
title: 'Inception',
year: 2010,
reviews: [
{ text: 'Amazing movie!', rating: 5, id: 1 },
{ text: 'Mind-bending and thrilling.', rating: 4, id: 2 }
]
},
{
title: 'The Matrix',
year: 1999,
reviews: [
{ text: 'A groundbreaking film.', rating: 5, id: 3 }
]
}
];

// Function to create review elements
function createReviewElement(review) {
const reviewDiv = document.createElement('p');
reviewDiv.textContent = `${review.text} (Rating: ${review.rating})`;

// Create action buttons
const actionsDiv = document.createElement('div');
actionsDiv.classList.add('review-actions');

const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.onclick = () => editReview(review);

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.onclick = () => deleteReview(review);

actionsDiv.append(editButton, deleteButton);
reviewDiv.appendChild(actionsDiv);
return reviewDiv;
}

// Function to render movies and their reviews
function displayMovies(moviesToDisplay = movies) {
movieListDiv.innerHTML = ''; // Clear previous content
moviesToDisplay.forEach(movie => {
const movieDiv = document.createElement('div');
movieDiv.classList.add('movie');
movieDiv.innerHTML = `<h3>${movie.title} (${movie.year})</h3>`;
movie.reviews.forEach(review => movieDiv.appendChild(createReviewElement(review)));
movieListDiv.appendChild(movieDiv);
});
}

// Helper functions for editing and deleting reviews
function editReview(review) {
const newText = prompt('Edit your review:', review.text);
const newRating = prompt('Edit your rating (1-5):', review.rating);
if (newText && newRating) {
review.text = newText;
review.rating = Number(newRating);
displayMovies(); // Refresh the displayed movies
}
}

function deleteReview(review) {
const movie = movies.find(m => m.reviews.includes(review));
movie.reviews.splice(movie.reviews.indexOf(review), 1); // Remove review
displayMovies(); // Refresh the displayed movies
}

// Event listener for the review form
reviewForm.addEventListener('submit', function(event) {
event.preventDefault();
const title = document.getElementById('movie-title').value;
const reviewText = document.getElementById('review-text').value;
const reviewRating = Number(document.getElementById('review-rating').value);

const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
if (movie) {
movie.reviews.push({ text: reviewText, rating: reviewRating, id: movie.reviews.length + 1 });
displayMovies();
} else {
alert('Movie not found!');
}

reviewForm.reset(); // Clear the form fields
});

// Search functionality
searchInput.addEventListener('input', function() {
const searchTerm = searchInput.value.toLowerCase();
const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
displayMovies(filteredMovies);
});

// Initial display of movies
displayMovies();
