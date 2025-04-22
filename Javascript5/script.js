const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null; // Variable to hold the original image

// Function to load the default image onto the canvas
function loadDefaultImage() {
const defaultImage = document.getElementById('default-image');
const container = document.querySelector('.image-container');
canvas.width = container.clientWidth; // Set canvas width to container width
canvas.height = container.clientHeight; // Set canvas height to container height
ctx.drawImage(defaultImage, 0, 0, canvas.width, canvas.height); // Fill the entire canvas with default image
}

// Load the default image when the page loads
window.onload = loadDefaultImage;

upload.addEventListener('change', function () {
const file = this.files[0];
const reader = new FileReader();

reader.onload = function (event) {
const img = new Image();
img.onload = function () {
// Set canvas dimensions to match image container dimensions
const container = document.querySelector('.image-container');
canvas.width = container.clientWidth; // Set canvas width to container width
canvas.height = container.clientHeight; // Set canvas height to container height

// Draw image on the canvas to cover the entire area
ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Fill the entire canvas
originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Store original image data
};
img.src = event.target.result;
};
reader.readAsDataURL(file);
});

function updateCanvas() {
if (!originalImage) return; // Ensure there's an image to work with

// Restore the original image
ctx.putImageData(originalImage, 0, 0);

const spacing = document.getElementById('spacing').value;
const blur = document.getElementById('blur').value;
const brightness = document.getElementById('brightness').value;
const contrast = document.getElementById('contrast').value;
const baseColor = document.getElementById('base').value; // Get base color

// Draw a border around the image
ctx.strokeStyle = baseColor; // Set border color to base color
ctx.lineWidth = spacing; // Use spacing value for border width
ctx.strokeRect(spacing / 2, spacing / 2, canvas.width - spacing, canvas.height - spacing); // Draw border

// Apply filters
ctx.filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
ctx.drawImage(canvas, 0, 0); // Redraw the image with effects
}

// Add event listeners for controls
document.getElementById('spacing').addEventListener('input', updateCanvas);
document.getElementById('blur').addEventListener('input', updateCanvas);
document.getElementById('brightness').addEventListener('input', updateCanvas);
document.getElementById('contrast').addEventListener('input', updateCanvas);
document.getElementById('base').addEventListener('input', updateCanvas); // Listen for base color changes

// Download functionality
document.getElementById('download').addEventListener('click', function () {
const link = document.createElement('a');
link.download = 'edited-image.png';
link.href = canvas.toDataURL();
link.click();
});
