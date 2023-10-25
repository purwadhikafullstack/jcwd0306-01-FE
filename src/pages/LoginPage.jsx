import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import google from '../assets/google.png';
import line from '../assets/line 2.png';
import { asyncSetAuthUser } from '../states/authUser/action';
import { constant } from '../constants/constant';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(5, 'at least 8 characters')
        .required('Required'),
      // .minUppercase(1, 'at least 1 capital letter')
      // .minNumbers(1, 'at least 1 number'),
    }),
    onSubmit: async () => {
      try {
        setButtonDisabled(true);
        const data = await api.post('/user/login', formik.values);
        const payloadValue = data.data.data.user;
        // console.log('data', data.data.data.user);

        // dispatch here
        const authData = {
          email: formik.values.email,
          password: formik.values.password,
        };

        // localStorage.setItem('auth', data.data.data.token);

        dispatch(asyncSetAuthUser(authData));
        // dispatch({
        //   type: constant.login,
        //   payload: { ...payloadValue },
        // });

        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'login success' },
          })
        );
        nav('/');
      } catch (err) {
        console.log(err?.message);
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.message },
          })
        );
      } finally {
        setButtonDisabled(false);
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }
  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="20px"
      >
        <Typography fontFamily="sans-serif" fontSize="30px" color="green">
          GadgetGallery
        </Typography>
      </Box>

      <Box display="flex" mt="4rem" justifyContent="space-evenly">
        <Box
          maxWidth="100%"
          height="auto"
          width="350px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          p={3}
        >
          <Typography
            variant="h5"
            display="flex"
            justifyContent="center"
            fontWeight="500"
          >
            Sign In
          </Typography>
          <Typography
            display="flex"
            justifyContent="center"
            fontWeight="400"
            fontSize={12}
          >
            don`t have account yet?&nbsp;&nbsp;
            <a
              href={`${apiUrl}/register`}
              style={{ color: 'green', textDecoration: 'none' }}
            >
              Register
            </a>
          </Typography>

          <Box
            display="flex"
            mt={2}
            alignItems="center"
            p={1}
            border="1px solid grey"
            borderRadius={5}
            sx={{ cursor: 'pointer' }}
            onClick={() => alert('hello')}
          >
            <img
              src={google}
              alt=""
              style={{ maxWidth: '100%', height: 'auto', width: '30px' }}
            />
            <Typography flex={1} textAlign="center">
              Google
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <img
              src={line}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: '80px',
                marginRight: '8px',
              }}
            />
            <span style={{ fontSize: '13px' }}>atau login dengan</span>
            <img
              src={line}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: '80px',
                marginLeft: '5px',
              }}
            />
          </Box>

          <TextField
            onChange={(e) => inputHandler(e, 'email')}
            id="outlined-basic"
            label="email"
            variant="outlined"
            size="small"
            style={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              width: '500px',
            }}
          />

          <TextField
            onChange={(e) => inputHandler(e, 'password')}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            defaultValue=""
            style={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              width: '500px',
            }}
          />
          <Button
            variant="outlined"
            style={{ marginTop: '10px', width: '100%', height: '50px' }}
            size="large"
            onClick={formik.handleSubmit}
            disabled={isButtonDisabled}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { LoginPage };
