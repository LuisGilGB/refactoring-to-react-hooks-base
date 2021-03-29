export const mapResponseItems = mapCallback => (items = []) => items.map(mapCallback);

export const addLabelToItemBySerializing = (item = {}) => ({...item, label: JSON.stringify(item)});

export const addLabelToResponseItemsBySerializing = mapResponseItems(addLabelToItemBySerializing);