const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        // Prevent default anchor click behavior
        event.preventDefault();

        const sectionId = this.getAttribute('href').substring(1); // Remove '#' from the href
        const section = document.getElementById(sectionId);

        // Hide all sections and show the clicked section
        const sections = document.querySelectorAll('section');
        sections.forEach(function (sec) {
            sec.classList.add('hidden');
        });

        section.classList.remove('hidden');
        
        // Trigger flower shower
        createFlowerShower();
        
        // Scroll to the section with offset for the fixed header
        scrollToSectionWithOffset(sectionId);
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const ramMandirText = document.getElementById('ram-mandir');
    const hoverSound = document.getElementById('hover-sound');

    ramMandirText.addEventListener('mouseenter', () => {
        // Check if the sound is not already playing
        if (hoverSound.paused) {
            hoverSound.play();
        }
    });

    ramMandirText.addEventListener('mouseleave', () => {
        // Optional: Stop the sound when not hovering
        hoverSound.pause();
        hoverSound.currentTime = 0;
    });
});

function scrollToSectionWithOffset(sectionId) {
    const section = document.getElementById(sectionId);
    const headerOffset = document.querySelector('header').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth' });
        createFlowerShower(); // Start the flower shower
    } else {
        section.classList.add('hidden');
    }
}
function createFlowerShower() {
    const flowerShowerContainer = document.getElementById('flower-shower');
    flowerShowerContainer.innerHTML = ''; // Clear any existing flowers

    // Function to create a single flower
    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.left = Math.random() * window.innerWidth + 'px';

        // Setting the background image directly
        flower.style.background = "url('Content/flower.png') no-repeat center center";
        flower.style.backgroundSize = 'contain';

        flowerShowerContainer.appendChild(flower);
    }

    // Create initial set of flowers
    for (let i = 0; i < 20; i++) {
        createFlower();
    }

    // Add new flowers at intervals
    const flowerInterval = setInterval(createFlower, 500); // Adjust time as needed

    // Stop adding flowers and clear them after 10 seconds
    setTimeout(() => {
        clearInterval(flowerInterval);
        flowerShowerContainer.innerHTML = '';
    }, 10000);
}

