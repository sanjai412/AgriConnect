const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function setup() {
    const client = await pool.connect();
    try {
        console.log('Setting up database...');

        await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
          id SERIAL PRIMARY KEY,
          name VARCHAR(20) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE,
          phone VARCHAR(20) UNIQUE,
          password_hash TEXT NOT NULL,
          role_id INTEGER REFERENCES roles(id),
          preferred_language VARCHAR(10) DEFAULT 'en',
          points INTEGER DEFAULT 0,
          badge VARCHAR(50) DEFAULT 'Novice',
          is_verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS queries (
          id SERIAL PRIMARY KEY,
          farmer_id INTEGER REFERENCES users(id),
          title VARCHAR(200) NOT NULL,
          description TEXT,
          voice_url TEXT,
          image_url TEXT,
          crop_type VARCHAR(100),
          issue_type VARCHAR(100),
          location VARCHAR(100),
          language VARCHAR(10) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS responses (
          id SERIAL PRIMARY KEY,
          query_id INTEGER REFERENCES queries(id),
          expert_id INTEGER REFERENCES users(id),
          text_content TEXT,
          voice_url TEXT,
          image_url TEXT,
          is_helpful BOOLEAN DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS rewards (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          points INTEGER NOT NULL,
          reason TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS learning_resources (
          id SERIAL PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          content TEXT,
          video_url TEXT,
          category VARCHAR(50),
          language VARCHAR(10),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notifications (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          message TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          link TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO roles (name) VALUES ('farmer'), ('student'), ('expert'), ('admin')
      ON CONFLICT (name) DO NOTHING;

      INSERT INTO learning_resources (title, content, category) VALUES
      ('Organic Pest Control', 'Detailed guide on using neem oil and organic sprays.', 'Tips'),
      ('Sustainable Irrigation', 'How to set up drip irrigation for vegetable farms.', 'Tutorial'),
      ('Soil Health 101', 'Understanding pH and NPK levels in your soil.', 'Tutorial')
      ON CONFLICT DO NOTHING;
    `);

        console.log('Database setup complete.');
    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        client.release();
        pool.end();
    }
}

setup();
