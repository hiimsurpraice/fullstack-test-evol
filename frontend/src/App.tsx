import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { fetchTasks } from './features/tasks/tasksSlice';
import Layout from './components/common/Layout';
import TasksPage from './pages/TasksPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;