import { AspectRatio } from '@mui/joy';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import api from '../../constants/api';
import { setAlertActionCreator } from '../../states/alert/action';
import { asyncSetAuthUser } from '../../states/authUser/action';

export function ProfileDashoard() {
  const authUser = useSelector((states) => states.authUser);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [see, setSee] = useState(false);
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: authUser?.firstName,
      lastName: authUser?.lastName,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string('must be string'),
      lastName: Yup.string('mest be string'),
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        setButtonDisabled(true);
        const data = await api.patch(
          `/user/edit/${authUser?.id}`,
          formik.values
        );

        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Edit Success' },
          })
        );
      } catch (err) {
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

  const formik2 = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      email: authUser?.email,
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .min(5, 'at least 8 characters')
        .required('Required'),
      newPassword: Yup.string()
        .min(5, 'at least 8 characters')
        .required('Required'),
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        await api.patch('/user/edit-password', formik2.values);

        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Edit Password Success' },
          })
        );
      } catch (err) {
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.response.data.data },
          })
        );
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }

  function inputHandler2(e, fieldName) {
    const { value } = e.target;
    formik2.setFieldValue(fieldName, value);
  }

  function handleCancel() {
    formik.resetForm();
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/user/render/${authUser?.id}`);
        setAvatar(response);
      } catch (error) {
        console.log(error);
      }
    };
  }, [authUser?.id]);

  return (
    <Container sx={{ mt: 3, p: 2 }}>
      <Card sx={{ p: 2, backgroundColor: '#FBFCFE' }}>
        {/* title */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5">My Profile</Typography>
          <Typography level="body-sm">
            Customize how your profile information will appear to the networks.
          </Typography>
        </Box>
        <Divider />
        {/* content */}
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: 'block', md: 'flex' }, my: 1 }}
        >
          {/* avatar */}
          <Stack direction="column" spacing={1} alignItems="center">
            <Avatar
              sx={{ minHeight: 120, minWidth: 120, position: 'relative' }}
              src={avatar || null}
            />
            <IconButton
              sx={{
                position: 'relative',
                bottom: '43px',
                right: '-40px',
                bgcolor: 'white',
                boxShadow: 2,
                ':hover': { bgcolor: '#FBFCFE' },
              }}
            >
              <EditIcon />
            </IconButton>
          </Stack>
          {/* biodata */}
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <FormLabel>Name</FormLabel>
            <Stack direction="row" spacing={1}>
              <FormControl sx={{ gap: 1 }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  variant="outlined"
                  onChange={(e) => inputHandler(e, 'firstName')}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl sx={{ gap: 1 }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  onChange={(e) => inputHandler(e, 'lastName')}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </Stack>
            <FormLabel>Email</FormLabel>
            <FormControl sx={{ gap: 1, maxWidth: 225 }}>
              <TextField
                size="small"
                id="outlined-basic-email"
                value={authUser?.email}
                variant="outlined"
                disabled
              />
            </FormControl>

            <FormLabel>Role</FormLabel>
            <FormControl sx={{ gap: 1, maxWidth: 225 }}>
              <TextField
                size="small"
                id="outlined-basic-email"
                value={authUser?.isAdmin === 1 ? 'Admin' : 'Customer'}
                variant="outlined"
                disabled
              />
            </FormControl>

            <Button
              variant="text"
              color="primary"
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => (see ? setSee(false) : setSee(true))}
            >
              Change Password
            </Button>

            <Stack direction="row" spacing={1} display={see ? 'block' : 'none'}>
              <FormControl sx={{ gap: 1, maxWidth: 225 }}>
                <TextField
                  size="small"
                  id="outlined-basic-old-password"
                  label="old password"
                  variant="outlined"
                  type={seeOldPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setSeeOldPassword(!seeOldPassword)}
                          edge="end"
                          tabIndex="-1"
                        >
                          <VisibilityOffIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik2.values.oldPassword}
                  error={
                    formik2.touched.oldPassword &&
                    Boolean(formik2.errors.oldPassword)
                  }
                  helperText={
                    formik2.touched.oldPassword && formik2.errors.oldPassword
                  }
                  onChange={(e) => inputHandler2(e, 'oldPassword')}
                  onBlur={formik2.handleBlur}
                />
              </FormControl>
              <FormControl sx={{ gap: 1, maxWidth: 225 }}>
                <TextField
                  size="small"
                  id="outlined-basic-new-password"
                  label="new password"
                  variant="outlined"
                  type={seeNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setSeeNewPassword(!seeNewPassword)}
                          edge="end"
                          tabIndex="-1"
                        >
                          <VisibilityOffIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik2.values.newPassword}
                  error={
                    formik2.touched.newPassword &&
                    Boolean(formik2.errors.newPassword)
                  }
                  helperText={
                    formik2.touched.newPassword && formik2.errors.newPassword
                  }
                  onChange={(e) => inputHandler2(e, 'newPassword')}
                  onBlur={formik2.handleBlur}
                />
              </FormControl>
              <Button
                variant="contained"
                color="info"
                onClick={formik2.handleSubmit}
              >
                Update Password
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {/* footer */}
        <Stack sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2 }}>
          <Box sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button
              color="error"
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              disabled={isButtonDisabled}
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
}
