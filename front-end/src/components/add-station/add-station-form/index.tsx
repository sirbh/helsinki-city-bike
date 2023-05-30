import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { Formik } from 'formik';
import { object, string, ref, number } from 'yup';
import { useContext, useState } from 'react';
import { AxiosError } from 'axios';
import useCreateUserMutation from '../../../hooks/useCreateUserMutation';
import { Message } from '../../../types';
import useLoginMutation from '../../../hooks/useLoginMutation';
import AuthContext from '../../../contexts/AuthContext';

function AddStationForm() {
  // const { mutate, isLoading } = useCreateUserMutation();
  // const { mutate: loginMutation, isLoading: loginLoading } = useLoginMutation();
  // const { setOpenAuthModal, setUserDetails } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState<Message | undefined>();
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        capacity: '',
        city: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={object({
        name: string()
          .required('required')
          .test(
            'len',
            'username must be more than 2 chars',
            (val) => val.length >= 3
          ),
        city: string()
          .required('required')
          .test(
            'len',
            'name must be more than 2 chars',
            (val) => val.length >= 3
          )
          .default('espoo'),
        address: string()
          .required('required')
          .test(
            'len',
            'password must be more than 7 chars',
            (val) => val.length >= 3
          ),
        latitude: number().typeError('should be a number').required('required'),
        longitude: number()
          .typeError('should be a number')
          .required('required'),
        capacity: number()
          .typeError('should be a number')
          .integer('should be integer')
          .min(0, 'should be positive')
          .required('required'),
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="name"
                {...getFieldProps('name')}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="address"
                {...getFieldProps('address')}
                fullWidth
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="city"
                // {...getFieldProps('city')}
                fullWidth
                error={!!errors.city}
                helperText={errors.city}
                value="espoo"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="longitude"
                {...getFieldProps('latitude')}
                fullWidth
                error={!!errors.latitude}
                helperText={errors.latitude}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="latitude"
                {...getFieldProps('longitude')}
                fullWidth
                error={!!errors.longitude}
                helperText={errors.longitude}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="capacity"
                {...getFieldProps('capacity')}
                fullWidth
                error={!!errors.capacity}
                helperText={errors.capacity}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
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

export default AddStationForm;
