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

  return (
    <div>
      <p>Welcome, {user?.id}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
