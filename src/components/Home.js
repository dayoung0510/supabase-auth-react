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

  useEffect(() => {
    getProfile();
  }, [session]);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <NavBar>
        <div style={{ paddingLeft: "1rem" }}>
          😎 {username} | {user.email}
        </div>
        <div>
          <WhiteBtn onClick={handleSignOut}>로그아웃</WhiteBtn>
        </div>
      </NavBar>

      <div>
        {username ? <Todolist /> : <Account key={user.id} session={session} />}
      </div>
    </div>
  );
}
