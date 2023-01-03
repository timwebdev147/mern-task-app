import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../src/assets/logo-no-background.png'
import './App.css';
import TaskList from './components/TaskList';

export const url = process.env.REACT_APP_SERVER_API;

function App() {
  return (
    <div className="app">
      <div className='logo-container'>
        <img src={logo} />
      </div>
      <div className='task-container'>
        <TaskList/>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default App;
