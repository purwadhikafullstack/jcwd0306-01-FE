import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setAlertActionCreator } from '../states/alert/action';
import api from '../constants/api';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTokenExist, setIsTokenExist] = useState(null);
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
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .required('confirm your password')
        .oneOf([Yup.ref('password'), null], "passwords don't match"),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        const { password } = formik.values;
        const data = {
          newPassword: password,
          email,
        };
        const res = await api.patch(`/user/forget-password`, data);
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Password Changed' },
          })
        );
        setIsLoading(false);
        nav('/login');
      } catch (err) {
        console.log(err);
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.response.data },
          })
        );
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const checkToken = await api.get(
          `/user/forgetPasswordToken?email=${email}`
        );
        console.log(checkToken);
        setIsTokenExist(checkToken.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, []);

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }
  return isTokenExist ? (
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
          />
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            // disabled={isLoading}
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  ) : (
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
        <Typography variant="h6">Link has Expired</Typography>
      </Box>
    </Box>
  );
}
