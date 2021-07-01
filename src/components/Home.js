import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "contexts/Auth";
import { Account } from "components/Account";
import { Todolist } from "components/Todolist";
import { supabase } from "supabase";
import { NavBar, WhiteBtn, LeftZero, RightZero } from "styles/etcStyles";

export function Home() {
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
    history.push("/login");
  }

  return (
    <div>
      <NavBar>
        <div style={{ paddingLeft: "1rem" }}>환영합니다, 님😎</div>
        <div>
          <WhiteBtn onClick={handleSignOut}>로그아웃</WhiteBtn>
        </div>
      </NavBar>

      <div>
        {user.id ? (
          <Todolist />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </div>
  );
}
