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
  const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};
  return (<li>
    <span
      style={style}
      onClick={() => props.onTodoItemClick(props.todoItem)}
    >
      {props.todoItem.todoItemContent}
    </span>
    <Button variant="outlined" onClick={() => props.onRemoveClick(props.todoItem)}>Remove</Button>
  </li>);
};

const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem
      key={todoItem.id}
      todoItem={todoItem}
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
    />;
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

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(todoItemList.map((todoItem) => {
      if (clickedTodoItem.id === todoItem.id) {
        return {
          id: clickedTodoItem.id,
          todoItemContent: clickedTodoItem.todoItemContent,
          isFinished: !clickedTodoItem.isFinished,
        };
      } else {
        return todoItem;
      }
    }));
  };

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(todoItemList.filter((todoItem) => {
      return todoItem.id !== removedTodoItem.id;
    }));
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
}

export default App;
