import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css'; // Reusing our nice card styles!

const Profile = () => {
    const { user, login } = useContext(AuthContext); // Use login to update context state
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/profile');
                setProfileData(res.data);
            } catch (error) {
                setMessage({ text: 'Failed to load profile data.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle Logo Upload (Convert to Base64)
    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Optional: Check file size (e.g., max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setMessage({ text: 'Image size must be less than 2MB', type: 'error' });
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            try {
                const res = await axios.put('http://localhost:5000/api/user/profile', { logo: base64Image });
                setProfileData(res.data.company);

                // Update global user state so Navbar updates instantly
                const token = localStorage.getItem('token');
                login(token, res.data.company);

                setMessage({ text: 'Logo updated successfully!', type: 'success' });
            } catch (error) {
                setMessage({ text: 'Failed to upload logo.', type: 'error' });
            } finally {
                setUploading(false);
            }
        };
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading profile...</div>;

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card" style={{ maxWidth: '600px' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-header">
                    <h2>Company Profile</h2>
                    <p>Manage your WebVox Bot account details</p>
                </div>

                {message.text && (
                    <div className="error-message" style={{ backgroundColor: message.type === 'success' ? '#F0FDF4' : '#FFF5F5', color: message.type === 'success' ? '#166534' : '#E53E3E', borderColor: message.type === 'success' ? '#BBF7D0' : '#FED7D7' }}>
                        {message.text}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div className="avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {profileData?.logo ? (
                            <img src={profileData.logo} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            profileData?.name?.charAt(0).toUpperCase()
                        )}
                    </div>

                    <label className="btn-secondary-lg" style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem', color: 'var(--color-deep-blue)', border: '1px solid var(--color-deep-blue)', borderRadius: '6px' }}>
                        {uploading ? 'Uploading...' : 'Upload New Logo'}
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} disabled={uploading} />
                    </label>
                </div>

                {profileData && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div className="form-group" style={{ marginBottom: '0' }}>
                            <label>Company Name</label>
                            <div className="form-control" style={{ backgroundColor: '#f3f4f6' }}>{profileData.name}</div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '0' }}>
                            <label>Work Email</label>
                            <div className="form-control" style={{ backgroundColor: '#f3f4f6' }}>{profileData.email}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1, marginBottom: '0' }}>
                                <label>Industry</label>
                                <div className="form-control" style={{ backgroundColor: '#f3f4f6' }}>{profileData.industry}</div>
                            </div>
                            <div className="form-group" style={{ flex: 1, marginBottom: '0' }}>
                                <label>Company Size</label>
                                <div className="form-control" style={{ backgroundColor: '#f3f4f6' }}>{profileData.companySize}</div>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '0' }}>
                            <label>Website URL</label>
                            <div className="form-control" style={{ backgroundColor: '#f3f4f6' }}>{profileData.website}</div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Profile;