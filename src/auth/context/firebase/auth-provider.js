import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
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
    const appointmentDate = new Date(payload.appointmentDate).toLocaleDateString();
    setDoc(newDocRef, {
      ...payload,
      website: 'auto-maintenance',
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to:
        payload.source === 'newsletter'
          ? []
          : [
              'hussam@hotmail.co.uk',
              'cashierworkshop@kojak-group.com',
              'info.kgmarketing@gmail.com',
              'querieskam@kojak-group.com',
            ],
      message: {
        subject: 'New Form Was Submitted',
        html: `
        <p>Source: ${payload.source}</p>
        <p>Email: ${payload.email}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Car Class: ${payload.class}</p>
        <p>Year: ${payload.year}</p>
        <p>Service Required: ${payload?.service?.join(', ') || ''}</p>
        <p>Appointment Date: ${appointmentDate}</p>
        <p>Inquiry: ${payload.messageText}</p>
        <p>---------------------------</p>
        <p>${dateTime.toLocaleString()}</p>
        <p>${newDocRef.id}</p>
        `,
      },
    });
    return newDocRef.id;
  }, []);

  // GET OFFERS
  const getCars = useCallback(async () => {
    const docRef = query(
      collectionGroup(DB, 'cars'),
      where('isActive', '==', true),
      where('validTill', '<=', new Date())
    );
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const getFeaturedCars = useCallback(async () => {
    const docRef = query(
      collectionGroup(DB, 'cars'),
      where('isActive', '==', true),
      where('isFeatured', '==', true)
    );
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const addNewCar = useCallback(() => {
    const docRef = doc(collection(DB, `/websites/kexclusive/cars/`));
    setDoc(docRef, {
      id: docRef.id,
      brand: 'Mercedes',
      model: 'EQS 53 AMG 4MATIC',
      qty: 1,
      cover: 0,
      // bucketID: 'test-car-3',
      features: {
        description: 'Special Modified Germany Imported, Export Only',
        year: ['Year', 2023],
        price: ['Price', '860,000 AED'],
        hp: ['HP', 667],
        bodyType: ['Body Type', '4X4'],
        engineType: ['Engine Type', 'Electrical'],
        exteriorColor: ['Exterior Color', '#121212'],
        interiorColor: ['Interior Color', '#CE8833'],
        transmission: ['Transmission', 'Automatic'],
        camera: ['Camera', '360 Camera'],
        wheelSize: ['Wheel Size', '20"'],
        soundSystem: ['Sound System', 'Burmester® surround sound system'],
        light: ['Lights', 'Digital LED'],
        sunroof: ['Sunroof', 'Electric sunroof, glass version'],
        axle: ['axle Steering', 'Rear'],
      },
      thumbnail: [2, 3, 4],
      isActive: false,
      isFeatured: true,
    });
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetImgDownloadUrl = useCallback(async (folderID, imgID) => {
    const url = await getDownloadURL(
      ref(STORAGE, `gs://kojak-exclusive/${folderID}/${imgID}_1920x1080.webp`)
    );
    return url;
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      getCars,
      getFeaturedCars,
      addNewCar,
      fsGetImgDownloadUrl,
    }),
    [addNewForm, getCars, getFeaturedCars, addNewCar, fsGetImgDownloadUrl]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
