import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

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
