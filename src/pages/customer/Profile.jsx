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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router';
import api from '../../constants/api';
import { setAlertActionCreator } from '../../states/alert/action';
import {
  asyncUpdateAuthUser,
  updateUserImageActionCreator,
} from '../../states/authUser/action';
import { AvatarDetail } from '../../components/customer/ProfilePage/AvatarDetail';

export function ProfileDashoard() {
  const authUser = useSelector((states) => states.authUser);
  const userImage = useSelector((states) => states.authUser?.imageUrl);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [see, setSee] = useState(false);
  const nav = useNavigate();
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [avatarDetailOpen, setAvatarDetailOpen] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('file', file);

    api
      .patch(`/user/edit/${authUser?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async () => {
        const imageUrl = URL.createObjectURL(file);
        dispatch(updateUserImageActionCreator(imageUrl));
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Edit Success' },
          })
        );
      })
      .catch((err) => {
        dispatch(setAlertActionCreator({ err }));
      });
  };

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
        const userId = authUser?.id;
        const formData = formik.values;

        await api.get(`/user/${authUser?.id}`);
        dispatch(asyncUpdateAuthUser({ userId, formData }));
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Edit Success' },
          })
        );
      } catch (err) {
        dispatch(setAlertActionCreator({ err }));
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
        .min(8, 'at least 8 characters')
        .required('Required'),
      newPassword: Yup.string()
        .min(8, 'at least 8 characters')
        .required('Required'),
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        setLoading(true);
        await api.patch('/user/edit-password', formik2.values);
        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Edit Password Success' },
          })
        );
      } catch (err) {
        formik2.resetForm();
        dispatch(setAlertActionCreator({ err }));
        setLoading(false);
      } finally {
        formik2.resetForm();
        setLoading(false);
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

  const handleCancel = () => {
    formik.resetForm();
  };

  const gambarProfil = `${import.meta.env.VITE_API_BASE_URL}/user/${
    authUser?.id
  }/image`;

  const resendVerification = () => {
    nav('/verify');
  };

  const handleAvatarClick = () => {
    setAvatarDetailOpen(true);
  };

  return (
    <Container sx={{ mt: 3, p: 2 }}>
      <Card sx={{ p: 2, boxShadow: 5 }}>
        {/* title */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5">My Profile</Typography>
          <Typography level="body-sm">
            Customize how your profile information will appear to the Website.
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
            <div onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
              <Avatar
                key={authUser?.imageUrl}
                sx={{
                  minHeight: 120,
                  minWidth: 120,
                  position: 'relative',
                  cursor: 'pointer',
                }}
                src={image || gambarProfil || userImage}
              />
            </div>
            <IconButton
              sx={{
                position: 'relative',
                bottom: '43px',
                right: '-40px',
                bgcolor: 'grey.50',
                boxShadow: 2,
                cursor: 'pointer',
                ':hover': { bgcolor: '#b6c1bc', cursor: 'pointer' },
              }}
            >
              <EditIcon sx={{ color: 'grey.700' }} />
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </IconButton>
            {/* Avatar Detail */}
            <AvatarDetail
              open={avatarDetailOpen}
              setOpen={setAvatarDetailOpen}
              imgSrc={gambarProfil}
            />
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

            <FormLabel>Status</FormLabel>
            <FormControl sx={{ gap: 1, maxWidth: 225 }}>
              <TextField
                size="small"
                id="outlined-basic-email"
                value={
                  authUser?.isVerified === true ? 'verified' : 'unverified'
                }
                variant="outlined"
                disabled
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => resendVerification()}
                disabled={isButtonDisabled}
                sx={{ display: authUser?.isVerified === true ? 'none' : '' }}
              >
                Verify my Account
              </Button>
            </FormControl>

            {/* CHANGE PASSWORD */}
            <Button
              variant="text"
              color="primary"
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => (see ? setSee(false) : setSee(true))}
            >
              Change Password
              <ArrowDropDownIcon sx={{ display: see ? 'none' : 'block' }} />
              <ArrowDropUpIcon sx={{ display: see ? 'block' : 'none' }} />
            </Button>

            <Collapse
              in={see}
              timeout={300}
              style={{ transformOrigin: '0 0 0' }}
              {...(see ? { timeout: 600 } : {})}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                display={see ? 'block' : 'none'}
              >
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
                            <VisibilityOffIcon
                              fontSize="small"
                              sx={{
                                display: !seeOldPassword ? 'block' : 'none',
                              }}
                            />
                            <VisibilityIcon
                              fontSize="small"
                              sx={{
                                display: seeOldPassword ? 'block' : 'none',
                              }}
                            />
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
                    sx={{
                      width: '100%',
                      marginBottom: 1,
                    }}
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
                            <VisibilityOffIcon
                              fontSize="small"
                              sx={{
                                display: !seeNewPassword ? 'block' : 'none',
                              }}
                            />
                            <VisibilityIcon
                              fontSize="small"
                              sx={{
                                display: seeNewPassword ? 'block' : 'none',
                              }}
                            />
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
                    sx={{
                      width: '100%',
                      marginBottom: 1,
                    }}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="info"
                  onClick={formik2.handleSubmit}
                  disabled={loading}
                >
                  Update Password
                </Button>
              </Stack>
            </Collapse>
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
              variant="contained"
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
