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
import { SITE_NAME, FIREBASE_API, CONTACT_US_FORM } from 'src/config-global';

//
import { AuthContext } from './auth-context';

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  // ADD NEW FORM
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

  const fsGetProductsDocumentsCount = useCallback(async () => {
    const docRefCount = query(collectionGroup(DB, `partsData`), orderBy('id', 'desc'));
    const snapshot = await getCountFromServer(docRefCount);

    return snapshot.data().count;
  }, []);

  const fsGetProductsByPage = useCallback(async (page, recordsLimit, filter) => {
    const dataArr = [];
    let docRef = collectionGroup(DB, 'partsData');
    docRef = query(
      docRef,
      orderBy('id', 'desc'),
      startAfter(page * recordsLimit),
      limit(recordsLimit)
    );

    // Conditionally add filters based on the provided filter object
    if (filter.partNo) {
      docRef = query(docRef, where('partNumber', '==', filter.partNo));
    }
    if (filter.partName) {
      docRef = query(docRef, where('partName', '==', filter.partName));
    }
    if (filter.model && filter.model.length > 0) {
      docRef = query(docRef, where('brandModel', 'array-contains', filter.model));
    }
    if (filter.category && filter.category.length > 0) {
      docRef = query(docRef, where('category', 'in', filter.category));
    }

    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr;
  }, []);

  /*  const fsGetProductsByPage = useCallback(async (page, recordsLimit, filter) => {
    const dataArr = [];
    // const docRef = query(
    //   collectionGroup(DB, `partsData`),
    //   orderBy('id', 'desc'),
    //   startAfter(page * recordsLimit),
    //   limit(recordsLimit)
    // );

    let docRef = collectionGroup(DB, 'partsData');

    // if (filter.partNo !== '') {
    //   docRef = query(docRef, where('partNumber', '==', filter.partNo));
    // }

    // if (filter.partName !== '') {
    //   docRef = query(docRef, where('partName', '==', filter.partName));
    // }

    // if (filter.class !== '') {
    //   docRef = query(docRef, where('brandClass', '==', filter.class));
    // }

    // if (filter.model !== '') {
    //   docRef = query(docRef, where('brandModel', '==', filter.model));
    // }

    // if (filter.category.length !== 0) {
    //   docRef = query(docRef, where('category', 'in', filter.category));
    // }

    docRef = query(
      docRef,
      orderBy('id', 'desc'),
      startAfter(page * recordsLimit),
      limit(recordsLimit),
      where('partNumber', '==', filter.partNo),
      where('partName', '==', filter.partName),
      where('brandClass', '==', filter.class),
      where('brandModel', '==', filter.model),
      where('category', 'in', filter.category)
    );

    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr;
  }, []); */

  // ------------------ | Get image Download URL | ------------------
  // const fsGetImgDownloadUrl = useCallback(
  //   async (location, folderID, imgID, resolution = '1920x1080') => {
  //     console.log('download url');
  //     let url = '';
  //     try {
  //       url = await getDownloadURL(
  //         ref(STORAGE, `gs://${location}/${folderID}/${imgID}_${resolution}.webp`)
  //       );
  //     } catch (error) {
  //       url = undefined;
  //     }

  //     return url;
  //   },
  //   []
  // );

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
  const fsGetCartParts = useCallback(
    async (cartPartsArray) => {
      const docRef = query(
        collectionGroup(DB, 'partsData'),
        where('partNumber', 'in', cartPartsArray)
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
      fsGetImgDownloadUrl,
      fsGetFolderImages,
      fsGetProductsByPage,
      fsGetProductsDocumentsCount,
      fsWriteBatchPartsData,
      fsGetCartParts,
    }),
    [
      addNewForm,
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
