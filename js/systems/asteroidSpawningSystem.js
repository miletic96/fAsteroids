let lastAsteroidTime = performance.now();
let nextAsteroidTime = Math.random() * 2000 + 1000; // Initial random time between 1 and 3 seconds

function asteroidSpawningSystem(entities, canvas) {
    const asteroidSizes = ['large', 'medium', 'small'];
    const asteroidSpeed = { large: 1, medium: 2, small: 3 };
    function generateAsteroidShape(size) {
        const radius = size === 'large' ? 40 : size === 'medium' ? 20 : 10;
        const numVertices = 8; // Number of vertices for the asteroid
        const jaggedness = 0.4; // Amount of variation in the vertex positions
        const vertices = [];
    
        for (let i = 0; i < numVertices; i++) {
            const angle = (i / numVertices) * 2 * Math.PI;
            const offset = radius * (1 + (Math.random() - 0.5) * jaggedness);
            const x = Math.cos(angle) * offset;
            const y = Math.sin(angle) * offset;
            vertices.push({ x, y });
        }
    
        return vertices;
    }
    function spawnAsteroid(size) {
        const position = {
            x: Math.random() < 0.5 ? Math.random() * canvas.width : Math.random() < 0.5 ? -50 : canvas.width + 50,
            y: Math.random() < 0.5 ? Math.random() * canvas.height : Math.random() < 0.5 ? -50 : canvas.height + 50
        };
        const angle = Math.random() * 360;
        const velocity = {
            x: Math.cos(angle * Math.PI / 180) * asteroidSpeed[size],
            y: Math.sin(angle * Math.PI / 180) * asteroidSpeed[size]
        };
        const shape = generateAsteroidShape(size);
        return new Entity()
            .addComponent(new Component('position', position))
            .addComponent(new Component('velocity', velocity))
            .addComponent(new Component('rotation', { angle }))
            .addComponent(new Component('appearance', { type: 'asteroid', size }))
            .addComponent(new Component('collider', { radius: size === 'large' ? 40 : size === 'medium' ? 20 : 10 }))
            .addComponent(new Component('shape', shape)); // Add shape component;
            
    }

    const currentTime = performance.now();
    if (currentTime - lastAsteroidTime > nextAsteroidTime) {
        const size = asteroidSizes[Math.floor(Math.random() * asteroidSizes.length)];
        entities.push(spawnAsteroid(size));
        lastAsteroidTime = currentTime;
        nextAsteroidTime = Math.random() * 2000 + 1000; // Random time between 1 and 3 seconds
    }

    return entities;
}
