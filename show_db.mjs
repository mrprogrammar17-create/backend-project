import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('estate.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('DB open error:', err);
    process.exit(1);
  }
});

db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name", [], (err, tables) => {
  if (err) {
    console.error('Error listing tables:', err);
    process.exit(1);
  }
  console.log('TABLES:', JSON.stringify(tables, null, 2));
  const queries = [
    { name: 'properties', sql: 'SELECT * FROM properties LIMIT 20' },
    { name: 'users', sql: 'SELECT id, name, email FROM users LIMIT 20' },
    { name: 'inquiries', sql: 'SELECT * FROM inquiries LIMIT 20' }
  ];
  let idx = 0;
  const next = () => {
    if (idx >= queries.length) {
      db.close();
      return;
    }
    const q = queries[idx++];
    db.all(q.sql, [], (err2, rows) => {
      if (err2) {
        console.error(`Error querying ${q.name}:`, err2);
        process.exit(1);
      }
      console.log('---');
      console.log(q.name.toUpperCase(), JSON.stringify(rows, null, 2));
      next();
    });
  };
  next();
});
