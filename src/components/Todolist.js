import { useState, useEffect } from "react";
import { BlueBtn, DelBtn } from "styles/etcStyles";
import { supabase } from "supabase";

export function Todolist({ session }) {
  const [loading, setLoading] = useState(true);

  //todolist 기능
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  async function getTodolist() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("todolist")
        .select(`content, id, date`)
        .eq("uid", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTodoList(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function AddTodolist(content) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const adds = {
        uid: user.id,
        content,
        date: new Date(),
      };

      let { error } = await supabase.from("todolist").upsert(adds, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setTodoList([userInput, ...todoList]);
    AddTodolist(userInput);
    setUserInput("");
  };

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) !== todoList.indexOf(todo)
    );
    setTodoList(updatedArr);
  };

  useEffect(() => {
    getTodolist();
  }, [session, todoList]);

  return (
    <div style={{ padding: "2rem" }}>
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
        {todoList.length >= 1 ? (
          <div>
            {todoList.map((item, idx) => {
              return (
                <li key={idx}>
                  {item.content}
                  <DelBtn
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(idx);
                    }}
                  >
                    X
                  </DelBtn>
                </li>
              );
            })}
          </div>
        ) : (
          "항목이 없습니다."
        )}
      </ul>
    </div>
  );
}
