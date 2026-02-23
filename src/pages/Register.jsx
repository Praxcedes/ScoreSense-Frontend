import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/authApi";
import appLogo from "../assets/ScoreSense Logo.png";

export default function Register() {
  const handleRegister = async (data) => {
    await registerUser(data);
    alert("Registration successful. Check your email.");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
          <img src={appLogo} alt="ScoreSense logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="mt-3 text-xl font-bold text-white">ScoreSense</h1>
      </div>
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <AuthForm
        buttonText="Register"
        onSubmit={handleRegister}
        fields={[
          { name: "username", label: "Username", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
      />
    </div>
  );
}
