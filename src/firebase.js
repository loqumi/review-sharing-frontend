import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi-JB431U1J5m77n-L909T1ID9_ds01Ao",
  authDomain: "cloud-storage-3201c.firebaseapp.com",
  projectId: "cloud-storage-3201c",
  storageBucket: "cloud-storage-3201c.appspot.com",
  messagingSenderId: "42992507017",
  appId: "1:42992507017:web:d420808fe72773b5cfce58",
  measurementId: "G-SKWGPB561K",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
