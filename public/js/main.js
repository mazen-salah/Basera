// main.js
import { fetchApiKey } from './api.js';
import { addEventListeners } from './events.js';

// Fetch API key and add event listeners on page load
window.onload = async function () {
  await fetchApiKey();
  addEventListeners();
};
