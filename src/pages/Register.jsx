import AuthForm from "../components/AuthForm";
import { registerUser } from "../services/authApi";

export default function Register() {
  const handleRegister = async (data) => {
    await registerUser(data);
    alert("Registration successful. Check your email.");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
