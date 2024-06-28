window.onload = function() {
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');
    let entities = [];
    let systems = [];

    // Initialize entities (player, asteroids, bullets)
    let player = new Entity()
        .addComponent(new Component('position', { x: 400, y: 300 }))
        .addComponent(new Component('velocity', { x: 0, y: 0 }))
        .addComponent(new Component('appearance', { type: 'ship' }))
        .addComponent(new Component('control', {})) // This uniquely identifies the player
        .addComponent(new Component('collider', { radius: 20 }))
        .addComponent(new Component('acceleration', { value: 0 })) // New acceleration component
        .addComponent(new Component('rotation', { angle: 0 })); // Initially facing upwards


    entities.push(player);

    // Add systems to the systems array
    systems.push((entities, currentTime) => asteroidSpawningSystem(entities, canvas, currentTime));
    systems.push((entities) => physicsSystem(entities, canvas));
    systems.push((entities) => renderingSystem(entities, ctx));
    systems.push(collisionSystem);
    systems.push(gameLogicSystem);
    systems.push(userInputSystem); // Ensure this is included


    // Game loop
    function gameLoop(currentTime) {
        for (let system of systems) {
            entities = system(entities, currentTime);
        }
    }
    setInterval(() => {
        gameLoop(performance.now())
    }, 1000/120);
}
