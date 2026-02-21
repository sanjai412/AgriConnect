const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.register = async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Get role_id
        const roleRes = await pool.query('SELECT id FROM roles WHERE name = $1', [role || 'farmer']);
        const roleId = roleRes.rows[0].id;

        const result = await pool.query(
            'INSERT INTO users (name, email, phone, password_hash, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role_id',
            [name, email, phone, passwordHash, roleId]
        );

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, role: role || 'farmer' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, phone, password } = req.body;

    try {
        const query = email ? 'SELECT u.*, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1' : 'SELECT u.*, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.phone = $1';
        const result = await pool.query(query, [email || phone]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, language: user.preferred_language }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
