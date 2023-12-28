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

  // GET Careers List
  const getCareersList = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'jobs'), where('isActive', '==', true));
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const getJobPostDetails = useCallback(async (jobID) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/jobs/${jobID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      getJobPostDetails,
      getCareersList,
    }),
    [addNewForm, getJobPostDetails, getCareersList]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
