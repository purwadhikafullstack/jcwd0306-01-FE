import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';

export function Verify() {
  YupPassword(Yup);
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');
  const nav = useNavigate();
  const dispatch = useDispatch();

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
        .min(8, 'Password minimum 8 character')
        .minNumbers(1, 'at least 1 number')
        .required('required'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: async () => {
      try {
        await api.patch('/user/verify', formik.values);
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'verification success' },
          })
        );

        nav('/login');
      } catch (err) {
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.message },
          })
        );
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={10}
      //   border="1px solid black"
    >
      <Typography fontFamily="sans-serif" fontSize="30px" color="blue" mb={3}>
        Verification
      </Typography>

      <Stack>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          size="small"
          // value={formik.values.firstName}
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
          // value={formik.values.lastName}
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
          // value={formik.values.password}
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
          // value={formik.values.confirmPassword}
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
      >
        Submit
      </Button>
    </Box>
  );
}
