import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { newMessages } from '../slices/messagesSlice';
import { newChannels, setCurrentChannelId } from '../slices/channelsSlice';
import Channels from './Channels';
import Messages from './Messages';
import ModalWindow from './ModalWindow';
import { useAuth } from '../hooks';

const Chat = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.getToken();
        const authHeader = { Authorization: `Bearer ${token}` };
        const response = await axios.get(routes.dataPath(), { headers: authHeader });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(newChannels(channels));
        dispatch(newMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch (error) {
        if (error.response?.status === 401) {
          auth.handleLogout();
        } else if (axios.isAxiosError(error)) {
          toast.error(t('errors.network'));
          auth.handleLogout();
        } else {
          toast.error(t('errors.unknown'));
        }
      }
    };
    fetchData();
  }, [dispatch, auth, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <ModalWindow />
      </div>
    </div>
  );
};

export default Chat;
