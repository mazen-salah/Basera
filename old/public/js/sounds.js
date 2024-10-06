// sounds.js

export const soundEffects = {
    startRecognition: new Audio("audio/start.mp3"),
    success: new Audio("audio/success.mp3"),
    error: new Audio("audio/error.mp3"),
    policeCall: new Audio("audio/call.mp3"),
    alert: new Audio("audio/alert.mp3"),
  };
  
  export function playSound(sound) {
    soundEffects[sound]?.play();
  }
  