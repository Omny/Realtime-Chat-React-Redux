import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Plus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { openModal } from '../slices/modalSlice';
import Channel from './Channel';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleShowAddChannelModal = () => {
    dispatch(openModal({ modalType: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button type="button" onClick={handleShowAddChannelModal} variant="outline-secondary" className="p-0 btn-group-vertical">
          <Plus size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <li className="nav-item w-100">
          {channels.map(({ id, name, removable }) => (
            <Channel
              key={id}
              id={id}
              name={name}
              removable={removable}
            />
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Channels;
