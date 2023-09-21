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
import { SITE_NAME, FIREBASE_API, CONTACT_US_FORM } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
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
          'info.marketing@kojak-group.com',
          'queries@kojak-group.com',
          'customercare@kojak-group.com',
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
  // add new Career Post
  const addNewCareerPost = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/${SITE_NAME}/career/`));

    setDoc(newDocRef, {
      ...payload,
      // --------------------------------------
      id: newDocRef.id,
      isActive: true,
      // --------------------------------------
      contactEmail: 'info@kojak-group.com',
      jobID: 'CS-2023-1',
      createdAt: '2023-09-16T00:00:00Z',
      jobTitle: 'Customer Support Specialist',
      department: 'Customer Service',
      group: 'Kojak Group',
      location: 'Sharjah - Industrial Area 4',
      jobType: 'Full-Time',
      experienceYears: 1,
      jobDescription:
        'Join our Customer Service team and help us provide exceptional support to our customers. You will be the first point of contact for inquiries and support requests.',
      keyResponsibilities: [
        'Respond to customer inquiries via phone and email',
        'Resolve customer issues and complaints',
        'Provide product information and assistance',
        'Maintain accurate customer records',
      ],
      jobSkills: [
        'Excellent communication skills',
        'Problem-solving',
        'Customer service orientation',
        'Attention to detail',
        'Multitasking',
      ],
      niceToHave: [
        'Experience in a call center environment',
        'Knowledge of CRM software',
        'Fluency in multiple languages',
      ],
      benefits: ['Air-Ticket', 'Healthcare', 'Training and development opportunities'],
      workingHours: 'Rotating shifts, including weekends',
      languages: ['English', 'Arabic'],
      salary: 18000,

      expiryDate: Timestamp.fromDate(new Date()),
    });
    return newDocRef.id;
  }, []);

  // GET Careers List
  const getCareersList = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'career'), where('isActive', '==', true));
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const getJobPostDetails = useCallback(async (jobID) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/career/${jobID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
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

  // ------------------ | Get Featured Property | ------------------
  const fsGetFeaturedProperty = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'spaces'), where('isFeatured', '==', true));
    const querySnapshot = await getDocs(docRef);
    const dataArr = [];
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr[0];
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetImgDownloadUrl = useCallback(
    async (location, folderID, imgID, resolution = '1920x1080') => {
      console.log('download url');
      let url = '';
      try {
        url = await getDownloadURL(
          ref(STORAGE, `gs://${location}/${folderID}/${imgID}_${resolution}.webp`)
        );
      } catch (error) {
        url = undefined;
      }

      return url;
    },
    []
  );

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
      addNewCareerPost,
      getJobPostDetails,
      getCareersList,
      getCars,
      getFeaturedCars,
      fsGetFeaturedProperty,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      getVehicleInfo,
    }),
    [
      addNewForm,
      addNewCareerPost,
      getJobPostDetails,
      getCareersList,
      getCars,
      getFeaturedCars,
      fsGetFeaturedProperty,
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
