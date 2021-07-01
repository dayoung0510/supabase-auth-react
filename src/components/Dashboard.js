import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from 'contexts/Auth';
import { Account } from 'components/Account';
import { Todolist } from 'components/Todolist';
import { supabase } from 'supabase';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const [session, setSession] = useState(null);

  // 세션 받아옴
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // 로그아웃
  async function handleSignOut() {
    await signOut();
    history.push('/login');
  }

  return (
    <div>
      <div>
        <button type='button' onClick={handleSignOut}>
          로그아웃
        </button>
      </div>

      <div style={{ marginTop: '5rem' }}>
        {user.id ? (
          <Todolist />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </div>
  );
}
