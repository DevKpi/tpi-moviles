import AppNavigation from './src/navigation/AppNavigation';
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppNavigation />
      </TaskProvider>
    </ThemeProvider>
  );
}