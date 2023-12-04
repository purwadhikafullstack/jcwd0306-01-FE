/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setAlertActionCreator } from '../states/alert/action';
import api from '../constants/api';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTokenExist, setIsTokenExist] = useState(null);
  const [see, setSee] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const token = searchParams.get('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const email = decodedToken?.email;
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
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
      setIsLoading(true);
      try {
        const { password } = formik.values;
        const data = {
          newPassword: password,
          email,
        };
        await api.patch(`/user/forget-password`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Password Changed' },
          })
        );
        setIsLoading(false);
        nav('/login');
      } catch (err) {
        setIsTokenValid(false);
        dispatch(setAlertActionCreator({ err }));
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const checkToken = await api.get(
          `/user/forgetPasswordToken?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (checkToken?.data?.data === null) {
          setIsTokenExist(null);
        } else {
          setIsTokenExist(checkToken.data.data);
        }
      } catch (err) {
        setIsTokenValid(false);
        dispatch(setAlertActionCreator({ err }));
      }
    };

    fetchToken();
  }, []);

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }
  if (isTokenExist) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Box
          sx={{
            width: '500px',
            height: 'auto',
            border: '1px solid black',
            boxShadow: 2,
            textAlign: 'center',
            p: 1.5,
          }}
        >
          <Typography variant="h5">ADD NEW PASSWORD</Typography>
          <Typography fontSize={14} mt={1.5}>
            Please input your new password
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <TextField
              label="Password"
              size="small"
              onChange={(e) => inputHandler(e, 'password')}
              sx={{ mt: 3, width: '300px' }}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ''}
              type={see ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
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
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              size="small"
              onChange={(e) => inputHandler(e, 'confirmPassword')}
              sx={{ mt: 3, width: '300px' }}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
              type={seeConfirm ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
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
                ),
              }}
            />
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              disabled={isLoading}
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }
  if (!isTokenExist || !isTokenValid) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            width: '300px',
            border: '1px solid #ccc',
            boxShadow: 4,
          }}
        >
          <Typography variant="h6">Link Has Expired</Typography>
        </Box>
      </Box>
    );
  }
  if (isTokenValid) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Box
          sx={{
            width: '500px',
            height: 'auto',
            border: '1px solid black',
            boxShadow: 2,
            textAlign: 'center',
            p: 1.5,
          }}
        >
          <Typography variant="h5">ADD NEW PASSWORD</Typography>
          <Typography fontSize={14} mt={1.5}>
            Enter your email to receive reset password Link
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <TextField
              label="Password"
              size="small"
              onChange={(e) => inputHandler(e, 'password')}
              sx={{ mt: 3, width: '300px' }}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ''}
              type={see ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setSee(!see)}
                    edge="end"
                    tabIndex="-1"
                  >
                    <VisibilityOffIcon fontSize="small" />
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              size="small"
              onChange={(e) => inputHandler(e, 'confirmPassword')}
              sx={{ mt: 3, width: '300px' }}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
              type={seeConfirm ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setSeeConfirm(!seeConfirm)}
                    edge="end"
                    tabIndex="-1"
                  >
                    <VisibilityOffIcon fontSize="small" />
                  </IconButton>
                ),
              }}
            />
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              disabled={isLoading || !formik.isValid}
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }
}
