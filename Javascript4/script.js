const panels = document.querySelectorAll('.panel');
const mainSaying = document.querySelector('.main-saying');

function toggleOpen() {
this.classList.toggle('open');

if (this.classList.contains('open')) {
mainSaying.style.opacity = '0'; // Hide the saying
} else {
mainSaying.style.opacity = '1'; // Show the saying again
}
}

function toggleActive(e) {
if (e.propertyName.includes('flex')) {
this.classList.toggle('open-active');
}
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
