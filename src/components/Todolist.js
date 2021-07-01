import { useState } from "react";
import styled from "styled-components";
import { BlueBtn, DelBtn } from "styles/etcStyles";

const Div = styled.div`
  padding: 2rem;
`;

export function Todolist() {
  //todolist 기능
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
    console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([userInput, ...todoList]);
    setUserInput("");
  };

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) !== todoList.indexOf(todo)
    );
    setTodoList(updatedArr);
  };

  return (
    <Div>
      <div>
        <form>
          <input
            className="col-6"
            value={userInput}
            type="text"
            onChange={handleChange}
          />
          <BlueBtn onClick={handleSubmit}>확인</BlueBtn>
        </form>
        <ul>
          {todoList.length >= 1
            ? todoList.map((todo, idx) => {
                return (
                  <li key={idx}>
                    {todo}
                    <DelBtn
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(todo);
                      }}
                    >
                      X
                    </DelBtn>
                  </li>
                );
              })
            : "입력된 항목이 없습니다."}
        </ul>
      </div>
    </Div>
  );
}
