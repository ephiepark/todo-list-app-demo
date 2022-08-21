import './App.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (<div>
    <TextField
      id='todo-item-input'
      label='Todo Item'
      variant='outlined'
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <Button variant="outlined" onClick={onSubmit}>Submit</Button>
  </div>);
};

const TodoItem = (props) => {
  return (<li>
    <span>{props.todoItem.todoItemContent}</span>
  </li>);
};

const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem key={todoItem.id} todoItem={todoItem} />;
  });

  return (<div>
    <ul>{todoList}</ul>
  </div>);
};

let todoItemId = 0;

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (newTodoItem) => {
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: newTodoItem,
      isFinished: false,
    }]);
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList todoItemList={todoItemList} />
    </div>
  );
}

export default App;
