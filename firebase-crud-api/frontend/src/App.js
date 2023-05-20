import './App.css';
import AddBook from './components/addbooks';
import EditBook from './components/editbook';
import ListBooks from './components/listbooks';

function App() {
  return (
    <div className="App">
      <ListBooks />
      <AddBook />
      <EditBook />
    </div>
  );
}

export default App;
