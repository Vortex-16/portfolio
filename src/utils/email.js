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
    // Construct API URL properly to avoid double slashes
    const baseUrl = import.meta.env.VITE_API_URL;
    let apiUrl;
    
    if (baseUrl) {
      // Remove trailing slash from baseUrl and ensure proper construction
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');
      apiUrl = `${cleanBaseUrl}/api/send-email`;
    } else if (import.meta.env.MODE === 'production') {
      // In production without VITE_API_URL, use relative path
      apiUrl = '/api/send-email';
    } else {
      // Development
      apiUrl = 'http://localhost:5000/api/send-email';
    }
    
    console.log('Sending email to:', apiUrl);
    console.log('Email data:', { ...emailData, message: emailData.message?.substring(0, 50) + '...' });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log('Server response:', result);
    
    // Log additional debugging info
    if (!response.ok) {
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        result
      });
      
      // Log the debug information if available
      if (result.debug) {
        console.error('Server Debug Info:', result.debug);
      }
    }

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
