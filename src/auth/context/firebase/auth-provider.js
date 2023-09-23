import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useCallback } from 'react';
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
import { SITE_NAME, FIREBASE_API, CONTACT_US_FORM, BOOK_APPOINTMENT_FORM } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/${SITE_NAME}/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();
    const appointmentDate = new Date(payload.appointmentDate).toLocaleDateString();

    if (payload.source === BOOK_APPOINTMENT_FORM) {
      return setDoc(newDocRef, {
        ...payload,
        website: SITE_NAME,
        id: newDocRef.id,
        createdAt: Timestamp.fromDate(new Date()),
        to: [
          'hussam@hotmail.co.uk',
          'info.marketing@kojak-group.com',
          'querieskam@kojak-group.com',
        ],
        message: {
          subject: payload.subject,
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
    }

    if (payload.source === CONTACT_US_FORM) {
      return setDoc(newDocRef, {
        ...payload,
        website: SITE_NAME,
        id: newDocRef.id,
        createdAt: Timestamp.fromDate(new Date()),
        to: [
          'hussam@hotmail.co.uk',
          'info.marketing@kojak-group.com',
          'querieskam@kojak-group.com',
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

  // GET OFFERS
  const getOffers = useCallback(async () => {
    const docRef = query(
      collectionGroup(DB, 'offers'),
      where('isActive', '==', true),
      where('validTill', '>=', new Date())
    );
    const querySnapshot = await getDocs(docRef);
    const documents = [];

    querySnapshot.forEach((document) => documents.push(document.data()));

    return documents;
  }, []);

  const addOffer = useCallback(() => {
    const docRef = doc(collection(DB, `/websites/${SITE_NAME}/offers/`));
    setDoc(docRef, {
      id: docRef.id,
      icon: 'ph:fan',
      validTill: new Date(),
      isActive: false,
      isFree: false,
      offerDetails: {
        service: 'Computer Diagnosis',
        description: 'Diagnosis your car computer for any errors and get full report',
        price: '100 AED',
      },
    });
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      getOffers,
      addOffer,
    }),
    [addNewForm, getOffers, addOffer]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
