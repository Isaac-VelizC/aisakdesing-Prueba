import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "src/firebase";
import { Framework } from "src/interfaces/Frameworks";
import { LanguajeData } from "src/interfaces/Languajes";
import { ProjectDatas } from "src/interfaces/Project";

const collectionName = "projects";

// Leer frameworks

export const listFrameworks = async (): Promise<Framework[]> => {
  const frameworksRef = collection(db, "frameworks"); // Asegúrate de que "frameworks" sea la colección correcta
  const snapshot = await getDocs(frameworksRef);
  // Mapea los documentos a un arreglo de Framework
  const frameworks: Framework[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Framework, "id">), // Asegúrate de que los datos contengan logo, name y url
  }));

  return frameworks;
};

// Leer languajes
export const listLanguajes = async (): Promise<LanguajeData[]> => {
  const languajesRef = collection(db, "languajes");
  const snapshot = await getDocs(languajesRef);
  const languajes: LanguajeData[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<LanguajeData, "id">),
  }));

  return languajes;
};

export const createProject = async (data: ProjectDatas) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Project written with ID: ", docRef.id);
  } catch (error) {
    console.log("Error adding project: ", error);
  }
};

export const readDocuments = async (): Promise<ProjectDatas[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: ProjectDatas[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Incluye el ID del documento
      ...(doc.data() as Omit<ProjectDatas, "id">), // Combina los datos del documento
    }));
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return [];
  }
};

// Actualizar un documento
export const updateDocument = async (
  id: string,
  data: Partial<ProjectDatas>
) => {
  const docRef = doc(db, collectionName, id);
  try {
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Eliminar un documento
export const deleteDocument = async (id: string) => {
  const docRef = doc(db, collectionName, id);

  try {
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

//Subir Archivo a Firebase

/*import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `thumbnails/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};


export const createDocumentWithUpload = async (data: FormValues) => {
  try {
    if (data.thumbnail_url) {
      const fileUrl = await uploadFile(data.thumbnail_url);
      data.file_url = fileUrl; // Asigna la URL del archivo
    }
    await createDocument(data);
  } catch (e) {
    console.error("Error creating document with file upload: ", e);
  }
};

*/
