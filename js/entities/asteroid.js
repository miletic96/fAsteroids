function createAsteroid(size, position, velocity, angle) {
    const shape = generateAsteroidShape(size);

    return new Entity()
        .addComponent(new Component('position', position))
            .addComponent(new Component('velocity', velocity))
            .addComponent(new Component('rotation', { angle }))
            .addComponent(new Component('appearance', { type: 'asteroid', size }))
            .addComponent(new Component('collider', { radius: size === 'large' ? 40 : size === 'medium' ? 20 : 10 }))
            .addComponent(new Component('shape', shape)); // Add shape component
}

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
