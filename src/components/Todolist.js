import { useState, useEffect } from 'react';
import { BlueBtn, DelBtn } from 'styles/etcStyles';
import { supabase } from 'supabase';

export function Todolist({ session }) {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({ idx: 0, ing: false });
  const [editInput, setEditInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [todoList, setTodoList] = useState([]);

  async function getTodolist() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('todolist')
        .select(`content, id, date`)
        .eq('uid', user.id)
        .order('id', { ascending: true });

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

  const handleDelete = async (id) => {
    // db로 뭐 삭제할지 보냄
    try {
      setLoading(true);
      const { error } = await supabase
        .from('todolist')
        .delete()
        .match({ id: id });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

    // 화면에서 삭제해줌
    const updatedArr = todoList.filter((i) => {
      return i.id !== todoList.find((item) => item.id === id).id;
    });
    setTodoList(updatedArr);
  };

  const handleEdit = (id) => {
    setEditMode({ idx: id, ing: true });
  };

  const handleSubmitEdit = async (id) => {
    // 수정 입력한거 db로 보냄
    try {
      setLoading(true);
      const content = editInput;
      const { error } = await supabase
        .from('todolist')
        .update({ content: content })
        .match({ id: id });

      if (error) {
        throw error;
      }

      // 방금 입력한거 화면에 수정해줌
      todoList.find((i) => {
        if (i.id === id) {
          i.content = editInput;
        }
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    setEditInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 방금 입력한거 db로 보냄
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const content = userInput;

      const adds = {
        uid: user.id,
        content,
        date: new Date(),
      };

      let { error, data } = await supabase
        .from('todolist')
        .insert(adds)
        .single();

      if (error) {
        throw error;
      }

      // 방금 입력한거 화면에 추가해줌
      setTodoList((prev) => {
        return [...prev, { id: data.id, content: userInput }];
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

    setUserInput('');
  };

  useEffect(() => {
    getTodolist();
  }, [session]);

  return (
    <div style={{ padding: '2rem' }}>
      <form>
        <input
          className='col-6'
          value={userInput}
          type='text'
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
                  {item.id}번
                  {editMode.idx === item.id ? (
                    <input
                      defaultValue={item.content}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.content
                  )}
                  {editMode.ing && editMode.idx === item.id ? (
                    <span>
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmitEdit(item.id);
                          setEditMode((prev) => {
                            return { prev, ing: false };
                          });
                        }}
                      >
                        완료
                      </button>
                    </span>
                  ) : (
                    <span>
                      <button
                        type='button'
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
                          handleDelete(item.id);
                        }}
                      >
                        X
                      </DelBtn>
                    </span>
                  )}
                </li>
              );
            })}
          </div>
        ) : (
          '항목이 없습니다.'
        )}
      </ul>
    </div>
  );
}
