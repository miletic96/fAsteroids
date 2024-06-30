let lastAsteroidTime = 0;
let nextAsteroidTime =  Math.random() * 0.5 ; // Initial random time 

function asteroidSpawningSystem(entities, canvas, deltaTime) {
    const asteroidSizes = ['large', 'medium', 'small'];
    const asteroidSpeed = { large: 1, medium: 2, small: 3 };

    function spawnAsteroid(size) {
        const edge = Math.floor(Math.random() * 4); // 0: left, 1: right, 2: top, 3: bottom
        let position = { x: 0, y: 0 };
        let angle = 0;

        switch (edge) {
            case 0: // left
                position = { x: -50, y: Math.random() * canvas.height };
                angle = Math.random() * 180 - 90; // Random angle between -90 and 90
                break;
            case 1: // right
                position = { x: canvas.width + 50, y: Math.random() * canvas.height };
                angle = Math.random() * 180 + 90; // Random angle between 90 and 270
                break;
            case 2: // top
                position = { x: Math.random() * canvas.width, y: -50 };
                angle = Math.random() * 180 + 180; // Random angle between 180 and 360
                break;
            case 3: // bottom
                position = { x: Math.random() * canvas.width, y: canvas.height + 50 };
                angle = Math.random() * 180; // Random angle between 0 and 180
                break;
        }

        const velocity = {
            x: Math.cos(angle * Math.PI / 180) * asteroidSpeed[size],
            y: Math.sin(angle * Math.PI / 180) * asteroidSpeed[size]
        };
        let asteroid = createAsteroid(size, position, velocity, angle);
        return asteroid;
    }

    lastAsteroidTime += deltaTime;

    if (lastAsteroidTime > nextAsteroidTime) {
        const size = asteroidSizes[Math.floor(Math.random() * asteroidSizes.length)];
        entities.push(spawnAsteroid(size));
        lastAsteroidTime = 0;
        nextAsteroidTime = Math.random() * 0.5 ; // Random time 
    }

    return entities;
}
