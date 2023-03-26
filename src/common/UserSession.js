import { SHA256 } from 'crypto-js';

export default class UserSession {
  constructor(userId, userInfo) {
    this.userId = userId;
    this.userInfo = userInfo || ''; // additional user info by lambda event
  }

  generateSessionId() {
    const hashInput = `${Date.now()}${this.userId}${Math.floor(Math.random() * 100000)}`;
    const generatedId = SHA256(hashInput, { outputLength: 32 }).toString();
    return generatedId;
  }

  generateSessionInfo() {
    // Generate Session ID based on User ID
    const sessionId = this.generateSessionId();
    const currentTime = Date.now();

    // Item to store in the database
    const sessionInfo = {
      sessionId, // Primary Key
      userId: this.userId,
      sessionStartTimestamp: currentTime, // Time the sesion was created
      isActive: true, // Whether the session is Active
      expires:
      currentTime + 1000 * 60 * 60 * 24 * 14, // Set expiry date of session to 14 days from now
      userInfo: this.userInfo, // Store the additional user info provided
    };

    return sessionInfo;
  }
}
