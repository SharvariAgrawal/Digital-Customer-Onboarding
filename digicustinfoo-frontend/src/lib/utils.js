/**
 * Combines class names
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  /**
   * Generates a random 6-digit OTP
   */
  export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  /**
   * Formats time in mm:ss format
   */
  export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  /**
   * Generates a reference number
   */
  export function generateReferenceNumber() {
    const prefix = 'REF';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }