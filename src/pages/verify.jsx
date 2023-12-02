import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';
import GadgetGalleryLogo from '../components/GadgetGalleryLogo';

export function Verify() {
  YupPassword(Yup);
  const authUser = useSelector((states) => states.authUser);
  const queryParams = new URLSearchParams(window.location.search);
  const emailLoggedIn = authUser?.email;
  const email = queryParams.get('email') || emailLoggedIn;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [see, setSee] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('required'),
      lastName: Yup.string().required('required'),
      password: Yup.string()
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase')
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase')
        .min(8, 'Password minimum 8 characters')
        .matches(/^(?=.*\d)/, 'Must contain at least one number')
        .required('required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('required'),
    }),
    onSubmit: async () => {
      try {
        setIsloading(true);
        await api.patch('/user/verify', formik.values);
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'verification success' },
          })
        );
        nav('/login');
        window.location.reload();
      } catch (err) {
        setIsloading(false);
        dispatch(
          setAlertActionCreator({
            val: {
              status: 'error',
              message: err?.response?.data || err?.message,
            },
          })
        );
        if (err?.response?.data === 'token expired, please re-register')
          nav('/register');
      } finally {
        setIsloading(false);
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }
  return (
    <>
      <GadgetGalleryLogo
        sx={{ m: '3rem', fontSize: '3rem', textAlign: 'center' }}
      />

      <Box
        width="300px"
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={10}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        p={3}
        borderRadius={2}
      >
        <Typography
          sx={{ fontFamily: '"Righteous", sans-serif' }}
          fontSize="30px"
          color="blue"
          mb={3}
        >
          Verification
        </Typography>

        <Stack>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            size="small"
            onChange={(e) => inputHandler(e, 'firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            size="small"
            sx={{ marginTop: '10px' }}
            onChange={(e) => inputHandler(e, 'lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            sx={{ marginTop: '10px' }}
            type={see ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setSee(!see)}
                    edge="end"
                    tabIndex="-1"
                  >
                    <VisibilityOffIcon
                      fontSize="small"
                      sx={{ display: !see ? 'block' : 'none' }}
                    />
                    <VisibilityIcon
                      fontSize="small"
                      sx={{ display: see ? 'block' : 'none' }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => inputHandler(e, 'password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            size="small"
            sx={{ marginTop: '10px' }}
            type={seeConfirm ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setSeeConfirm(!seeConfirm)}
                    edge="end"
                    tabIndex="-1"
                  >
                    <VisibilityOffIcon
                      fontSize="small"
                      sx={{ display: !seeConfirm ? 'block' : 'none' }}
                    />
                    <VisibilityIcon
                      fontSize="small"
                      sx={{ display: seeConfirm ? 'block' : 'none' }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => inputHandler(e, 'confirmPassword')}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Stack>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '10px', width: '220px' }}
          onClick={formik.handleSubmit}
          disabled={isLoading}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
