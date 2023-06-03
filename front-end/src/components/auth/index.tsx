import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  RegisterationFormHeading,
  LoginFormHeading,
} from '../../utils/appConstants';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

interface AuthProps {
  open: boolean;
  onClose: () => void;
}

function Auth({ open, onClose }: AuthProps) {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setFormType('login');
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          color: 'white',
          width: '750px',
          height: formType === 'login' ? '450px' : '550px',
          ':focus': {
            outline: 'none',
          },
          ':active': {
            outline: 'none',
          },
        }}
      >
        <CardHeader
          title={
            formType === 'login' ? 'Login' : 'Looks Like You Are New Here !!'
          }
          titleTypographyProps={{
            sx: {
              marginBottom: '20px',
              width: '17rem',
            },
            variant: 'h3',
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            position: 'relative',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '30px',
          }}
          subheader={
            <>
              <Typography color="white">
                {formType === 'login'
                  ? LoginFormHeading
                  : RegisterationFormHeading}
              </Typography>
              <CardMedia
                image={formType === 'login' ? './login.svg' : './register.svg'}
                sx={{
                  width: '200px',
                  height: '200px',
                  color: 'white',
                  position: 'absolute',
                  bottom: 30,
                }}
              />
            </>
          }
        />
        <CardContent
          sx={{
            position: 'relative',
            padding: '2.5rem 1rem',
            color: 'black',
          }}
        >
          {formType === 'login' ? <LoginForm /> : <RegisterForm />}
          {formType === 'login' ? (
            <Typography
              variant="body1"
              marginTop="20px"
              textAlign="center"
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                color: (theme) => theme.palette.primary.main,
                textDecorationLine: 'underline',
                cursor: 'pointer',
              }}
              width="100%"
              onClick={() => {
                setFormType('register');
              }}
            >
              No Account? Kindly Register
            </Typography>
          ) : (
            <Typography
              variant="body1"
              marginTop="20px"
              textAlign="center"
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                color: (theme) => theme.palette.primary.main,
                textDecorationLine: 'underline',
                cursor: 'pointer',
              }}
              width="100%"
              onClick={() => {
                setFormType('login');
              }}
            >
              Already Registred? Login Here
            </Typography>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}

export default Auth;
