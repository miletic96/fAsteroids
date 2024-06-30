function createBullet(position, velocity, angle) {
    return new Entity()
        .addComponent(new Component('position', { ...position }))
        .addComponent(new Component('velocity', { ...velocity }))
        .addComponent(new Component('rotation', { angle }))
        .addComponent(new Component('appearance', { type: 'bullet' }))
        .addComponent(new Component('collider', { radius: 5 })) 
        .addComponent(new Component('inactive', { value: false }));
}