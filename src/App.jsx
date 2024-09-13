import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Notfound from './components/Notfound/Notfound';
import { ToastContainer } from 'react-toastify';
import Quiz from './components/Quiz/quiz'; 

function App() {
  const router = createBrowserRouter([
    {
      path: '', 
      element: <Layout />, 
      children: [
        { index: true, element: <Home /> }, 
        { path: 'quiz', element: <Quiz /> }, 
        { path: '*', element: <Notfound /> }, 
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
