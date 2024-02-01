import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
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


export const getRegistrationRequests = async () => {
    try {
        const requestsCollection = collection(db, 'requests');
        const snapshot = await getDocs(requestsCollection);

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            const formattedDate = new Date(data.creationTime.seconds * 1000).toLocaleString();

            return { id: doc.id, ...data, creationTime: formattedDate };
        });
    } catch (error) {
        console.error('Error fetching registration requests from Firestore:', error);
        throw error;
    }
};

export const updateRequestStatus = async (requestId, newStatus) => {
    try {
        const requestDocRef = doc(db, 'requests', requestId);

        // Update status in Firestore
        await updateDoc(requestDocRef, { status: newStatus });

        console.log(`Request ${requestId} updated to ${newStatus}.`);
    } catch (error) {
        console.error('Error updating request status:', error);
        throw error;
    }
};

export const createUser = async (phoneNumber) => {
    try {
        // Check if the user with the given phone number already exists
        const existingUsers = await getUsers();
        const existingUser = existingUsers.find(user => user.phone === phoneNumber);

        if (!existingUser) {
            // User doesn't exist, create a new user
            const registrationDate = new Date().toLocaleString();

            await setDoc(doc(db, 'users', phoneNumber), {
                phone: phoneNumber,
                registration_date: registrationDate,
                id: generateUniqueId(),
                status: "active"
            });

            console.log(`User with phone number ${phoneNumber} created.`);
        } else {
            console.log(`User with phone number ${phoneNumber} already exists.`);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const changeUserStatus = async (phone, newStatus) => {
    try {
        const existingUsers = await getUsers();
        const existingUser = existingUsers.find(user => user.phone === phone);

        if (existingUser) {
            // User exists, update the status
            await updateDoc(doc(db, 'users', phone), {
                status: newStatus
            });

            console.log(`User with id ${phone} status updated to ${newStatus}.`);
        } else {
            console.log(`User with id ${phone} does not exist.`);
        }
    } catch (error) {
        console.error('Error changing user status:', error);
        throw error;
    }
};

const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
};

export const getAllOTPs = async () => {
    try {
        const otpsCollection = collection(db, 'otp');
        // const otpsQuery = query(otpsCollection);

        const snapshot = await getDocs(otpsCollection);
        const otps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return otps;
    } catch (error) {
        console.error('Error fetching OTPs from Firestore:', error);
        throw error;
    }
};