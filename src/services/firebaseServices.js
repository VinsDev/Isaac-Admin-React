import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD0fGKAIUs_6hXggSyxDuXkK7l7wMNHVBE",
    authDomain: "door-lock-d75e2.firebaseapp.com",
    projectId: "door-lock-d75e2",
    storageBucket: "door-lock-d75e2.appspot.com",
    messagingSenderId: "813567863839",
    appId: "1:813567863839:web:05be5af134a348acbef92a",
    measurementId: "G-BZG4RPDH1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const getUsers = async () => {
    try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching users from Firestore:', error);
        throw error;
    }
};

export const editUser = async (userId, newData) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, newData, { merge: true });
    } catch (error) {
        console.error('Error editing user in Firestore:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
    } catch (error) {
        console.error('Error deleting user from Firestore:', error);
        throw error;
    }
};
