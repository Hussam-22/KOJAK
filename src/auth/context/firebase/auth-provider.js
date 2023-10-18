import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';

// config
import { SITE_NAME, FIREBASE_API, CONTACT_US_FORM } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/${SITE_NAME}/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();

    if (payload.source === CONTACT_US_FORM) {
      return setDoc(newDocRef, {
        ...payload,
        website: SITE_NAME,
        id: newDocRef.id,
        createdAt: Timestamp.fromDate(new Date()),
        to: [
          'hussam@hotmail.co.uk',
          'querieskex@kojak-group.com',
          'info.marketing@kojak-group.com',
        ],
        message: {
          subject: payload.subject,
          html: `
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
    }
    setDoc(newDocRef, {
      ...payload,
      website: SITE_NAME,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return newDocRef.id;
  }, []);

  // ----------------------------------------------------------------------------
  const getVehicleInfo = useCallback(async (vehicleID) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/vehicles/${vehicleID}`);
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
    const docRef = doc(collection(DB, `/websites/${SITE_NAME}/vehicles/`));
    setDoc(docRef, {
      id: docRef.id,
      brand: 'Mercedes',
      model: 'S 500 L',
      price: '000,000 AED',
      year: 2024,
      exteriorColor: '#FFFFFF',
      interiorColor: '#E4DEC3',
      engineType: 'Petrol',
      milage: 0,
      isActive: true,
      isFeatured: true,
      creationDate: new Date(),
      features: `AMG Kit% Interior lighting 64 colors% Panoramic sunroof% Front radar% Lane detection system% Blind spot system% Front electric seats% Electric rear seats% Cooling and heating in the front seats% Cooling and heating of the rear seats% 360 degree camera% 3D mapping system% Wireless mobile charger% Perfume system% Fingerprint entry% Fingerprint start% Suction doors% Rear curtains% Digital Light% Smart MBUX system with automatic simulation in Arabic and provides full control of the car through the (MERCEDES ME) application% Electric trunk% Touch screen control% Apple CarPlay% Touch screen% Smart mouse% Front and rear sensors% Diamond brown leather (camel)% Auto parking system% Separate control of the rear air conditioner% Wheels measuring 21% Welcome lights in the handles Doors% Large Projector% Rear iPad% Rear Screens% Rolling Rear Wheels%`,
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

  const fsUpdateDoc = useCallback(async () => {
    const docRef = doc(DB, `/websites/kexclusive/vehicles/TVFk1tQoM9LbAzo80gLQ`);
    const docSnap = await updateDoc(docRef, {
      features: `Climatised Front Seat
    Automatic panoramic sliding sunroof
    360° camera
    KEYLESS-GO
    Sun protection package
    Rear seat climate control
    Air conditioning rear
    AMG Line
    Driver assistant package plus`,
    });
    return docSnap.data();
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
      fsUpdateDoc,
    }),
    [
      addNewForm,
      getCars,
      getFeaturedCars,
      addNewCar,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
      fsUpdateDoc,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
