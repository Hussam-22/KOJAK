import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
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

  // get website info
  const getWebsiteInfo = useCallback(async () => {
    const docRef = doc(DB, `/websites/building/`);
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

  // add new space
  const addNewSpace = useCallback(async () => {
    const id = 'C1003-3';
    const data = await setDoc(doc(DB, '/websites/building/spaces/', id), {
      id,
      bucketID: 'C1001-1',
      type: 'commercial'.toLowerCase(),
      spaceType: 'Offices',
      description: 'Second Floor - Office Space',
      city: 'Dubai',
      location: 'Motor City',
      buildingName: 'Kojak',
      rent: 0,
      rentSale: 0,
      coverImgID: '1',
      imagesIDs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      isAvailable: false,
      features: {
        area: '400-4000',
        bedrooms: 0,
        bathrooms: 0,
        ac: 'Emicool',
        parking: 100,
        healthClub: false,
        security: true,
        cctv: true,
        chequesNo: '4-6',
        kitchen: 0,
      },
      contactDetails: {
        email: 'mohamed@kojak-group.com',
        mobile: '0529242623',
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
  const addNewForm = useCallback(async (payload) => {
    const newDocRef = doc(collection(DB, `/websites/automain/forms/`));
    const date = new Date();
    const dateTime = date.toDateString();
    setDoc(newDocRef, {
      ...payload,
      id: newDocRef.id,
      createdAt: Timestamp.fromDate(new Date()),
      to: ['hussam@hotmail.co.uk'],
      message: {
        subject: 'New Appointment Was Submitted',
        // text: 'New Appointment Was Submitted - 2',
        html: `
        <p>Source: ${payload.source}</p>
        <p>Name: ${payload.fullName}</p>
        <p>Mobile: ${payload.mobile}</p>
        <p>Email: ${payload.email}</p>
        <p>Car Class: ${payload.class}</p>
        <p>Year: ${payload.year}</p>
        <p>Service Required: ${payload.service.join(', ')}</p>
        <p>Appointment Date: ${payload.appointmentDate}</p>
        <p>Inquiry: ${payload.messageText}</p>
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
      fsGetFeaturedProperty,
      addNewSpace,
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
      getWebsiteInfo,
      getAllSpacesInfo,
      getSpaceInfo,
      fsGetFeaturedProperty,
      addNewSpace,
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
