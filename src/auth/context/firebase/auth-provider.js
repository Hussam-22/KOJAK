import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  query,
  where,
  getDoc,
  setDoc,
  getDocs,
  Timestamp,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';

// config
import { FIREBASE_API } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/kexclusive/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      website: 'kexclusive',
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to:
        payload.source === 'newsletter'
          ? []
          : ['hussam@hotmail.co.uk', 'info.kgmarketing@gmail.com'],
      message: {
        subject: payload.subject,
        html: `
        <p>Source: ${payload.source}</p>
        <p>Email: ${payload.email}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Inquiry: ${payload.messageText}</p>
        <p>---------------------------</p>
        <p>${dateTime.toLocaleString()}</p>
        <p>${newDocRef.id}</p>
        `,
      },
    });
    return newDocRef.id;
  }, []);

  // ----------------------------------------------------------------------------
  const getVehicleInfo = useCallback(async (vehicleID) => {
    const docRef = doc(DB, `/websites/kexclusive/vehicles/${vehicleID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // GET Cars List
  const getCars = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'vehicles'), where('isActive', '==', true));
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const getFeaturedCars = useCallback(async () => {
    const docRef = query(
      collectionGroup(DB, 'vehicles'),
      where('isActive', '==', true),
      where('isFeatured', '==', true)
    );
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const addNewCar = useCallback(() => {
    const docRef = doc(collection(DB, `/websites/kexclusive/vehicles/`));
    setDoc(docRef, {
      id: docRef.id,
      brand: 'Mercedes',
      model: 'S 500 LONG (Used)',
      qty: 1,
      price: '515,000 AED',
      description: 'Export price outside GCC countries - Price Without VAT & Without Customs Duty',
      year: 2022,
      exteriorColor: '#000000',
      interiorColor: '#D68C45',
      engineType: 'Electric Hybrid fue',
      milage: 14500,
      isActive: true,
      isFeatured: false,
      creationDate: new Date(),
      features: `
      Climatised Front Seat		
Automatic panoramic sliding sunroof		
360° camera		
KEYLESS-GO		
Sun protection package		
Rear seat climate control		
Air conditioning rear		
AMG Line		
Driver assistant package plus		
`,
    });
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetImgDownloadUrl = useCallback(async (folderID, imgID, thumbnail = false) => {
    let url = '';
    try {
      url = await getDownloadURL(
        ref(
          STORAGE,
          `gs://kojak-exclusive/${folderID}/${imgID}_${thumbnail ? '200x200' : '1920x1080'}.webp`
        )
      );
    } catch (error) {
      url = undefined;
    }

    return url;
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetFolderImages = useCallback(async (folderID) => {
    const listRef = ref(STORAGE, `gs://kojak-exclusive/${folderID}`);
    const imagesList = await listAll(listRef);
    const imagesUrl = await Promise.all(
      imagesList.items.map(async (imageRef) => getDownloadURL(ref(STORAGE, imageRef)))
    );
    const thumbnail = imagesUrl.filter((url) => url.includes('200x200'));
    const largeImage = imagesUrl.filter((url) => url.includes('1920x1080'));
    return [thumbnail, largeImage];
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      getCars,
      getFeaturedCars,
      addNewCar,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
    }),
    [
      addNewForm,
      getCars,
      getFeaturedCars,
      addNewCar,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
