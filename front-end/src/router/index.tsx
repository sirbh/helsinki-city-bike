import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Journeys from '../components/journeys';
import Stations from '../components/stations';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Journeys />,
      },
      {
        path: '/stations',
        element: <Stations />,
      },
    ],
  },
]);
export default router;
