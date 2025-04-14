const detailButtons = document.querySelectorAll('.details-btn');

detailButtons.forEach(button => {
  button.addEventListener('click', function() {
    const details = this.nextElementSibling;
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
  });
});

// Search functionality
document.getElementById('search').addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const recipes = document.querySelectorAll('.recipe');
  
  recipes.forEach(recipe => {
    const title = recipe.querySelector('h2').textContent.toLowerCase();
    recipe.style.display = title.includes(filter) ? 'block' : 'none';
  });
});
