// utils/auth.js
import {jwtDecode} from "jwt-decode";

/**
 * Checks if a JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return exp < now;
  } catch (error) {
    return true; // Treat token as expired if any error occurs
  }
};
