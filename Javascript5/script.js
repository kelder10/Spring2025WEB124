const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null; // Variable to hold the original image

upload.addEventListener('change', function () {
const file = this.files[0];
const reader = new FileReader();

reader.onload = function (event) {
const img = new Image();
img.onload = function () {
const maxWidth = canvas.width; // Canvas width
const maxHeight = canvas.height; // Canvas height

// Calculate the scaling factor to maintain aspect ratio
let scale = Math.min(maxWidth / img.width, maxHeight / img.height);

// Set new width and height based on the scaling factor
const imgWidth = img.width * scale;
const imgHeight = img.height * scale;

// Adjust canvas size based on new image size
canvas.width = imgWidth;
canvas.height = imgHeight;

// Clear previous image and draw the new image
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height); // Store original image data
}
img.src = event.target.result;
}
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
