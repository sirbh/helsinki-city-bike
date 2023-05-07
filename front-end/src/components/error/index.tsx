import { ErrorOutline } from '@mui/icons-material';
import { Card, CardContent, Modal, Typography } from '@mui/material';

function Error() {
  return (
    <Modal
      open
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          padding: '4rem',
          position: 'relative',
          ':focus': {
            outline: 'none',
          },
          ':active': {
            outline: 'none',
          },
        }}
      >
        <CardContent
          content="center"
          sx={{
            padding: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <ErrorOutline fontSize="large" sx={{ color: 'red' }} />
          <Typography variant="h4">Whoops! Something went wrong</Typography>
        </CardContent>
      </Card>
    </Modal>
  );
}

export default Error;
