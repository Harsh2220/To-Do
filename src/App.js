import './App.css';
import Todo from './Todo';
import SignIn from './SignIn';
import { useStatevalue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStatevalue();

  return (
    <div className="App">
      {user ? <Todo /> : <SignIn />}
    </div>
  );
}

export default App;