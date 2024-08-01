// // localStorage.js
// import { database } from './firebase';

// export const getDataFromDatabase = async (key) => {
//   try {
//     const snapshot = await database.ref(key).once('value');
//     return snapshot.val();
//   } catch (error) {
//     console.error('Error loading data from Firebase:', error);
//     return null;
//   }
// };

// export const saveDataToDatabase = (key, data) => {
//   try {
//     database.ref(key).set(data);
//   } catch (error) {
//     console.error('Error saving data to Firebase:', error);
//   }
// };

// localStorage.js
import { get, ref, set } from 'firebase/database';
import { database } from './firebase';

export const getDataFromDatabase = async (key) => {
  try {
    const snapshot = await get(ref(database, key));
    return snapshot.val();
  } catch (error) {
    console.error('Error loading data from Firebase:', error);
    return null;
  }
};

export const saveDataToDatabase = (key, data) => {
  try {
    set(ref(database, key), data);
  } catch (error) {
    console.error('Error saving data to Firebase:', error);
  }
};

