import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init';

const app = async () => {
  const root = createRoot(document.getElementById('root'));
  const vdom = await init();

  root.render(
    <StrictMode>
      {vdom}
    </StrictMode>,
  );
};

app();
