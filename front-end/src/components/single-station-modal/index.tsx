import Modal from '@mui/material/Modal';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Place } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ISingleStationAPIResponse } from '../../types';
// import { IStationDetails } from '../../hooks/useStationDetails';
import Mapview from '../map';
import useDeleteStationMutation from '../../hooks/useDeleteStationMutation';
import AuthContext from '../../contexts/AuthContext';

interface ISingleStationModal {
  open: boolean;
  handleClose: () => void;
  stationDetails: ISingleStationAPIResponse | undefined;
  loading: boolean;
  showDelete: boolean;
}

function SingleStationModal({
  open,
  handleClose,
  stationDetails,
  loading,
  showDelete,
}: ISingleStationModal) {
  const { mutate, isLoading } = useDeleteStationMutation();
  const { userDetails } = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const queryClient = useQueryClient();
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setIsDeleted(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {!loading ? (
        <Card
          sx={{
            position: 'relative',
            minWidth: '40rem',
            ':focus': {
              outline: 'none',
            },
            ':active': {
              outline: 'none',
            },
          }}
        >
          <CardHeader
            title={`${stationDetails?.details.name} Station`}
            subheader={
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0.5rem 0rem',
                  }}
                >
                  <Place />
                  {stationDetails?.details.address}
                </Box>
                <Mapview
                  lat={stationDetails?.details.y ? stationDetails.details.y : 0}
                  log={stationDetails?.details.x ? stationDetails.details.x : 0}
                  markerLabel={
                    stationDetails?.details.name
                      ? stationDetails.details.name
                      : 'Unknown'
                  }
                />
              </>
            }
          />
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <Typography variant="body2">Total Journeys Started</Typography>
              <Typography variant="h5">
                {stationDetails?.total_departures
                  ? stationDetails.total_departures
                  : 0}
              </Typography>
              <Typography variant="body2">Total Journeys Ended</Typography>
              <Typography variant="h5">
                {stationDetails?.total_return ? stationDetails.total_return : 0}
              </Typography>
              <Typography variant="body2">
                Average Departure Distance
              </Typography>
              <Typography variant="h5">
                {stationDetails?.avg_departure_distance
                  ? `${(stationDetails.avg_departure_distance / 1000)
                      .toFixed(2)
                      .toString()}km`
                  : '0km'}
              </Typography>
              <Typography variant="body2">Average Return Distance</Typography>
              <Typography variant="h5">
                {stationDetails?.avg_return_distance
                  ? `${(stationDetails.avg_return_distance / 1000)
                      .toFixed(2)
                      .toString()}km`
                  : '0km'}
              </Typography>
            </Box>
            <Box sx={{ marginRight: '1rem' }}>
              <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                Popular Return Station
              </Typography>
              {stationDetails?.popular_return_station.map((station, i) => {
                return (
                  <Typography variant="body1" key={station.return_station_id}>
                    {`${i + 1}. ${station.return_station_name}`}
                  </Typography>
                );
              })}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                Popular Departure Station
              </Typography>
              {stationDetails?.popular_departure_stations.map((station, i) => {
                return (
                  <Typography
                    variant="body1"
                    key={station.departure_station_id}
                  >
                    {`${i + 1}. ${station.departure_station_name}`}
                  </Typography>
                );
              })}
            </Box>
            {showDelete && (
              <Button
                onClick={() => {
                  if (stationDetails?.details.id && userDetails) {
                    mutate(
                      {
                        stationId: stationDetails?.details.id.toString(),
                        authToken: userDetails.token,
                      },
                      {
                        onSuccess: () => {
                          setIsDeleted(true);
                          queryClient.invalidateQueries({
                            queryKey: ['stations'],
                          });
                        },
                      }
                    );
                  }
                }}
                disabled={isLoading || isDeleted}
                endIcon={
                  isLoading ? (
                    <CircularProgress size="20px" color="inherit" />
                  ) : undefined
                }
                variant={isDeleted ? 'outlined' : 'contained'}
                color="error"
                sx={{ position: 'absolute', top: '15px', right: '15px' }}
              >
                {isDeleted ? 'station deleted' : 'delete station'}
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            minWidth: '10rem',
            minHeight: '10rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ':focus': {
              outline: 'none',
            },
            ':active': {
              outline: 'none',
            },
          }}
        >
          <CircularProgress />
        </Card>
      )}
    </Modal>
  );
}

export default SingleStationModal;
