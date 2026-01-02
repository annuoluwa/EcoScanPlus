import { ThemeProvider } from '../components/ThemeContext';
import RootLayout from './_layout';

export default function App() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
