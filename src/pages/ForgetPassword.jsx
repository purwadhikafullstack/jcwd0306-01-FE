import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  // const [isTokenExist, setIsTokenExist] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(
          "* email is invalid. Make sure it's written like example@email.com"
        )
        .required('* Email is required'),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        const { email } = formik.values;
        const res = await api.post(`/user/request-fp?email=${email}`);
        // console.log(res);
        // const checkToken = await api.get(
        //   `/user/forgetPasswordToken?email=${email}`
        // );
        // setIsTokenExist(checkToken.data.data);
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'check your email' },
          })
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsEmailSent(err?.response.data.message);
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.response.data.message },
          })
        );
        setIsLoading(false);
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }

  // useEffect(() => {
  //   if (userSelector.email) {
  //     return nav('/');
  //   }
  // }, [userSelector]);
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
          height: '250px',
          border: '1px solid black',
          boxShadow: 2,
          textAlign: 'center',
          p: 1.5,
        }}
      >
        <Typography variant="h5">FORGET PASSWORD</Typography>
        <Typography fontSize={14} mt={1.5}>
          Enter your email to receive reset password Link
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <TextField
            label="Email"
            size="small"
            onChange={(e) => inputHandler(e, 'email')}
            sx={{ mt: 3, width: '300px' }}
          />
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={formik.handleSubmit}
            // disabled={isTokenExist !== null || isEmailSent !== null}
          >
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
