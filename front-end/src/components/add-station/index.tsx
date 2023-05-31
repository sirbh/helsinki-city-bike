import {
  Card,
  CardContent,
  CardHeader,
  Modal,
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
        </CardContent>
      </Card>
    </Modal>
  );
}

export default AddStation;
