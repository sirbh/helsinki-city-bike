import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import useLoginMutation from '../../../hooks/useLoginMutation';
import { Message } from '../../../types';
import AuthContext from '../../../contexts/AuthContext';

function LoginForm() {
  const { mutate, isLoading } = useLoginMutation();
  const { setOpenAuthModal, setUserDetails } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState<Message | undefined>();
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values) => {
        mutate(values, {
          onError: (error) => {
            const { response } = error as AxiosError;
            setFormMessage({
              type: 'error',
              message: response?.data as string,
            });
            setTimeout(() => {
              setFormMessage(undefined);
            }, 10000);
          },
          onSuccess: (data) => {
            if (setUserDetails && setOpenAuthModal) {
              setOpenAuthModal(false);
              setUserDetails(data);
            }
          },
        });
      }}
      validationSchema={object({
        username: string().required('username is required'),
        password: string().required('password is required'),
      })}
    >
      {({ getFieldProps, handleSubmit, errors }) => (
        <Box
          sx={{
            '> *': {
              marginBottom: '10px',
            },
          }}
        >
          <TextField
            {...getFieldProps('username')}
            label="username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            {...getFieldProps('password')}
            label="password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            variant="contained"
            disabled={isLoading}
            endIcon={
              isLoading ? (
                <CircularProgress size="20px" color="inherit" />
              ) : undefined
            }
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            login
          </Button>
          <Typography
            variant="body2"
            marginTop="10px"
            color={formMessage?.type}
            textAlign="center"
          >
            {formMessage ? `*${formMessage.message}` : ''}
          </Typography>
        </Box>
      )}
    </Formik>
  );
}

export default LoginForm;
