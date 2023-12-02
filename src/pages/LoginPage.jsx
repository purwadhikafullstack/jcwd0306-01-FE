import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import google from '../assets/google.png';
import { asyncSetAuthUser } from '../states/authUser/action';
import { setAlertActionCreator } from '../states/alert/action';
import GadgetGalleryLogo from '../components/GadgetGalleryLogo';
import api from '../constants/api';
import loginWithGoogle from '../lib/loginWithGoogle';

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
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase')
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase')
        .min(8, 'Password minimum 8 characters')
        .matches(/^(?=.*\d)/, 'Must contain at least one number')
        .required('required'),
    }),
    onSubmit: async () => {
      try {
        setButtonDisabled(true);
        const authData = {
          email: formik.values.email,
          password: formik.values.password,
          nav,
        };
        const data = await api.post(`/user/login`, authData);

        const isNotSetPasswordWithGoogle =
          data.data.data.isNotCreatePassword === true;

        if (isNotSetPasswordWithGoogle) {
          dispatch(
            setAlertActionCreator({
              val: {
                status: 'info',
                message:
                  'you`re not set password yet, please set password first!',
              },
            })
          );
          setTimeout(() => nav(`/verify?email=${formik.values.email}`), 3000);
          return;
        }

        dispatch(asyncSetAuthUser(authData));
      } catch (err) {
        dispatch(setAlertActionCreator({ err }));
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
      <GadgetGalleryLogo
        sx={{ m: '3rem', fontSize: '3rem', textAlign: 'center' }}
      />

      <Box display="flex" justifyContent="space-evenly">
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
            fontWeight="700"
          >
            Masuk
          </Typography>
          <Typography
            display="flex"
            justifyContent="center"
            fontWeight="400"
            fontSize={12}
            sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
          >
            belum punya akun?&nbsp;&nbsp;
            <Link to="/register">Daftar</Link>
          </Typography>
          <Box
            display="flex"
            mt={2}
            alignItems="center"
            p={1}
            border="1px solid grey"
            borderRadius={5}
            sx={{ cursor: 'pointer' }}
            onClick={() => loginWithGoogle(dispatch, nav)}
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
          <Stack direction="row" spacing={1} alignItems="center" mt="10px">
            <Divider
              sx={{
                flexGrow: 1,
                height: '0.3rem',
                width: '1rem',
                bgcolor: 'divider',
                borderRadius: '1rem',
              }}
            />
            <Typography fontSize="0.8rem">atau login dengan</Typography>
            <Divider
              sx={{
                flexGrow: 1,
                height: '0.3rem',
                width: '1rem',
                bgcolor: 'divider',
                borderRadius: '1rem',
              }}
            />
          </Stack>
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
            label="password"
            variant="outlined"
            size="small"
            type={see ? 'text' : 'password'}
            defaultValue=""
            style={{
              marginTop:
                formik.touched.email && Boolean(formik.errors.email)
                  ? '27px'
                  : '8px',
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
          <Typography
            fontSize="small"
            sx={{
              m:
                formik.touched.password && Boolean(formik.errors.password)
                  ? '20px'
                  : '8px',
              '& a': { color: 'primary.main', textDecoration: 'none' },
            }}
          >
            lupa password?&nbsp;&nbsp;
            <Link to="/forget-password">klik disini</Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={formik.handleSubmit}
            disabled={isButtonDisabled}
          >
            Masuk
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { LoginPage };
