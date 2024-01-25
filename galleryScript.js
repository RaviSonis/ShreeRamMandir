// Create a variable to track the slideshow state
let slideshowOn = false;
let slideshowTimeout;
let slideIndex = 0;

// Function to toggle the black background
function toggleBlackBackground() {
    const body = document.body;
    if (slideshowOn) {
        body.classList.add('black-background');
    } else {
        body.classList.remove('black-background');
    }
}

function toggleSlideshow() {
    // Toggle the slideshow state
    slideshowOn = !slideshowOn;

    // Get the body element and slideshow container
    const body = document.body;
    const slideshowContainer = document.getElementById('slideshow-container');

    // Update button text based on slideshow visibility
    const toggleButton = document.getElementById('toggle-slideshow-button');
    toggleButton.textContent = slideshowOn ? 'Close Darshan' : 'Live darshan';

    // Toggle the black background and slideshow visibility
    if (slideshowOn) {
        body.classList.add('black-background');
        slideshowContainer.classList.remove('hidden');

        // Play videos
        const videos = slideshowContainer.getElementsByTagName('video');
        for (let video of videos) {
            video.muted = true; // Mute the video to ensure autoplay works
            video.play().catch(e => console.error("Error playing video:", e));
        }

        // Start the slideshow
        showSlides(slideIndex);
    } else {
        body.classList.remove('black-background');
        slideshowContainer.classList.add('hidden');

        // Pause videos
        const videos = slideshowContainer.getElementsByTagName('video');
        for (let video of videos) {
            video.pause();
        }

        // Clear timeout for slideshow if any
        if (slideshowTimeout) {
            clearTimeout(slideshowTimeout);
        }
    }
}

// Get a reference to the button and add a click event listener to the toggle button
const toggleButton = document.getElementById('toggle-slideshow-button');
toggleButton.addEventListener('click', toggleSlideshow);

// Initialize the correct state of the slideshow and button text
function initializeSlideshow() {
    slideshowOn = false; // The slideshow should be off by default
    document.body.classList.remove('black-background');
    document.getElementById('slideshow-container').classList.add('hidden');
    toggleButton.textContent = 'Live Darshan'; // Set the button text to show "Show Slideshow"
}

// Call the initialize function to set the correct initial state
initializeSlideshow();

function showSlides() {
    if (!slideshowOn) {
        return; // Exit the function if the slideshow is turned off
    }

    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // Hide all slides
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; // Reset index to loop
    }
    slides[slideIndex - 1].style.display = "block"; // Show the current slide

    // Set timeout for next slide
    slideshowTimeout = setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

// Function to open the modal with the clicked image
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.style.display = 'block';
}
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Function to close the modal
function closeSlideshow() {
    slideshowOn = false; // Turn off the slideshow

    // Get the body element and slideshow container
    const body = document.body;
    const slideshowContainer = document.getElementById('slideshow-container');

    // Hide the slideshow
    slideshowContainer.classList.add('hidden');

    // Remove black background
    body.classList.remove('black-background');

    // Pause videos
    const videos = slideshowContainer.getElementsByTagName('video');
    for (let video of videos) {
        video.pause();
    }

    // Clear timeout for slideshow if any
    if (slideshowTimeout) {
        clearTimeout(slideshowTimeout);
    }

    // Update button text
    const toggleButton = document.getElementById('toggle-slideshow-button');
    toggleButton.textContent = 'Live Darshan';
}


// Event delegation for gallery photos
const photoGallery = document.querySelector('.photo-gallery');
photoGallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-image')) {
        const imageSrc = e.target.src;
        openModal(imageSrc);
    }
});

// Event listener to close the modal when the close button is clicked
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', closeSlideshow);

