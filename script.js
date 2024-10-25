// Setup basic scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls for interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;

// Create a symmetric 15-sided object (dodecahedron)
const dodecahedronGeometry = new THREE.DodecahedronGeometry(2, 0); // Diameter 2
const dodecahedronMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff00ff,  // Color for dodecahedron
    wireframe: true 
});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
scene.add(dodecahedron);

// Create a symmetric 45-sided object using a custom geometry
const customGeometry = new THREE.OctahedronGeometry(3, 2);  // Placeholder geometry
const edgeGeometry = new THREE.EdgesGeometry(customGeometry);  // Extract edges from the shape
const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff,  // Neon cyan for retro/futuristic look
    linewidth: 2,
});
const polyhedronEdges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
scene.add(polyhedronEdges);

// Dynamic neon lighting
const pointLight1 = new THREE.PointLight(0x00ffff, 2, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff00ff, 2, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x9900ff, 2, 100);
pointLight3.position.set(10, -10, -10);
scene.add(pointLight3);

// Function to create a star point
function createStarPoint(size, color) {
    const starGeometry = new THREE.SphereGeometry(size, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: color });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
        THREE.MathUtils.randFloatSpread(200), // Random X position
        THREE.MathUtils.randFloatSpread(200), // Random Y position
        THREE.MathUtils.randFloatSpread(200)  // Random Z position
    );
    return star;
}

// Create multiple star points
const numStars = 1000; // Total number of stars for better clarity
for (let i = 0; i < numStars; i++) {
    const star = createStarPoint(0.1, Math.random() * 0xffffff);
    scene.add(star);
}

// Create constellations with fixed star groups for clarity
const constellations = [
    [
        [-30, 10, -50],
        [-20, 20, -40],
        [-10, 0, -30],
        [-25, -5, -35],
    ],
    [
        [20, -20, 20],
        [15, -15, 25],
        [10, -25, 30],
        [25, -10, 15],
    ],
    [
        [-15, 15, 10],
        [-10, 25, 15],
        [-5, 20, 20],
        [-20, 10, 5],
    ],
    [
        [30, -10, -30],
        [25, -5, -25],
        [20, -20, -20],
        [35, -15, -10],
    ],
    [
        [0, 30, 0],
        [-10, 35, 5],
        [10, 35, -5],
        [5, 40, 0],
    ],
    [
        [-35, 0, 35],
        [-30, 5, 30],
        [-25, -5, 25],
        [-40, -10, 40],
    ],
    [
        [15, 10, 15],
        [20, 5, 10],
        [25, -5, 5],
        [30, 0, 0],
    ],
];

// Create constellations
constellations.forEach(points => {
    points.forEach(point => {
        const star = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffcc00 }) // Gold color for constellation stars
        );
        star.position.set(point[0], point[1], point[2]);
        scene.add(star);
    });
});

// Position the camera
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update();  // Enable orbit controls

    // Rotate both dodecahedron and edges for dynamic effect
    dodecahedron.rotation.x += 0.005;
    dodecahedron.rotation.y += 0.005;

    polyhedronEdges.rotation.x += 0.005;
    polyhedronEdges.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Adjust rendering size on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
