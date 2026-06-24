import AppNavigation from './src/navigation/AppNavigation';
import { TaskProvider } from './src/context/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <AppNavigation />
    </TaskProvider>
  );
}