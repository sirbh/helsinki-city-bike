import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Journeys from '../components/journeys';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Journeys />,
      },
    ],
  },
]);
export default router;
