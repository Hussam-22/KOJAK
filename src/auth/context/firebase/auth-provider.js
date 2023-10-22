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
      model: 'G 400 D',
      price: '690,000 AED',
      year: 2023,
      exteriorColor: '#000000',
      interiorColor: '#D64343',
      engineType: 'Petrol',
      milage: 0,
      isActive: true,
      isFeatured: true,
      creationDate: new Date(),
      features: `20” AMG Light alloy wheel painted black%
      360° camera All round viewing system%
      PARKTRONIC Park Assist%
      Electric sunroof, glass version%
      Anti-theft protection package plus%
      Burmester 3D surround sound system%
      Ambient lighting showcased%
      AMG LINE%
      9G Tronic Automatic Transmission%
      Active Distance Assist DISTRONIC%
      Night package%
      Energizing comfort control%`,
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
