import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

<<<<<<< HEAD
export default function Login() {
  const { login } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <AuthForm
        buttonText="Login"
        onSubmit={login}
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "username", label: "Username", type: "text" },
          { name: "password", label: "Password", type: "password" },
        ]}
      />
    </div>
  );
}
=======
const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface border border-border p-8 rounded-3xl shadow-2xl shadow-green-900/10">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Create Analyst Account</h1>
            <p className="text-muted text-center text-sm mb-8">Analyze matches. Earn virtual points. <span className="text-white font-bold">No real money involved.</span></p>
            
>>>>>>> 2011115 (login)
