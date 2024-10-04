document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    
    const messages = [
        "Hey, how was your day?",
        "This is Mahadi Hasan"
    ];
    const secondaryText = "Good to have you here to showcase my work and projects.";
    const typingElement = document.getElementById('typing-text');
    const secondaryElement = document.getElementById('secondary-text');
    const nav = document.querySelector('nav');
    const heroSection = document.getElementById('hero');
    const projectCards = document.querySelectorAll('.project-card');
    const headings = document.querySelectorAll('h2');
    const paragraphs = document.querySelectorAll('p');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const container = document.getElementById('3d-container');
    
    console.log("Messages: ", messages);
    console.log("Secondary text: ", secondaryText);
    
    if (!typingElement || !secondaryElement) {
        console.error("Required elements not found in the DOM");
        return;
    }

    let messageIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        console.log(`Typing message ${messageIndex}, charIndex ${charIndex}`);
        if (charIndex < messages[messageIndex].length) {
            typingElement.style.visibility = "visible";
            typingElement.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (messageIndex < messages.length - 1) {
            setTimeout(() => {
                console.log(`Completed message ${messageIndex}, moving to next message`);
                typingElement.textContent = "";
                charIndex = 0;
                messageIndex++;
                typeWriter();
            }, 1000);
        } else {
            setTimeout(() => {
                console.log("All messages typed, displaying secondary text");
                typingElement.textContent = "";
                typingElement.style.visibility = "hidden";
                secondaryElement.textContent = secondaryText;
                secondaryElement.classList.add('visible');
            }, 1000);
        }
    }
    typeWriter();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            scrollTopBtn.classList.add('visible');
        } else {
            nav.classList.remove('scrolled');
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hero section animation
    if (heroSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroSection.classList.add('visible');
                }
            });
        });
        observer.observe(heroSection);
    }

    // Project cards animation
    if (projectCards.length > 0) {
        const projectObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        projectCards.forEach(card => {
            projectObserver.observe(card);
        });
    }

    // Headings text reveal animation
    if (headings.length > 0) {
        const headingObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        headings.forEach(heading => {
            headingObserver.observe(heading);
        });
    }

    // Paragraphs fade-in animation
    if (paragraphs.length > 0) {
        const paragraphObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        paragraphs.forEach(paragraph => {
            paragraphObserver.observe(paragraph);
        });
    }

    // Three.js code to add a 3D object beside "Mahadi Hasan"
    if (container) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1 for square canvas
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
        renderer.setSize(300, 300); // Size matching the container
        container.appendChild(renderer.domElement);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Load a GLTF 3D model
        const loader = new THREE.GLTFLoader();
        loader.load('path_to_your_model/model.gltf', function(gltf) {
            const model = gltf.scene;
            scene.add(model);
            model.scale.set(1.5, 1.5, 1.5); // Scale model as needed
            model.position.set(0, 0, 0); // Adjust position
            animate();
        });

        camera.position.z = 5;

        // Animation loop for rendering
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    } else {
        console.error("3D container element not found in the DOM");
    }

    // Dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark/Light Mode';
    toggleButton.id = 'darkModeToggle';
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
});