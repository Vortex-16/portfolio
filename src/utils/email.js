// EmailJS Configuration
import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_newPP',     
  TEMPLATE_ID: 'template_66tvei5',   
  PUBLIC_KEY: 'jS_OjCoYjCk6NEZxd',   
};

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

/**
 * Email template interface for TypeScript-like documentation
 * @typedef {Object} EmailTemplate
 * @property {string} from_name - Sender's name
 * @property {string} from_email - Sender's email
 * @property {string} subject - Email subject
 * @property {string} message - Message content
 * @property {string} to_name - Recipient's name
 * @property {string} reply_to - Reply-to email address
 */

/**
 * Sends an email using EmailJS
 * @param {Object} templateParams - The template parameters
 * @param {string} templateParams.from_name - Sender's name
 * @param {string} templateParams.from_email - Sender's email
 * @param {string} templateParams.message - Message content
 * @returns {Promise} - Promise from emailjs.send
 */
export const sendEmail = (templateParams) => {
  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    {
      ...templateParams,
      to_name: 'Vikash Gupta',
      subject: 'Portfolio Contact Form Submission',
      reply_to: templateParams.from_email
    }
  );
};

/**
 * Default template values that will be merged with form data
 * @type {Partial<EmailTemplate>}
 */
export const DEFAULT_TEMPLATE = {
  to_name: 'Vikash Gupta',
  subject: 'Portfolio Contact Form Submission',
};
