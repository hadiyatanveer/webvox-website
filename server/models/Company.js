const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    industry: { type: String, required: true },
    companySize: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    createdAt: { type: Date, default: Date.now },
    logo: { type: String, default: '' },
});

module.exports = mongoose.model('Company', CompanySchema);