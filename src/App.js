import './App.css';

import { TodoTable } from "./components/TodoTable/TodoTable";
import { TableHeader } from "./components/TableHeader/TableHeader";

function App() {
  return (
    <div className="App">
      <TableHeader />
      <TodoTable />
    </div>
  );
}

export default App;
