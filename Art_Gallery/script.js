// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Artwork Data ---
    let artworks = [
        {
            title: 'The Starry Night',
            artist: 'Vincent van Gogh',
            year: 1889,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        },
        {
            title: 'Mona Lisa',
            artist: 'Leonardo da Vinci',
            year: 'c. 1503–1506',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        },
        {
            title: 'The Persistence of Memory',
            artist: 'Salvador Dalí',
            year: 1931,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
        },
        {
            title: 'Girl with a Pearl Earring',
            artist: 'Johannes Vermeer',
            year: 'c. 1665',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1280px-1665_Girl_with_a_Pearl_Earring.jpg',
        },
        {
            title: 'The Great Wave off Kanagawa',
            artist: 'Hokusai',
            year: 'c. 1829–1833',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
        },
        // --- New Additions ---
        {
            title: 'The Scream',
            artist: 'Edvard Munch',
            year: 1893,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1280px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
        },
        {
            title: 'American Gothic',
            artist: 'Grant Wood',
            year: 1930,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/1280px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
        },
        {
            title: 'The Birth of Venus',
            artist: 'Sandro Botticelli',
            year: 'c. 1484–1486',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
        },
    ];

    let currentIndex = 0;

    // --- DOM Elements ---
    const artPiece = document.getElementById('artPiece');
    const artImage = document.getElementById('artImage');
    const artTitle = document.getElementById('artTitle');
    const artDetails = document.getElementById('artDetails');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // --- Modal Elements ---
    const uploadButton = document.getElementById('uploadButton');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.getElementById('closeModal');
    const uploadForm = document.getElementById('uploadForm');
    const titleInput = document.getElementById('titleInput');
    const artistInput = document.getElementById('artistInput');
    const yearInput = document.getElementById('yearInput');
    const fileInput = document.getElementById('fileInput');

    // --- Functions ---
    function updateArt(index) {
        const art = artworks[index];
        artImage.src = art.imageUrl;
        artImage.alt = art.title;
        artTitle.textContent = art.title;
        artDetails.textContent = `${art.artist} (${art.year})`;
    }
    
    function showArt(index) {
        artPiece.classList.add('fading');
        setTimeout(() => {
            currentIndex = index;
            updateArt(currentIndex);
            artPiece.classList.remove('fading');
        }, 500);
    }

    // --- Event Listeners for Gallery Navigation ---
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % artworks.length;
        showArt(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        showArt(prevIndex);
    });

    // --- Modal Logic ---
    function showModal() {
        uploadModal.classList.remove('hidden');
    }

    function hideModal() {
        uploadModal.classList.add('hidden');
    }

    uploadButton.addEventListener('click', showModal);
    closeModal.addEventListener('click', hideModal);
    uploadModal.addEventListener('click', (event) => {
        if (event.target === uploadModal) {
            hideModal();
        }
    });

    // --- Form Submission Logic ---
    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const artist = artistInput.value;
        const year = yearInput.value;
        const file = fileInput.files[0];

        if (file && title && artist && year) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const newArt = {
                    title: title,
                    artist: artist,
                    year: year,
                    imageUrl: e.target.result,
                };
                artworks.push(newArt);
                showArt(artworks.length - 1);
                hideModal();
                uploadForm.reset();
            };

            reader.readAsDataURL(file);
        }
    });

    // --- Initial Load ---
    updateArt(0);
});