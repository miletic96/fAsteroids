function Entity() {
    Entity.prototype._count++;
    this.id = Entity.prototype._count;
    this.components = {};
    this.addComponent = function (component) {
        this.components[component.name] = component;
        return this;
    };
    this.removeComponent = function (component) {
        delete this.components[component.name];
        return this;
    };
}

(function init() {
    Entity.prototype._count = 0;
})();
