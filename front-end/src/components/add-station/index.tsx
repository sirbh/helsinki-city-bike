import { Height, Image } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import AddStationForm from './add-station-form';

interface AddStationProps {
  open: boolean;
  onClose: () => void;
}

function AddStation({ open, onClose }: AddStationProps) {
  return (
    <Modal
      onClose={onClose}
      open={open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          width: '550px',
          minHeight: '450px',
          ':focus': {
            outline: 'none',
          },
          ':active': {
            outline: 'none',
          },
        }}
      >
        <CardHeader
          title="Add Station"
          titleTypographyProps={{
            sx: {
              // fontSize: '1.25rem',
              marginBottom: '20px',
              display: 'inline',
              // width: '17rem',
            },
            variant: 'h4',
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            // width: '350px',
            position: 'relative',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            // paddingTop: '30px',
          }}
          subheader={
            <Typography color="white">Enter Details Of New Station</Typography>
          }
        />
        <CardContent
          sx={{
            position: 'relative',
            padding: '2.5rem 1rem',
            color: 'black',
            '> *': {
              marginBottom: '10px',
              // marginRight: '5px',
            },
          }}
        >
          <AddStationForm />
          {/* <TextField label="name" sx={{ width: '100%' }} />
          <TextField label="capacity" sx={{ width: '100%' }} />
          <TextField label="city" sx={{ width: '100%' }} />
          <TextField label="address" sx={{ width: '100%' }} />
          <TextField label="longitude" sx={{ width: '30%' }} />
          <TextField label="latitude" sx={{ width: '30%' }} />
          <Button fullWidth variant="contained">
            Submit
          </Button> */}
        </CardContent>
      </Card>
    </Modal>
  );
}

export default AddStation;