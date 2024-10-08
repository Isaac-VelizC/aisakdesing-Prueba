import { db } from './../firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import frameworksData from "src/data/frameworks.json";
import languajesData from "src/data/languajes.json";

export const initializeFrameworks = async (): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, 'frameworks'));

  if (querySnapshot.empty) {
    const batch = writeBatch(db); // Usa writeBatch correctamente

    frameworksData.forEach((framework) => {
      const docRef = doc(collection(db, 'frameworks')); // Genera una referencia de documento
      batch.set(docRef, framework); // Añade al batch
    });

    await batch.commit(); // Aplica todas las operaciones en un solo batch
    console.log('Frameworks data inserted');
  } else {
    console.log('Frameworks data already exists');
  }
};

export const initializeLanguajes = async (): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, 'languajes'));

  if (querySnapshot.empty) {
    const batch = writeBatch(db); // Usa writeBatch correctamente

    languajesData.forEach((languaje) => {
      const docRef = doc(collection(db, 'languajes')); // Genera una referencia de documento
      batch.set(docRef, languaje); // Añade al batch
    });

    await batch.commit(); // Aplica todas las operaciones en un solo batch
    console.log('Languajes data inserted');
  } else {
    console.log('Languajes data already exists');
  }
};