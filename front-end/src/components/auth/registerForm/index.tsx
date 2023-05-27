import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import { useContext, useState } from 'react';
import { AxiosError } from 'axios';
import useCreateUserMutation from '../../../hooks/useCreateUserMutation';
import { Message } from '../../../types';
import useLoginMutation from '../../../hooks/useLoginMutation';
import AuthContext from '../../../contexts/AuthContext';

function RegisterForm() {
  const { mutate, isLoading } = useCreateUserMutation();
  const { mutate: loginMutation, isLoading: loginLoading } = useLoginMutation();
  const { setOpenAuthModal, setUserDetails } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState<Message | undefined>();
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: '',
        username: '',
        password: '',
        confirmPass: '',
      }}
      onSubmit={(values) => {
        mutate(
          {
            name: values.name,
            password: values.password,
            username: values.username,
          },
          {
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
              loginMutation(
                {
                  username: data.username,
                  password: values.password,
                },
                {
                  onSuccess: (userDetails) => {
                    if (setOpenAuthModal && setUserDetails) {
                      setUserDetails(userDetails);
                      setOpenAuthModal(false);
                    }
                  },
                  onError: () => {
                    setFormMessage({
                      type: 'error',
                      message: 'something went wrong try again later',
                    });
                    setTimeout(() => {
                      setFormMessage(undefined);
                    }, 10000);
                  },
                }
              );
            },
          }
        );
      }}
      validationSchema={object({
        username: string()
          .required('username is required')
          .test(
            'len',
            'username must be more than 2 chars',
            (val) => val.length >= 3
          ),
        name: string()
          .required('name is required')
          .test(
            'len',
            'name must be more than 2 chars',
            (val) => val.length >= 3
          ),
        password: string()
          .required('password is required')
          .test(
            'len',
            'password must be more than 7 chars',
            (val) => val.length >= 8
          ),
        confirmPass: string()
          .required('confirm password is required')
          .oneOf([ref('password')], 'Passwords must match'),
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
            {...getFieldProps('name')}
            label="name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
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
          <TextField
            {...getFieldProps('confirmPass')}
            label="confirm password"
            type="password"
            fullWidth
            error={!!errors.confirmPass}
            helperText={errors.confirmPass}
          />
          <Button
            variant="contained"
            disabled={isLoading || loginLoading}
            endIcon={
              isLoading || loginLoading ? (
                <CircularProgress size="20px" color="inherit" />
              ) : undefined
            }
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
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

export default RegisterForm;
