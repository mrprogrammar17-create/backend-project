PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL,
  sqft INTEGER NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO properties (image, title, location, price, beds, baths, sqft, type) VALUES
  ('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', 'The Glass Pavilion', 'Beverly Hills, CA', '12,500,000', 6, 8, 7500, 'Villas'),
  ('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', 'Oceanfront Sanctuary', 'Malibu, Florida', '8,200,000', 4, 5, 4200, 'Villas'),
  ('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 'Zen Modernist Estate', 'Kyoto, Japan', '15,000,000', 5, 6, 6800, 'Villas'),
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 'Alpine Crystal Lodge', 'Aspen, CO', '18,900,000', 7, 9, 9200, 'Mansions'),
  ('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', 'Urban Penthouse Oasis', 'Upper East Side, NY', '22,000,000', 5, 5, 5500, 'Apartments'),
  ('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800', 'Skyline Majesty', 'Singapore', '14,500,000', 4, 4, 3800, 'Apartments');
