import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './shared/error-apge/ErrorPage';
import MovieDetailsWrapper from './components/movie-details-wrapper/MovieDetailsWrapper';
import AddMovieForm from './components/add-movie-form/AddMovieForm';
import EditMovieForm from './components/edit-movie-form/EditMovieForm';
import SearchForm from './components/search-form/SearchForm';

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SearchForm />,
      },
      {
        path: "new",
        element: <SearchForm />,
        children: [
          {
            index: true,
            element: <AddMovieForm />,
          },
        ],
      },
        {
          path: "movies/:movieId",
          element: <MovieDetailsWrapper />,
        },
        {
          path: "movies/:movieId/edit",
          element: <EditMovieForm />,
        },
    ],
  },
  {
    path: "*",
    loader: () => redirect('/'),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 