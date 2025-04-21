const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', function () {
const file = this.files[0];
const reader = new FileReader();

reader.onload = function (event) {
const img = new Image();
img.onload = function () {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
}
img.src = event.target.result;
}
reader.readAsDataURL(file);
});

// Update canvas filters based on sliders
function updateCanvas() {
const spacing = document.getElementById('spacing').value;
const blur = document.getElementById('blur').value;
const brightness = document.getElementById('brightness').value;
const contrast = document.getElementById('contrast').value;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
ctx.drawImage(canvas, 0, 0); // Redraw the image with effects
}

// Add event listeners for controls
document.getElementById('spacing').addEventListener('input', updateCanvas);
document.getElementById('blur').addEventListener('input', updateCanvas);
document.getElementById('brightness').addEventListener('input', updateCanvas);
document.getElementById('contrast').addEventListener('input', updateCanvas);

// Download functionality
document.getElementById('download').addEventListener('click', function () {
const link = document.createElement('a');
link.download = 'edited-image.png';
link.href = canvas.toDataURL();
link.click();
});
