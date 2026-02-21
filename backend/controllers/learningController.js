const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.getResources = async (req, res) => {
    const { category, language } = req.query;
    try {
        let query = 'SELECT * FROM learning_resources';
        let params = [];
        if (category) {
            query += ' WHERE category = $1';
            params.push(category);
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
