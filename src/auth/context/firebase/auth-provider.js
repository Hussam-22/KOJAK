import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
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
import {
  doc,
  where,
  query,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  increment,
  deleteDoc,
  updateDoc,
  onSnapshot,
  writeBatch,
  arrayUnion,
  collection,
  deleteField,
  arrayRemove,
  getFirestore,
  collectionGroup,
  getCountFromServer,
} from 'firebase/firestore';

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

  // get website info
  const getWebsiteInfo = useCallback(async () => {
    const docRef = doc(DB, `/websites/building/`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // get all spaces info
  const getAllSpacesInfo = useCallback(async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(DB, 'websites', 'building', 'spaces'));
    querySnapshot.forEach((document) => dataArr.push(document.data()));
    return dataArr;
  }, []);

  // get space info
  const getSpaceInfo = useCallback(async (spaceID) => {
    const docRef = doc(DB, `/websites/building/spaces/${spaceID}`);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }, []);

  // add new space
  const addNewSpace = useCallback(async () => {
    const data = await setDoc(doc(DB, '/websites/building/spaces/', 'C1001-3'), {
      type: 'commercial'.toLowerCase(),
      id: 'C1001-3',
      bucketID: 'C1001-1',
      city: 'Dubai',
      location: 'Motor City',
      buildingName: 'Kojak Building - Ground Floor - Option 3',
      rent: 88000,
      rentSale: 0,
      coverImgID: '2',
      imagesIDs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      isAvailable: false,
      features: {
        area: '5000',
        isOfficeSpace: true,
        bedrooms: 0,
        bathrooms: 3,
        ac: 'Ducted',
        parking: 100,
        healthClub: false,
        security: true,
        cctv: true,
        chequesNo: 4,
      },
      contactDetails: {
        email: 'mohamed@kojak-group.com',
        mobile: '0501234567',
        fullName: 'Mohamed',
      },
      listingDate: {
        seconds: 1690400112,
        nanoseconds: 896000000,
      },
    });
    return data;
  }, []);

  // add new request-callback form
  const addNewFromCallbackSubmit = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/building/form-callback/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      id: newDocRef.id,
      createdAt: dateTime,
      to: 'hussam@hotmail.co.uk',
      message: {
        subject: 'Hello from firebase',
        text: 'this is some random text',
        html: `<img src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x300' alt='logo' /> <h4>Thank you for your purchase</h4>`,
      },
    });
    return newDocRef.id;
  }, []);

  // add new request-callback form
  const addNewFormGeneralSubmit = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/building/form-contact-us/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      id: newDocRef.id,
      createdAt: dateTime,
      to: payload.email,
      message: {
        subject: 'Hello from firebase',
        text: 'this is some random text',
        html: `<img src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x300' alt='logo' /> <h4>Thank you for your purchase</h4>`,
      },
    });
    return newDocRef.id;
  }, []);

  // ------------------ | Get image Download URL | ------------------
  const fsGetImgDownloadUrl = useCallback(async (projectID, imgID) => {
    // getDownloadURL(ref(STORAGE, `${state.user.id}/menusCover/${dataObj.cover.id}_800x800.webp`))
    const url = await getDownloadURL(
      ref(STORAGE, `gs://kojak-building/${projectID}/${imgID}_800x800.webp`)
    );
    // .then((response) => response)
    // .catch((error) => console.log(error));
    return url;
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
      getWebsiteInfo,
      getAllSpacesInfo,
      getSpaceInfo,
      addNewSpace,
      addNewFromCallbackSubmit,
      addNewFormGeneralSubmit,
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
      getWebsiteInfo,
      getAllSpacesInfo,
      getSpaceInfo,
      addNewSpace,
      addNewFromCallbackSubmit,
      addNewFormGeneralSubmit,
      fsGetImgDownloadUrl,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
