import { useState, useEffect } from "react";
import { BlueBtn, DelBtn } from "styles/etcStyles";
import { supabase } from "supabase";

export function Todolist({ session }) {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({ idx: 0, ing: "false" });

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

      let { error } = await supabase.from("todolist").insert(adds, {
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

  async function DeleteTodoList(idx) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from("todolist")
        .delete()
        .match({ id: idx });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id) => {
    setEditMode({ idx: id, ing: true });
    console.log("editMode : ", editMode);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddTodolist(userInput);
    setUserInput("");
  };

  useEffect(() => {
    getTodolist();
  }, [session]);

  console.log("!!");

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
                  {item.id} : {item.content}
                  {item.date}
                  {!editMode.ing ? (
                    <>
                      <button type="button">완료</button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(item.id);
                        }}
                      >
                        수정
                      </button>
                      <DelBtn
                        onClick={(e) => {
                          e.preventDefault();
                          DeleteTodoList(item.id);
                        }}
                      >
                        X
                      </DelBtn>
                    </>
                  )}
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
