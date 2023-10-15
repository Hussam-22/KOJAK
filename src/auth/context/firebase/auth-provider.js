import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
  limit,
  setDoc,
  getDoc,
  startAt,
  getDocs,
  orderBy,
  Timestamp,
  collection,
  startAfter,
  writeBatch,
  getFirestore,
  collectionGroup,
  getCountFromServer,
} from 'firebase/firestore';

import { _partsData } from 'src/_mock/_partsData';
// config
import { CART_FORM, SITE_NAME, FIREBASE_API, CONTACT_US_FORM } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // ----------------------------------------------------------------------------
  const fsGetImgDownloadUrl = useCallback(async (imgID) => {
    let url = '';
    try {
      url = await getDownloadURL(ref(STORAGE, `gs://kojak-spare-parts/parts-images/${imgID}`));
    } catch (error) {
      url = undefined;
    }

    return url;
  }, []);
  // ----------------------------------------------------------------------------
  // ADD NEW FORM
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/${SITE_NAME}/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();

    if (payload.source === CART_FORM) {
      return setDoc(newDocRef, {
        ...payload,
        website: SITE_NAME,
        id: newDocRef.id,
        createdAt: Timestamp.fromDate(new Date()),
        to: ['hussam@hotmail.co.uk'],
        message: {
          subject: 'Spare-Parts Inquiry',
          html: `
      <p>Email: ${payload.email}</p>
      <p>Name: ${payload.fullName}</p>
      <p>Mobile: ${payload.mobile}</p>
      <p>Inquiry: ${payload.messageText}</p>
      <p>---------------------------</p>
      ${payload.parts}
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
        to: ['hussam@hotmail.co.uk'],
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
  const fsGetPartDetails = useCallback(
    async (partID) => {
      const docRef = doc(DB, `/websites/${SITE_NAME}/partsData/${partID}`);
      const docSnap = await getDoc(docRef);
      const imgUrl = await fsGetImgDownloadUrl(docSnap.data().imageName);
      return { ...docSnap.data(), imgUrl };
    },
    [fsGetImgDownloadUrl]
  );
  // ----------------------------------------------------------------------------

  const fsWriteBatchPartsData = useCallback(async () => {
    const batch = writeBatch(DB);
    const partsToAdd = _partsData.slice(1, 55);

    partsToAdd.forEach((element) => {
      const docRef = doc(collection(DB, `/websites/${SITE_NAME}/partsData`));
      batch.set(docRef, {
        ...element,
        docID: docRef.id,
        brandClass: ['A-Class', 'B-Class'],
        brandModel: ['W168', 'W177', 'W245'],
        category: 'Transmission',
        subCategory: 'Clutch Kit',
      });
    });

    await batch.commit();
  }, []);
  // ----------------------------------------------------------------------------
  const fsGetProductsDocumentsCount = useCallback(async (filter) => {
    let docRef = collectionGroup(DB, 'partsData');

    docRef = query(docRef, orderBy('partNumber', 'desc'));

    if (filter.partNo) {
      docRef = query(
        docRef,
        where('partNumber', '>=', filter.partNo),
        where('partNumber', '<', `${filter.partNo}\uf8ff`)
      );
    }

    if (filter.model && filter.model.length > 0) {
      docRef = query(docRef, where('brandModel', 'array-contains', filter.model));
    }

    const snapshot = await getCountFromServer(docRef);

    return snapshot.data().count;
  }, []);
  // ----------------------------------------------------------------------------
  const fsGetProductsByPage = useCallback(
    async (startAfterDocument, startAtDocument, recordsLimit, filter) => {
      console.log(startAfterDocument);
      const dataArr = [];
      let docRef = collectionGroup(DB, 'partsData');
      docRef = query(docRef, orderBy('partNumber', 'desc'), limit(recordsLimit));

      // Conditionally add filters based on the provided filter object
      if (filter.partNo) {
        docRef = query(
          docRef,
          where('partNumber', '>=', filter.partNo),
          where('partNumber', '<', `${filter.partNo}\uf8ff`)
        );
      }

      if (filter.model && filter.model.length > 0) {
        docRef = query(docRef, where('brandModel', 'array-contains', filter.model));
      }

      // Start the query after the last document from the previous page
      if (startAfterDocument) {
        docRef = query(docRef, startAfter(startAfterDocument));
      }
      if (startAtDocument) {
        docRef = query(docRef, startAt(startAtDocument));
      }

      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((document) => dataArr.push(document.data()));
      return dataArr;
    },
    []
  );

  // ----------------------------------------------------------------------------
  const fsGetCartParts = useCallback(
    async (cartPartsArray) => {
      const partsNumbersArray = cartPartsArray.map((part) => part.partNumber);
      const docRef = query(
        collectionGroup(DB, 'partsData'),
        where('partNumber', 'in', partsNumbersArray)
      );

      const querySnapshot = await getDocs(docRef);
      const documents = [];

      const asyncOperations = [];

      querySnapshot.forEach((document) => {
        const asyncOperation = async () => {
          const imageUrl = await fsGetImgDownloadUrl(document.data().imageName);
          const { partNumber } = document.data();
          documents.push({
            partData: document.data(),
            imageUrl,
            qty: cartPartsArray.find((item) => item.partNumber === partNumber).qty,
          });
        };
        asyncOperations.push(asyncOperation());
      });

      await Promise.all(asyncOperations);

      return documents;
    },
    [fsGetImgDownloadUrl]
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
      fsGetPartDetails,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      fsGetProductsByPage,
      fsGetProductsDocumentsCount,
      fsWriteBatchPartsData,
      fsGetCartParts,
    }),
    [
      addNewForm,
      fsGetPartDetails,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      fsGetProductsByPage,
      fsGetProductsDocumentsCount,
      fsWriteBatchPartsData,
      fsGetCartParts,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
