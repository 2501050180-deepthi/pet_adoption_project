/* Main Application Logic */

// DOM Elements
const featuredGrid = document.getElementById('featured-grid');
const petsGrid = document.getElementById('pets-grid');
const adoptModal = document.getElementById('adopt-modal');
const adoptForm = document.getElementById('adopt-form');
const closeModalBtn = document.getElementById('close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (featuredGrid) renderFeaturedPets();
    if (petsGrid) renderAllPets();

    setupEventListeners();
    checkDrives();
});

function setupEventListeners() {
    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
                filterBtns.forEach(b => b.classList.add('btn-secondary'));

                // Add active to clicked
                e.target.classList.remove('btn-secondary');
                e.target.classList.add('active', 'btn-primary');

                const filter = e.target.dataset.filter;
                renderAllPets(filter);
            });
        });
    }

    // Modal Close
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Form Submit
    if (adoptForm) {
        adoptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(adoptForm);
            const petName = document.getElementById('modal-pet-name').textContent;

            // Simulate API call
            setTimeout(() => {
                closeModal();
                showNotification(`Application submitted for ${petName}! We'll contact you soon.`);
                adoptForm.reset();
            }, 1000);
        });
    }
}

function renderFeaturedPets() {
    const featured = pets.filter(pet => pet.featured).slice(0, 3);
    featuredGrid.innerHTML = featured.map(pet => createPetCard(pet)).join('');
}

function renderAllPets(filter = 'all') {
    let filtered = pets;
    if (filter !== 'all') {
        filtered = pets.filter(pet => pet.type === filter);
    }
    petsGrid.innerHTML = filtered.map(pet => createPetCard(pet)).join('');
}

function createPetCard(pet) {
    return `
        <div class="card">
            <img src="${pet.image}" alt="${pet.name}" class="card-img">
            <div class="card-body">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="card-title">${pet.name}</h3>
                    <span class="tag">${pet.age}</span>
                </div>
                <p class="text-muted mb-4">${pet.breed} • ${pet.gender}</p>
                <button class="btn btn-primary w-100" onclick="openAdoptModal(${pet.id})">Adopt Me</button>
            </div>
        </div>
    `;
}

// Global functions for inline onclick handlers
window.openAdoptModal = function (petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;

    const petNameSpan = document.getElementById('modal-pet-name');
    if (petNameSpan) petNameSpan.textContent = pet.name;

    if (modalOverlay) modalOverlay.classList.add('open');
};

function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('open');
}

function showNotification(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function checkDrives() {
    // Simulate checking for nearby drives occasionally
    if (adoptionDrives.length > 0 && Math.random() > 0.7) {
        setTimeout(() => {
            showNotification(`Upcoming Event: ${adoptionDrives[0].title} on ${adoptionDrives[0].date}!`);
        }, 2000);
    }
}
