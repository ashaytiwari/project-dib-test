import { RouterProvider } from 'react-router-dom';
import styles from './App.module.scss';
import routes from './routes/routes';

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
