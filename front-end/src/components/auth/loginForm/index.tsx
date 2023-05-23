import { TextField, Box, Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import { object, string } from 'yup';

function LoginForm() {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log(values);
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
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            login
          </Button>
        </Box>
      )}
    </Formik>
  );
}

export default LoginForm;
