import { PedalBike } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  const pages = [
    { name: 'Journeys', route: '/' },
    { name: 'Stations', route: '/stations' },
  ];

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PedalBike sx={{ display: { md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            CityBike
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: 'flex' },
              justifyContent: 'end',
            }}
          >
            {pages.map((page) => (
              <Link
                to={page.route}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    marginLeft: '20px',
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
