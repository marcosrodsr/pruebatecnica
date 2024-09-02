import '../styles/globals.css';
import { GlobalStateProvider } from '../context/GlobalState';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
