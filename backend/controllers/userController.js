const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.getProfile = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT u.id, u.name, u.email, u.phone, u.points, u.badge, u.preferred_language, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
            [req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT name, points, badge FROM users WHERE points > 0 ORDER BY points DESC LIMIT 10'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
