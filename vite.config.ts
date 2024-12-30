// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: './server/localhost-key.pem',
//       cert: './server/localhost.pem',
//     },
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173, // Default development server port
  //   host: 'localhost', // Default host
  //   https: false, // HTTPS disabled by default
  // },
  // preview: {
  //   port: 4173, // Default preview server port
  //   host: 'localhost', // Default host
  //   https: false, // HTTPS disabled by default
  // },
});
