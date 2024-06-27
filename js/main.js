let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let entities = [];
let systems = [];

// Initialize entities (player, asteroids, bullets)
let player = new Entity()
    .addComponent(new Component('position', { x: 400, y: 300 }))
    .addComponent(new Component('velocity', { x: 0, y: 0 }))
    .addComponent(new Component('appearance', { type: 'ship' }))
    .addComponent(new Component('control', {}))
    .addComponent(new Component('collider', { radius: 20 }));

entities.push(player);