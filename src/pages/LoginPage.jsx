import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import google from '../assets/google.png';
import line from '../assets/line 2.png';
import { asyncSetAuthUser } from '../states/authUser/action';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [see, setSee] = useState(false);

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
    }),
    onSubmit: async () => {
      try {
        setButtonDisabled(true);
        const data = await api.post('/user/login', formik.values);
        const authData = {
          email: formik.values.email,
          password: formik.values.password,
        };
        dispatch(asyncSetAuthUser(authData));
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'login success' },
          })
        );
        if (data?.data?.data?.user?.isAdmin) return nav('/admin');
        return nav('/');
      } catch (err) {
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.response.data.message },
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
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ''}
          />
          <TextField
            onChange={(e) => inputHandler(e, 'password')}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type={see ? 'text' : 'password'}
            defaultValue=""
            style={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              width: '500px',
            }}
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
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ''}
          />
          <Typography fontSize="small" sx={{ m: 0.5 }}>
            forget your password? &nbsp;
            <Link href="/forget-password" sx={{ textDecoration: 'none' }}>
              click here
            </Link>
          </Typography>
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
