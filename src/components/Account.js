import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase";
import { useAuth } from "contexts/Auth";
import { BothFlex, Label, RedBtn } from "styles/etcStyles";

export function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const { user } = useAuth();

  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
      return history.push("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BothFlex
      className="form-widget"
      style={{ marginTop: "5rem", height: "100%" }}
    >
      <div>
        <Label htmlFor="email">이메일</Label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <Label htmlFor="username">닉네임</Label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <RedBtn
          style={{ width: "100%" }}
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? "잠시 기다려주세요" : "업데이트"}
        </RedBtn>
      </div>
    </BothFlex>
  );
}
