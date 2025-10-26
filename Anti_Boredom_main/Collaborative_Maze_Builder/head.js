import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, onSnapshot, collection, query, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Enable debug logging for Firestore
        setLogLevel('debug');

        // Global variables MUST be present in the Canvas environment.
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        // Note: When running locally, __firebase_config and __initial_auth_token will be undefined.
        const firebaseConfig = typeof __firebase_config !== 'undefined' && __firebase_config ? JSON.parse(__firebase_config) : null;
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null; 

        if (firebaseConfig) {
            window.firebaseApp = initializeApp(firebaseConfig);
            window.db = getFirestore(window.firebaseApp);
            window.auth = getAuth(window.firebaseApp);

            // Authentication Setup
            onAuthStateChanged(window.auth, async (user) => {
                let userId;
                if (user) {
                    userId = user.uid;
                } else {
                    // Sign in using the custom token or anonymously if the token is unavailable
                    try {
                        if (initialAuthToken) {
                            await signInWithCustomToken(window.auth, initialAuthToken);
                        } else {
                            await signInAnonymously(window.auth);
                        }
                        userId = window.auth.currentUser.uid;
                    } catch (error) {
                        console.error("Firebase Auth Error:", error);
                        userId = 'unauthenticated-user-' + Math.random().toString(36).substring(2, 9);
                    }
                }
                
                window.currentUserId = userId;
                
                // Once authenticated, start the main application logic
                window.initMazeApp(window.db, window.currentUserId, appId, doc, setDoc, onSnapshot, collection, query);
            });
        } else {
            console.warn("Firebase configuration not found. Running in local mode.");
            // Pass null for db instance to signal local mode
            window.initMazeApp(null, 'local-user', appId, doc, setDoc, onSnapshot, collection, query);
        }
