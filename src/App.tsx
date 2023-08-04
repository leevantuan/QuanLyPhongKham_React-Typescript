import Main from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
