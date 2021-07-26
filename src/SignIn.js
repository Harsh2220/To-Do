import React from 'react';
import './SignIn.css';
import Button from '@material-ui/core/Button';
import { auth, provider } from './Firebase';
import { actionTypes } from './reducer';
import { useStatevalue } from './StateProvider';

function SignIn() {

    const [state, dispatch] = useStatevalue();

    const sendData = () => {

        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="signIn">
            <Button variant="contained" color="primary" style={{textTransform:"inherit"}} onClick={sendData}>
                SignIn with Google
            </Button>
        </div>
    )
}

export default SignIn;
