import {slots} from "../store/restaurants";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Adjust the import path as necessary
const restaurantsData = slots;
 
const uploadData = async () => {
    try {
        for (let i = 0;i < restaurantsData.length; i++) {
            const restaurant = restaurantsData[i];
            const docRef = doc(collection(db, "slots"), `slots_${i + 1}`); 
            await setDoc(docRef, restaurant);
        }
        console.log(`Restaurant data uploaded successfully`);
        }catch (error) {
        console.error("Error uploading data: ", error);
    }
}
export default uploadData;