import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../constants/api';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function LoginPage() {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'at least 8 characters')
        .required('Required')
        .minUppercase(1, 'at least 1 capital letter')
        .minNumbers(1, 'at least 1 number'),
    }),
    onSubmit: async () => {
      try {
        await api.post('/user/login', formik.values);

        alert('success login');
        return nav('/');
      } catch (err) {
        console.log(err?.message);
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
            don't have account yet?&nbsp;&nbsp;
            <a
              href={`${apiUrl}/register`}
              style={{ color: 'green', textDecoration: 'none' }}
            >
              Register
            </a>
          </Typography>

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
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
