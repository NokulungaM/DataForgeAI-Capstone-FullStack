const User = require('../models/user');
const multer = require("multer");
const path = require("path");

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
      console.log('User ID from request:', req.user.id);  // Log the user ID
      const user = await User.findById(req.user.id);  // Ensure this matches the user ID from the token
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user profile:', error);  // Log the error
      res.status(500).json({ error: "Server error" });
  }
};


// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profilePictures/'); // Destination folder for profile pictures
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Update User Profile (with file upload handling)
exports.updateUserProfile = async (req, res) => {
  try {
    // Use Multer middleware to handle the file upload
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading profile picture:', err);
        return res.status(500).json({ error: 'Failed to upload profile picture' });
      }

      const updates = req.body;

      // If a file was uploaded, add the file path to the updates
      if (req.file) {
        updates.profilePicture = req.file.path; // Assuming you want to store the file path in the database
      }

      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
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
