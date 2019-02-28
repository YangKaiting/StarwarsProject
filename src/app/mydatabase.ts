import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    starwars: `id, comments`
});

export default db;