import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ repo, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    Ids: []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemIds = repo.map(item => item.id);
    
    setFormData(prevState => ({
      ...prevState,
      Ids: itemIds
    }));
    
    localStorage.setItem('contactInfo', JSON.stringify({
      ...formData,
      Ids: itemIds 
    }));
    
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="institute-list">
          <h2>Thank you for expressing interest in the following courses. Please send us your details to proceed.</h2>
          <ul>
            {Array.isArray(repo) ? (
              repo.map((item, index) => (
                <li key={item.id}>
                  {item.name} In   {item.institute} at {item.location}
                </li>
              ))
            ) : (
              <li>No institutes found</li>
            )}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
       
      </div>
    </div>
  );
};
export default Popup;
