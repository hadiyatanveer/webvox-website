const Company = require('../models/Company');

exports.getProfile = async (req, res) => {
    try {
        // req.companyId comes from the auth middleware
        const company = await Company.findById(req.companyId).select('-password');
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { logo } = req.body;

        // Update the company profile with the new logo
        const updatedCompany = await Company.findByIdAndUpdate(
            req.companyId,
            { $set: { logo } },
            { new: true }
        ).select('-password');

        res.json({ message: 'Profile updated successfully', company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Server error updating profile' });
    }
};