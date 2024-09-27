const User = require('../models/user');

// Get all users (admin function)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user (admin function)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
};
