import { useContext } from 'react';
import { ApiContext, AuthContext } from '../contexts';

const useAuth = () => useContext(AuthContext);

const useApi = () => useContext(ApiContext);

export { useAuth, useApi };
