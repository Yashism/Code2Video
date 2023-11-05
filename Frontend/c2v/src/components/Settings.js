import React, { useState } from 'react';
import '../Settings.css'; // Import the CSS file

function UserSettings() {
  const [email, setEmail] = useState('johndoe@example.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const saveSettings = () => {
    // You can save the settings to your backend or perform other actions here
    // For this example, we'll just log the updated settings
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <div className="input-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-group">
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      </div>
      <div className="input-group">
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default UserSettings;
