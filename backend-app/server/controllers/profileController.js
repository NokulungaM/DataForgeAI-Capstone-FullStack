const User = require('../models/user');

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = {
      username: user.username,
      email: user.email,
      nationality: user.nationality,
      dob: user.dob,
    };
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: "Server error" });
  }
};


// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get User Meal Plans
exports.getUserMealPlans = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('mealPlans');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.mealPlans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a Meal Plan
exports.deleteMealPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const mealPlanId = req.params.mealPlanId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the meal plan and remove it
    user.mealPlans = user.mealPlans.filter(plan => plan._id.toString() !== mealPlanId);

    await user.save();

    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meal plan' });
  }
};
