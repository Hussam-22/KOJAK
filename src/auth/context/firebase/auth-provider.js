import { initializeApp } from 'firebase/app';
import {
  Timestamp,
  collection,
  collectionGroup,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

// config
import { CART_FORM, CONTACT_US_FORM, FIREBASE_API, SITE_NAME } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

const THIS_MONTH = new Date().getMonth();
const THIS_YEAR = new Date().getFullYear();

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // ----------------------------------------------------------------------------
  const fsGetImgDownloadUrl = useCallback(async (imgID, resolution = '480x480') => {
    let url = '';
    const webpImage = imgID.replace(/\.\w+$/, `_${resolution}.webp`);
    try {
      url = await getDownloadURL(
        ref(STORAGE, `gs://kojak-spare-parts/spare-parts-images/${webpImage}`)
      );
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
        to: [
          'asstpurchaseparts@kojak-group.com',
          'hussam@hotmail.co.uk',
          'queriesksp@kojak-group.com',
          'info.marketing@kojak-group.com',
        ],
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
        to: [
          'asstpurchaseparts@kojak-group.com',
          'hussam@hotmail.co.uk',
          'queriesksp@kojak-group.com',
          'info.marketing@kojak-group.com',
        ],
        message: {
          subject: payload.subject,
          html: `
        <p>Email: ${payload.email}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Subject: ${payload.subject}</p>
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
      const docRef = doc(DB, `/websites/${SITE_NAME}/spare-parts-list/${partID}`);
      const docSnap = await getDoc(docRef);
      const imgUrl = await fsGetImgDownloadUrl(docSnap.data().imageName, '1080x720');
      return { ...docSnap.data(), imgUrl };
    },
    [fsGetImgDownloadUrl]
  );
  // ----------------------------------------------------------------------------

  const fsUpdatePartStatistics = useCallback(async (partID, source) => {
    const docRef = doc(DB, `/websites/${SITE_NAME}/spare-parts-list/${partID}`);

    await updateDoc(docRef, {
      [`statistics.${source}.${THIS_YEAR}.${THIS_MONTH}`]: increment(1),
    });
  }, []);
  // ----------------------------------------------------------------------------

  const fsGetProductsDocumentsCount = useCallback(async (filter) => {
    let docRef = collectionGroup(DB, 'spare-parts-list');
    // docRef = query(docRef, orderBy('partNumber', 'desc'));

    if (filter.partNo) {
      docRef = query(
        docRef,
        where('partNumber', '>=', filter.partNo),
        where('partNumber', '<', `${filter.partNo}\uf8ff`),
        orderBy('partNumber', 'desc')
      );
    }

    if (!filter.partNo) {
      // docRef = query(docRef, where('partNumber', '!=', ''), orderBy('partNumber', 'desc'));
      docRef = query(docRef, where('stock', '!=', 0), orderBy('stock', 'desc'));
    }

    if (filter.model && filter.model.length > 0) {
      docRef = query(docRef, where('brandModel', '==', filter.model));
    }

    if (filter.category !== '') {
      docRef = query(docRef, where('category', 'in', [filter.category]));
    }

    const snapshot = await getCountFromServer(docRef);

    return snapshot.data().count;
  }, []);
  // ----------------------------------------------------------------------------
  const fsGetProductsByPage = useCallback(async (startAfterDocument, recordsLimit, filter) => {
    console.log(startAfterDocument);
    const dataArr = [];
    let docRef = collectionGroup(DB, 'spare-parts-list');
    docRef = query(docRef, limit(recordsLimit));
    const partNumber = filter.partNo || '';

    // uppercase first letter of partNumber
    const upperPartNumber = partNumber.charAt(0).toUpperCase() + partNumber.slice(1);

    // Conditionally add filters based on the provided filter object
    if (filter.partNo) {
      docRef = query(
        docRef,
        where('partNumber', '>=', upperPartNumber),
        where('partNumber', '<', `${upperPartNumber}\uf8ff`),
        orderBy('partNumber', 'desc')
      );
    }

    if (!upperPartNumber) {
      docRef = query(docRef, where('partNumber', '!=', ''), orderBy('partNumber', 'desc'));
    }

    if (filter.model && filter.model.length > 0) {
      docRef = query(docRef, where('brandModel', '==', filter.model));
    }

    if (filter.category !== '') {
      docRef = query(docRef, where('category', 'in', [filter.category]));
    }

    // Start the query after the last document from the previous page
    if (startAfterDocument) {
      docRef = query(docRef, startAfter(startAfterDocument));
    }

    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr;
  }, []);

  const covertToInt = useCallback(async () => {
    const batch = writeBatch(DB);
    const docRef = query(collectionGroup(DB, 'spare-parts-list'));
    const querySnapshot = await getDocs(docRef);

    querySnapshot.forEach((document) => {
      if (typeof document.data().stock === 'string') {
        console.log(document.data());
        batch.update(document.ref, { stock: +document.data().stock });
      }
    });

    await batch.commit();
  }, []);

  // ----------------------------------------------------------------------------
  const fsGetCartParts = useCallback(
    async (cartPartsArray) => {
      const partsNumbersArray = cartPartsArray.map((part) => part.partNumber);
      const docRef = query(
        collectionGroup(DB, 'spare-parts-list'),
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

  const fsGetArrayOfParts = useCallback(
    async (partsArray) => {
      const docRef = query(
        collectionGroup(DB, 'spare-parts-list'),
        where('partNumber', 'in', partsArray)
      );

      const querySnapshot = await getDocs(docRef);
      const documents = [];

      const asyncOperations = [];

      querySnapshot.forEach((document) => {
        const asyncOperation = async () => {
          const imageUrl = await fsGetImgDownloadUrl(document.data().imageName);
          documents.push({
            partData: document.data(),
            imageUrl,
          });
        };
        asyncOperations.push(asyncOperation());
      });

      await Promise.all(asyncOperations);

      return documents;
    },
    [fsGetImgDownloadUrl]
  );

  const getClassModelsList = useCallback(async () => {
    const docRef = collection(DB, '/websites/spareparts/classModelsList');
    const queryRef = query(docRef);
    const querySnapshot = await getDocs(queryRef);

    const documents = [];

    querySnapshot.forEach((element) => {
      documents.push(element.data());
    });

    return documents;
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetFolderImages = useCallback(async (folderID) => {
    const listRef = ref(STORAGE, `gs://kojak-exclusive/${folderID}`);
    const imagesList = await listAll(listRef);
    const imagesUrl = await Promise.all(
      imagesList.items.map(async (imageRef) => getDownloadURL(ref(STORAGE, imageRef)))
    );
    const thumbnail = imagesUrl.filter((url) => url.includes('480x480'));
    const largeImage = imagesUrl.filter((url) => url.includes('1920x1080'));
    return [thumbnail, largeImage];
  }, []);

  // --------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      addNewForm,
      fsGetPartDetails,
      fsUpdatePartStatistics,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      fsGetProductsByPage,
      fsGetProductsDocumentsCount,
      fsGetCartParts,
      fsGetArrayOfParts,
      getClassModelsList,
      //
      covertToInt,
    }),
    [
      addNewForm,
      fsGetPartDetails,
      fsUpdatePartStatistics,
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      fsGetProductsByPage,
      fsGetProductsDocumentsCount,
      fsGetCartParts,
      fsGetArrayOfParts,
      getClassModelsList,
      //
      covertToInt,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
