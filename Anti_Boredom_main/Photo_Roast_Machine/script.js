// --- DOM Elements ---
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const rerollBtn = document.getElementById('reroll-btn');
const imagePreview = document.getElementById('image-preview');
const placeholderText = document.getElementById('placeholder-text');
const roastText = document.getElementById('roast-text');

// --- Funny Roasts Array ---
// Feel free to add more!
const roasts = [
    "I've seen better photos on a milk carton.",
    "This photo has the same resolution as a potato.",
    "Did you take this with a toaster?",
    "My grandma's flip phone takes better pictures.",
    "This picture is so blurry, I thought it was a Bigfoot sighting.",
    "Your camera seems to have a 'smudge' filter permanently on.",
    "I'm not a photographer, but I can tell you're not one either.",
    "This photo just called me 'out of focus'.",
    "Looks like you tried to take a panorama while sneezing.",
    "Are you sure this isn't a screenshot from a 90s video game?",
    "This picture has 'delete me' written all over it."
];

let hasImage = false;

// --- Functions ---

// Function to get and display a random roast
function getNewRoast() {
    if (!hasImage) {
        roastText.textContent = "Upload a photo first, genius.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * roasts.length);
    roastText.textContent = roasts[randomIndex];
}

// Function to handle image display
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            placeholderText.style.display = 'none';
            hasImage = true;
            getNewRoast(); // Show the first roast immediately
        }
        reader.readAsDataURL(file);
    }
}

// --- Event Listeners ---

// Trigger the hidden file input when the upload button is clicked
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

// Handle the file selection
fileInput.addEventListener('change', handleImageUpload);

// Handle the re-roll button click
rerollBtn.addEventListener('click', getNewRoast);