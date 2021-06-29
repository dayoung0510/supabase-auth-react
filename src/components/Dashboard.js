import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "contexts/Auth";

export function Dashboard() {
  const { user, signOut } = useAuth();
  const history = useHistory();

  async function handleSignOut() {
    await signOut();

    // Redirects the user to Login page
    history.push("/login");
  }

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
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );
    setTodoList(updatedArr);
  };

  return (
    <>
      <div>
        <p>Welcome, {user?.id}!</p>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      <div>
        <form>
          <input
            className="col-6"
            value={userInput}
            type="text"
            onChange={handleChange}
          />
          <button type="button" onClick={handleSubmit}>
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
                      type="button"
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
            : "항목을 입력하시오!"}
        </ul>
      </div>
    </>
  );
}
