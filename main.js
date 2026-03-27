/**
 * Main JS for Claudio Arq. Portfolio
 * Handles fetching projects and grid interactions
 */

async function init() {
    const grid = document.getElementById('portfolio-grid');
    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');

    // Sample data structure (this will be fetched from JSON managed by CMS)
    let projects = [];

    async function loadProjects() {
        try {
            const response = await fetch('content/projects.json');
            if (response.ok) {
                const data = await response.json();
                projects = data.projects || [];
            } else {
                console.warn('Projects JSON not found, using fallback data.');
                // Fallback for development/initial state
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
                    },
                    {
                        id: 4,
                        image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80",
                        title: "Residencia Bosque",
                        category: "Residencial",
                        description: "Vivienda unifamiliar situada en la precordillera, diseñada para maximizar las vistas al valle.",
                        location: "Lo Barnechea, Chile",
                        area: "320 m²",
                        year: "2022",
                        materiality: "Piedra Local, Vidrio"
                    },
                    {
                        id: 5,
                        image: "https://images.unsplash.com/photo-1448630360428-65ff2c0257e1?auto=format&fit=crop&w=1200&q=80",
                        title: "Centro Cultural",
                        category: "Público",
                        description: "Espacio polivalente para la comunidad, con énfasis en la acústica y el flujo de personas.",
                        location: "Concepción, Chile",
                        area: "1200 m²",
                        year: "2021",
                        materiality: "Hormigón, Cobre"
                    },
                    {
                        id: 6,
                        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                        title: "Torre Mirador",
                        category: "Oficinas",
                        description: "Edificio de gran altura con certificación LEED, integrando jardines verticales en su estructura.",
                        location: "Santiago, Chile",
                        area: "5400 m²",
                        year: "2020",
                        materiality: "Acero, Vidrio Low-E"
                    }
                ];
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
        renderGrid();
    }

    function renderGrid() {
        grid.innerHTML = '';
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.innerHTML = `
                <img src="${project.image}" alt="${project.title}" loading="lazy">
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

    function openModal(project) {
        document.getElementById('modal-img').src = project.image;
        document.getElementById('modal-title').innerText = project.title;
        document.getElementById('modal-category').innerText = project.category;
        document.getElementById('modal-desc').innerText = project.description;
        document.getElementById('modal-loc').innerText = project.location;
        document.getElementById('modal-area').innerText = project.area;
        document.getElementById('modal-year').innerText = project.year;
        document.getElementById('modal-mat').innerText = project.materiality;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // Initial load
    loadProjects();
}

document.addEventListener('DOMContentLoaded', init);
