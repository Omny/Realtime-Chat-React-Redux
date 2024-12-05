import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import MessageForm from './MessageForm';
import { useAuth } from '../hooks';

const Messages = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);
  const auth = useAuth();
  const currentUser = auth.getUsername();

  const messagesBoxRef = useRef(null);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTo({
        top: messagesBoxRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [messages]);

  return (
    <div className="col p-0 d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {currentChannel && currentChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {t('messages.messages')}
          {': '}
          {currentMessages && currentMessages.length}
        </span>
      </div>
      <div id="messages-box" ref={messagesBoxRef} className="chat-messages overflow-auto px-5 ">
        {currentMessages && currentMessages
          .map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              {(currentUser === username) ? <b className="text-primary">{username}</b> : <b>{username}</b>}
              {': '}
              {body}
            </div>
          ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
