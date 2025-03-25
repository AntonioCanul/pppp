// Configuración de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#miCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let figura; // Figura seleccionada
let verticesHelpers = []; // Almacena esferas para los vértices

// Material para los vértices
const vertexMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo para vértices

// Función para seleccionar la dimensión
function seleccionarDimension(dimension) {
    document.getElementById('menu-principal').style.display = 'none';
    if (dimension === '3D') {
        document.getElementById('menu-3d').style.display = 'block';
    } else {
        alert('Gráficos 2D aún no están implementados.');
        document.getElementById('menu-principal').style.display = 'block';
    }
}

// Función para seleccionar la figura 3D
function seleccionarFigura(tipo) {
    document.getElementById('menu-3d').style.display = 'none';
    document.getElementById('menu-transformaciones').style.display = 'block';

    // Eliminar cualquier figura previa y sus vértices
    if (figura) scene.remove(figura);
    verticesHelpers = []; // Vaciar la lista de vértices

    // Crear la figura seleccionada
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // Wireframe para destacar vértices
    switch (tipo) {
        case 'cubo':
            figura = new THREE.Mesh(new THREE.BoxGeometry(), material);
            break;
        case 'esfera':
            figura = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
            break;
        case 'cilindro':
            figura = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), material);
            break;
        case 'piramide':
            figura = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 4), material);
            break;
    }

    // Mostrar los vértices y añadirlos como hijos de la figura
    mostrarVertices(figura);

    scene.add(figura);
    camera.position.z = 5;

    animate();
}

// Función para mostrar los vértices de la figura
function mostrarVertices(figura) {
    const vertices = figura.geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        // Crear una esfera para marcar el vértice
        const sphereGeometry = new THREE.SphereGeometry(0.05);
        const sphere = new THREE.Mesh(sphereGeometry, vertexMaterial);
        sphere.position.set(x, y, z);

        // Añadir la esfera como hija de la figura
        figura.add(sphere);

        // Guardar una referencia al vértice (opcional)
        verticesHelpers.push(sphere);
    }
}

// Función para volver al menú principal
function volverMenuPrincipal() {
    document.getElementById('menu-principal').style.display = 'block';
    document.getElementById('menu-3d').style.display = 'none';
    document.getElementById('menu-transformaciones').style.display = 'none';

    // Eliminar la figura de la escena
    if (figura) scene.remove(figura);
    verticesHelpers = [];
}

// Función para volver al menú de figuras 3D
function volverMenu3D() {
    document.getElementById('menu-3d').style.display = 'block';
    document.getElementById('menu-transformaciones').style.display = 'none';

    // Eliminar la figura de la escena
    if (figura) scene.remove(figura);
    verticesHelpers = [];
}

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Funciones de transformación
function rotarFigura() {
    if (figura) {
        figura.rotation.x += 0.5;
        figura.rotation.y += 0.5;
    }
}

function escalarFigura() {
    if (figura) {
        figura.scale.x *= 1.5;
        figura.scale.y *= 1.5;
        figura.scale.z *= 1.5;
    }
}

function trasladarFigura() {
    if (figura) {
        figura.position.x += 0.5;
    }
}

function trasladarInverso() {
    if (figura) {
        figura.position.x -= 0.5;
    }
}

function trasladarArriba() {
    if (figura) {
        figura.position.y += 0.5;
    }
}

function trasladarAbajo() {
    if (figura) {
        figura.position.y -= 0.5;
    }
}

function resetFigura() {
    if (figura) {
        figura.rotation.set(0, 0, 0);
        figura.scale.set(1, 1, 1);
        figura.position.set(0, 0, 0);
    }
}
