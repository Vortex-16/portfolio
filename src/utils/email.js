// Backend Email API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends an email using the secure backend API
 * @param {Object} emailData - The email data
 * @param {string} emailData.name - Sender's name
 * @param {string} emailData.email - Sender's email
 * @param {string} emailData.message - Message content
 * @returns {Promise} - Promise with response data
 */
export const sendEmail = async (emailData) => {
  try {
    console.log('Sending email to:', `${API_BASE_URL}/api/send-email`);
    console.log('Email data:', { ...emailData, message: emailData.message?.substring(0, 50) + '...' });

    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log('Server response:', result);

    if (!response.ok) {
      throw new Error(result.message || `Server error: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    
    // More user-friendly error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please check if the backend is running.');
    }
    
    throw new Error(error.message || 'Failed to send email. Please try again.');
  }
};

/**
 * Validates email data before sending
 * @param {Object} emailData - The email data to validate
 * @returns {Object} - Validation result with errors if any
 */
export const validateEmailData = (emailData) => {
  const errors = {};

  if (!emailData.name || emailData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!emailData.email || !/\S+@\S+\.\S+/.test(emailData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!emailData.message || emailData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  if (emailData.message && emailData.message.length > 1000) {
    errors.message = 'Message cannot exceed 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
