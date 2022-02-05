const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Dan', age: 25 },
        zookeepers
    );

    expect(zookeeper.name).toBe('Dan');
    expect(zookeeper.age).toBe(25);
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Dan',
            age: 25,
            favoriteAnimal: 'Ferret'
        },
        {
            id: '4',
            name: 'Seb',
            age: 40,
            favoriteAnimal: 'Fish'
        }
    ];

    const updatedZookeepers = filterByQuery({ age: 40 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Dan',
            age: '25',
            favoriteAnimal: 'Ferret'
        },
        {
            id: '4',
            name: 'Seb',
            age: '40',
            favoriteAnimal: 'Fish'
        }
    ];

    const result = findById('4', startingZookeepers);

    expect(result.age).toBe('40');
});

test('validates new zookeepers', () => {
    const zookeeper = {
        name: 'Seb',
        age: 40,
        favoriteAnimal: 'Fish'
    }
    const invalidZookeeper = {
        name: 'Dan',
        favoriteAnimal: 'Ferret'
    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});
