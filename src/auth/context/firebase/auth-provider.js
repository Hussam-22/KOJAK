import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { ref, listAll, getStorage, getDownloadURL } from 'firebase/storage';
import {
  doc,
  where,
  query,
  getDoc,
  setDoc,
  getDocs,
  Timestamp,
  collection,
  getFirestore,
  collectionGroup,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// config
import { FIREBASE_API } from 'src/config-global';

//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);
const STORAGE = getStorage(firebaseApp);
const AUTH = getAuth(firebaseApp);
const DB = getFirestore(firebaseApp);

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          if (user.emailVerified) {
            const userProfile = doc(DB, 'users', user.uid);

            const docSnap = await getDoc(userProfile);

            const profile = docSnap.data();

            dispatch({
              type: 'INITIAL',
              payload: {
                user: {
                  ...user,
                  ...profile,
                  id: user.uid,
                  role: 'admin',
                },
              },
            });
          } else {
            dispatch({
              type: 'INITIAL',
              payload: {
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const newUser = await createUserWithEmailAndPassword(AUTH, email, password);

    await sendEmailVerification(newUser.user);

    const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  // ! ----------------------------------------------------------------------
  // ! ----------------------------------------------------------------------
  const fsGetImgDownloadUrl = useCallback(async (bucketPath, imgID) => {
    let url = '';
    try {
      url = await getDownloadURL(ref(STORAGE, `gs://${bucketPath}${imgID}`));
    } catch (error) {
      url = undefined;
    }
    return url;
  }, []);

  const fsGetFolderImages = useCallback(async (bucket, folderID) => {
    const listRef = ref(STORAGE, `gs://${bucket}/${folderID}`);
    const imagesList = await listAll(listRef);
    const imagesUrl = await Promise.all(
      imagesList.items.map(async (imageRef) => getDownloadURL(ref(STORAGE, imageRef)))
    );
    const thumbnail = imagesUrl.filter((url) => url.includes('200x200'));
    const largeImage = imagesUrl.filter((url) => url.includes('1920x1080'));
    return [thumbnail, largeImage];
  }, []);

  const fsGetSpaces = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'spaces-list'));
    const querySnapshot = await getDocs(docRef);

    const documents = [];
    const asyncOperations = [];

    querySnapshot.forEach((document) => {
      const asyncOperation = async () => {
        const listRef = ref(STORAGE, `gs://kojak-building/${document.data().docID}`);
        const imagesList = await listAll(listRef);
        const thumbnail = await fsGetImgDownloadUrl(
          `kojak-building/${document.data().docID}/`,
          imagesList?.items.filter((imageName) => imageName.name.includes('1920x1080'))[0]?.name
        );

        documents.push({ data: document.data(), thumbnail });
      };
      asyncOperations.push(asyncOperation());
    });
    await Promise.all(asyncOperations);

    return documents;
  }, [fsGetImgDownloadUrl]);

  const fsGetSpace = useCallback(async (spaceID) => {
    const docRef = doc(DB, `/websites/building/spaces-list/${spaceID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // get all spaces info (switch for available only or ALL)
  const getAllSpacesInfo = useCallback(async (isAvailableOnly = false) => {
    // const dataArr = [];
    // const querySnapshot = await getDocs(collection(DB, 'websites', 'building', 'spaces'));
    // querySnapshot.forEach((document) => dataArr.push(document.data()));
    // return dataArr;

    const docRef = query(
      collectionGroup(DB, 'spaces'),
      where('isAvailable', 'in', isAvailableOnly ? [true] : [true, false])
    );
    const querySnapshot = await getDocs(docRef);
    const dataArr = [];
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr;
  }, []);

  // get featured property
  const fsGetFeaturedProperty = useCallback(async () => {
    const docRef = query(collectionGroup(DB, 'spaces'), where('isFeatured', '==', true));
    const querySnapshot = await getDocs(docRef);
    const dataArr = [];
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr[0];
  }, []);

  // get space info
  const getSpaceInfo = useCallback(async (spaceID) => {
    const docRef = doc(DB, `/websites/building/spaces/${spaceID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // add new request-callback form
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/building/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to: ['info.kgmarketing@gmail.com', 'querieskb@kojak-group.com', 'hussam@hotmail.co.uk'],
      message: {
        subject: 'Kojak Building - New Form Submitted',
        text: payload.subject,
        html: `
        <p>Source: ${payload.source}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Email: ${payload.email}</p>
        <p>Subject: ${payload.subject}</p>
        <p>Inquiry: ${payload.inquiry}</p>
        <p>---------------------------</p>
        <p>${dateTime.toLocaleString()}</p>
        <p>${newDocRef.id}</p>
        `,
      },
    });
    return newDocRef.id;
  }, []);

  // add new request-callback form
  const updatePageAnalytic = useCallback(async (page, pageDetails = '') => {
    const newDocRef = doc(collection(DB, `/websites/building/analytics/`));
    setDoc(newDocRef, {
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      page,
      pageDetails,
    });
    return newDocRef.id;
  }, []);

  const checkAuthenticated = state.user?.emailVerified ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
      //
      fsGetSpaces,
      getSpaceInfo,
      fsGetFeaturedProperty,
      addNewForm,
      updatePageAnalytic,
      fsGetImgDownloadUrl,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
      //
      fsGetSpaces,
      getSpaceInfo,
      fsGetFeaturedProperty,
      addNewForm,
      updatePageAnalytic,
      fsGetImgDownloadUrl,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
