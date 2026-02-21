const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.createResponse = async (req, res) => {
    const { query_id, text_content } = req.body;
    const expert_id = req.user.id;

    try {
        // Insert response
        const result = await pool.query(
            'INSERT INTO responses (query_id, expert_id, text_content) VALUES ($1, $2, $3) RETURNING *',
            [query_id, expert_id, text_content]
        );

        // Update query status to answered
        await pool.query('UPDATE queries SET status = $1 WHERE id = $2', ['answered', query_id]);

        // Give points to expert
        const pointsToAdd = 10;
        await pool.query('UPDATE users SET points = points + $1 WHERE id = $2', [pointsToAdd, expert_id]);
        await pool.query('INSERT INTO rewards (user_id, points, reason) VALUES ($1, $2, $3)', [expert_id, pointsToAdd, 'Answered a farmer query']);

        // Check for badge upgrade
        const userRes = await pool.query('SELECT points FROM users WHERE id = $1', [expert_id]);
        const currentPoints = userRes.rows[0].points;
        let badge = 'Novice';
        if (currentPoints >= 100) badge = 'Expert';
        if (currentPoints >= 500) badge = 'Master';

        await pool.query('UPDATE users SET badge = $1 WHERE id = $2', [badge, expert_id]);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
