import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { asyncSetAuthUser } from '../states/authUser/action';
import { setAlertActionCreator } from '../states/alert/action';
import { auth } from './firebase';

const loginWithGoogle = async (dispatch, nav) => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const nameArray = res.user.displayName.split(' ');
    const splittedFirstName = nameArray[0];
    const splittedLastName = nameArray[nameArray.length - 1];

    const authData = {
      email: res.user.email,
      providerId: res.providerId,
      nav,
      firstName: splittedFirstName,
      lastName: splittedLastName,
      uid: res.user.uid,
    };
    dispatch(asyncSetAuthUser(authData));
    dispatch(
      setAlertActionCreator({
        val: { status: 'success', message: 'login success' },
      })
    );
  } catch (err) {
    dispatch(setAlertActionCreator({ err }));
  }
};

export default loginWithGoogle;
