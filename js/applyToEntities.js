function applyToEntities(entities, updateFn) {
    return entities.map(entity => updateFn(entity));
}
