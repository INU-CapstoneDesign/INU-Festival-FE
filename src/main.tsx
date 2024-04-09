import 'reflect-metadata';

import ReactDOM from 'react-dom/client';

import App from './App';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function main() {
  const container = document.getElementById('root');
  if (!container) {
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

main();
