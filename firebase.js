<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDyufoDnE13HgQbwiTE22dFOrNIK-ILY0Y",
    authDomain: "smartclassorg-1ade4.firebaseapp.com",
    projectId: "smartclassorg-1ade4",
    storageBucket: "smartclassorg-1ade4.firebasestorage.app",
    messagingSenderId: "80655773732",
    appId: "1:80655773732:web:94ede3663134b5b71da8b1",
    measurementId: "G-59VZ5G4FJ0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>