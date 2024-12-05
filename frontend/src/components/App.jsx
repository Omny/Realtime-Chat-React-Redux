import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import AuthProvider from '../contexts/AuthProvider';
import { newMessage } from '../slices/messagesSlice';
import { newChannel, removeChannel, renameChannel } from '../slices/channelsSlice';
import routes from '../routes';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import Chat from './Chat';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import ErrorDisplay from './ErrorDisplay';
import { useApi } from '../hooks';

const App = () => {
  const dispatch = useDispatch();
  const socketApi = useApi();

  useEffect(() => {
    socketApi.subscribe('newMessage', (payload) => { dispatch(newMessage(payload)); });
    socketApi.subscribe('newChannel', (payload) => { dispatch(newChannel(payload)); });
    socketApi.subscribe('removeChannel', (payload) => { dispatch(removeChannel(payload.id)); });
    socketApi.subscribe('renameChannel', (payload) => { dispatch(renameChannel(payload)); });
  }, [socketApi, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <ErrorBoundary fallbackUI={ErrorDisplay}>
        <Router>
          <AuthProvider>
            <Nav />
            <Routes>
              <Route path={routes.loginPagePath()} element={<Login />} />
              <Route path={routes.signupPagePath()} element={<Signup />} />
              <Route
                path={routes.homePagePath()}
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
