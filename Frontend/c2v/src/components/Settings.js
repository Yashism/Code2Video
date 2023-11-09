import React, { useState } from 'react';
import '../Settings.css'; // Import the CSS file

function UserSettings() {
  const [email, setEmail] = useState('johndoe@example.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openaiKey, setOpenAIKey] = useState(''); // State for the OpenAI API key

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOpenAIKeyChange = (e) => {
    setOpenAIKey(e.target.value);
  };

  const saveSettings = () => {
    // save the settings to backend or perform other actions here
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    console.log('OpenAI API Key:', openaiKey); // Log the OpenAI API key
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
      <div className="input-group">
        <label>OpenAI API Key:</label>
        <input type="text" value={openaiKey} onChange={handleOpenAIKeyChange} />
      </div>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default UserSettings;
