import { useState } from 'react';

export function Todolist() {
  //todolist 기능
  const [userInput, setUserInput] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
    console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([userInput, ...todoList]);
    setUserInput('');
  };

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) !== todoList.indexOf(todo)
    );
    setTodoList(updatedArr);
  };

  return (
    <div>
      <div>
        <form>
          <input
            className='col-6'
            value={userInput}
            type='text'
            onChange={handleChange}
          />
          <button type='button' onClick={handleSubmit}>
            확인
          </button>
        </form>
        <ul>
          {todoList.length >= 1
            ? todoList.map((todo, idx) => {
                return (
                  <li key={idx}>
                    {todo}
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(todo);
                      }}
                    >
                      삭제
                    </button>
                  </li>
                );
              })
            : '항목을 입력하시오!'}
        </ul>
      </div>
    </div>
  );
}
