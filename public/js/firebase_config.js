// Import Firebase from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYI4ZSwKTfk4L0uB1Izb9hgJ1ohndsbP4",
  authDomain: "ramphysiotherapy-32d22.firebaseapp.com",
  projectId: "ramphysiotherapy-32d22",
  storageBucket: "ramphysiotherapy-32d22.appspot.com",
  messagingSenderId: "819892260289",
  appId: "1:819892260289:web:d2043d75c4c1421e6ab340",
  measurementId: "G-XW0L7ZJVSV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function trackPageView() {
  logEvent(analytics, "page_view", {
    page_path: window.location.pathname,
  });
}

trackPageView();
