const path = require('path');
const fs = require('fs');
const isLocal = process.env.ENV_NAME === 'local';

const dataBaseDir = isLocal ? path.join(process.cwd(), './data') : '/etc/data';
const dataBasePath = path.join(dataBaseDir, 'items.json');

console.log('isLocal', { isLocal, dataBaseDir, dataBasePath });

if (!fs.existsSync(dataBaseDir)) {
    console.log('Creating data base dataBaseDir', dataBasePath);
    fs.mkdirSync(dataBaseDir, { recursive: true });
}

if (!fs.existsSync(dataBasePath)) {
    console.log('Creating data base dataBasePath file', dataBasePath);
    fs.writeFileSync(dataBasePath, '[]');
}

const getItems = async () => {
    try {
        return require(dataBasePath);
    } catch (e) {
        return [];
    }
};

const storeItem = async item => {
    try {
        const items = await getItems();

        items.push(item);
        console.log('storeItem 1', items, dataBasePath);

        fs.writeFileSync(dataBasePath, JSON.stringify(items));

        const items2 = await getItems();
        console.log('storeItem items2', items2);
    } catch (e) {
        return [];
    }
};

const updateItem = async (id, item) => {
    try {
        const items = await getItems();
        const index = items.findIndex(i => i.id === id);
        items[index] = item;
        fs.writeFileSync(dataBasePath, JSON.stringify(items));
    } catch (e) {
        return [];
    }
};

const removeItem = async id => {
    try {
        const items = await getItems();

        const index = items.findIndex(i => i.id === id);
        items.splice(index, 1);
        fs.writeFileSync(dataBasePath, JSON.stringify(items));
    } catch (e) {
        return [];
    }
};

module.exports = {
    storeItem,
    getItems,
    updateItem,
    removeItem,
};
