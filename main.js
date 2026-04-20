/**
 * Main JS for Claudio Arq. Portfolio
 * Handles fetching projects and grid interactions
 */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'vsc3ma0t',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-04-15',
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source).auto('format').fit('max').width(1600).quality(80);
}

async function init() {
    const grid = document.getElementById('portfolio-grid');
    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');

    // Sample data structure (this will be fetched from JSON managed by CMS)
    let projects = [];

    async function loadProjects() {
        try {
            const query = `*[_type == "project"] | order(_createdAt desc){
                _id,
                title,
                category,
                description,
                location,
                area,
                year,
                materiality,
                image,
                mainImage,
                gallery
            }`;
            const fetchedData = await client.fetch(query);
            
            if (fetchedData && fetchedData.length > 0) {
                projects = fetchedData.map(project => ({
                    id: project._id,
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    location: project.location,
                    area: project.area,
                    year: project.year,
                    materiality: project.materiality,
                    image: project.image ? urlFor(project.image).url() : null,
                    mainImage: project.mainImage ? urlFor(project.mainImage).url() : null,
                    gallery: project.gallery ? project.gallery.map(img => urlFor(img).url()) : [],
                    thumbImage: (() => {
                        const src = project.mainImage || project.image || (project.gallery && project.gallery.length > 0 ? project.gallery[0] : null);
                        return src ? urlFor(src).width(600).url() : null;
                    })()
                }));
            } else {
                console.warn('No projects found in Sanity, using fallback data.');
                // Fallback for development/initial state if Sanity has no projects yet
                projects = [
                    {
                        id: 1,
                        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                        title: "Casa Sur Valdivia",
                        category: "Residencial",
                        description: "Diseño optimizado para luz natural y eficiencia térmica en el clima lluvioso del sur de Chile. El uso de materiales locales permite una integración orgánica con el paisaje.",
                        location: "Valdivia, Chile",
                        area: "180 m²",
                        year: "2025",
                        materiality: "Madera Termotratada, Hormigón Visto"
                    },
                    {
                        id: 2,
                        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
                        title: "Pabellón Minimalista",
                        category: "Comercial",
                        description: "Estructura abierta que dialoga con el entorno boscoso. La simplicidad de las líneas destaca la pureza geométrica del volumen.",
                        location: "Frutillar, Chile",
                        area: "90 m²",
                        year: "2024",
                        materiality: "Acero, Cristal Templado"
                    },
                    {
                        id: 3,
                        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                        title: "Edificio Centro",
                        category: "Oficinas",
                        description: "Remodelación de fachada y redistribución de planta libre para uso de oficinas corporativas de alto estándar.",
                        location: "Santiago, Chile",
                        area: "450 m²",
                        year: "2023",
                        materiality: "Hormigón, Aluminio"
                    }
                ];
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
        renderGrid();
    }

    let currentProject = null;
    let currentImageIndex = 0;

    function renderGrid() {
        grid.innerHTML = '';
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            // Use the main image as thumbnail (fallback to 'image' field or first gallery image)
            const thumbnail = project.thumbImage || project.mainImage || project.image || (project.gallery && project.gallery.length > 0 ? project.gallery[0] : null);

            item.innerHTML = `
                <img src="${thumbnail}" alt="${project.title}" loading="lazy">
                <div class="grid-item-overlay">
                    <div class="overlay-content">
                        <p class="overlay-title">${project.title}</p>
                    </div>
                </div>
            `;
            item.addEventListener('click', () => openModal(project));
            grid.appendChild(item);
        });
    }

    function updateModalImage() {
        if (!currentProject) return;
        const images = currentProject.gallery || [currentProject.image];
        const modalImg = document.getElementById('modal-img');
        
        // Add a simple fade transition effect
        modalImg.style.opacity = 0;
        setTimeout(() => {
            modalImg.src = images[currentImageIndex];
            modalImg.style.opacity = 1;
        }, 150);

        // Hide/show nav buttons if only one image
        const nav = document.querySelector('.modal-image-nav');
        if (images.length <= 1) {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    }

    const modalBody = document.querySelector('.modal-body');
    const imageContainer = document.querySelector('.modal-image-container');

    let maxScroll = 0;

    function handleModalScroll() {
        if (window.innerWidth >= 768) return; // Only for mobile
        
        const scrollTop = modalBody.scrollTop;
        // Keep track of the furthest scroll position to prevent re-expanding
        maxScroll = Math.max(maxScroll, scrollTop);
        
        const baseHeight = 55; // vh
        const minHeight = 25; // vh
        const shrinkRate = 0.2; // Adjust for sensitivity
        
        // Use maxScroll instead of scrollTop to keep it shrunk
        const newHeight = Math.max(minHeight, baseHeight - (maxScroll * shrinkRate));
        imageContainer.style.setProperty('--modal-img-height', `${newHeight}vh`);
    }

    modalBody.addEventListener('scroll', handleModalScroll);

    function openModal(project) {
        currentProject = project;
        currentImageIndex = 0;
        
        document.getElementById('modal-title').innerText = project.title;
        document.getElementById('modal-category').innerText = project.category;
        document.getElementById('modal-desc').innerText = project.description;
        document.getElementById('modal-loc').innerText = project.location;
        document.getElementById('modal-area').innerText = project.area;
        document.getElementById('modal-year').innerText = project.year;
        document.getElementById('modal-mat').innerText = project.materiality;

        updateModalImage();
        
        // Reset scroll, maxScroll and height
        modalBody.scrollTop = 0;
        maxScroll = 0;
        imageContainer.style.setProperty('--modal-img-height', '55vh');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function nextImage() {
        if (!currentProject) return;
        const images = currentProject.gallery || [currentProject.image];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalImage();
    }

    function prevImage() {
        if (!currentProject) return;
        const images = currentProject.gallery || [currentProject.image];
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalImage();
    }

    document.getElementById('next-img').addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
    document.getElementById('prev-img').addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModalHandler();
    });

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProject = null;
    }

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // Tab Switching Logic
    const actionButtons = document.querySelectorAll('.action-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update button active state
            actionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch content with a small delay for the animation
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            setTimeout(() => {
                const targetElement = document.getElementById(targetTab);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
            }, 50);
        });
    });

    // Initial load
    loadProjects();
}

document.addEventListener('DOMContentLoaded', init);
