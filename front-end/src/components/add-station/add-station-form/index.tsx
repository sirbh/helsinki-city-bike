import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid,
} from '@mui/material';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import { useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { Message } from '../../../types';
import AuthContext from '../../../contexts/AuthContext';
import StationContext from '../../../contexts/StationContext';

function AddStationForm() {
  const { mutate, isLoading } = useContext(StationContext);
  const { userDetails } = useContext(AuthContext);
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
      onSubmit={(values, { resetForm }) => {
        if (mutate && userDetails) {
          mutate(
            {
              newStation: {
                name: values.name,
                x: parseInt(values.latitude, 10),
                y: parseInt(values.longitude, 10),
                operator: 'CityBike Finland',
                address: values.address,
                capacity: parseInt(values.capacity, 10),
                city: 'Espoo',
              },
              authToken: userDetails?.token,
            },
            {
              onSuccess: (result) => {
                setFormMessage({
                  type: 'info',
                  message: `${result.name} added successfully`,
                });
                resetForm();
              },
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
            }
          );
        }
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
                type='number'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="latitude"
                {...getFieldProps('longitude')}
                fullWidth
                error={!!errors.longitude}
                helperText={errors.longitude}
                type='number'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="capacity"
                {...getFieldProps('capacity')}
                fullWidth
                error={!!errors.capacity}
                helperText={errors.capacity}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                disabled={isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress size="20px" color="inherit" />
                  ) : undefined
                }
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
