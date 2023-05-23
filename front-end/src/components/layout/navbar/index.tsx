import { PedalBike } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../../auth';

function Navbar() {
  const pages = [
    { name: 'Journeys', route: '/' },
    { name: 'Stations', route: '/stations' },
  ];

  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <>
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
              <Button
                onClick={() => {
                  setOpenLoginModal(true);
                }}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  marginLeft: '20px',
                }}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Auth
        open={openLoginModal}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      />
    </>
  );
}

export default Navbar;
