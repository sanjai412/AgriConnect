const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.createQuery = async (req, res) => {
    const { title, description, crop_type, issue_type, location, language } = req.body;
    const farmer_id = req.user.id;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    // Voice upload would be handled similarly if using a voice field

    try {
        const result = await pool.query(
            'INSERT INTO queries (farmer_id, title, description, crop_type, issue_type, location, language, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [farmer_id, title, description, crop_type, issue_type, location, language, image_url]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getQueries = async (req, res) => {
    const { role, id } = req.user;
    const { crop, type, location } = req.query;

    try {
        let queryStr = 'SELECT q.*, u.name as farmer_name FROM queries q JOIN users u ON q.farmer_id = u.id';
        let params = [];

        if (role === 'farmer') {
            queryStr += ' WHERE q.farmer_id = $1';
            params.push(id);
        } else {
            // Expert/Student can filter
            let filters = [];
            if (crop) { filters.push(`q.crop_type = $${params.length + 1}`); params.push(crop); }
            if (type) { filters.push(`q.issue_type = $${params.length + 1}`); params.push(type); }
            if (location) { filters.push(`q.location = $${params.length + 1}`); params.push(location); }

            if (filters.length > 0) {
                queryStr += ' WHERE ' + filters.join(' AND ');
            }
        }

        queryStr += ' ORDER BY q.created_at DESC';
        const result = await pool.query(queryStr, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getQueryById = async (req, res) => {
    const { id } = req.params;
    try {
        const queryRes = await pool.query('SELECT q.*, u.name as farmer_name FROM queries q JOIN users u ON q.farmer_id = u.id WHERE q.id = $1', [id]);
        const responsesRes = await pool.query('SELECT r.*, u.name as expert_name, u.badge FROM responses r JOIN users u ON r.expert_id = u.id WHERE r.query_id = $1 ORDER BY r.created_at ASC', [id]);

        if (queryRes.rows.length === 0) return res.status(404).json({ message: 'Query not found' });

        res.json({
            ...queryRes.rows[0],
            responses: responsesRes.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
