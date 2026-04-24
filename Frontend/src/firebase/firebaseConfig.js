// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCtUHNWLoon8Jnr9VBmAcAsOmI3f2rLsCg",
    authDomain: "imagenesbicentenario-1f800.firebaseapp.com",
    projectId: "imagenesbicentenario-1f800",
    storageBucket: "imagenesbicentenario-1f800.firebasestorage.app",
    messagingSenderId: "650393516072",
    appId: "1:650393516072:web:145b46addca2cddb351d1d",
    measurementId: "G-QQ3ZH0R0C2"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };
