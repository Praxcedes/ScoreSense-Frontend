import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import appLogo from "../assets/ScoreSense Logo.png";

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
          <img src={appLogo} alt="ScoreSense logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="mt-3 text-xl font-bold text-white">ScoreSense</h1>
      </div>
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
