import { TextField, Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { object, string } from 'yup';

function RegisterForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        username: '',
        password: '',
        confirmPass: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={object({
        username: string().required('username is required'),
        name: string().required('name is required'),
        password: string().required('password is required'),
        confirmPass: string().required('confirm password is required'),
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
            type="confirm password"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </Button>
        </Box>
      )}
    </Formik>
  );
}

export default RegisterForm;
