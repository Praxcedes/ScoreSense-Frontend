import { useForm } from "react-hook-form";
import { requestPasswordReset } from "../services/authApi";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email }) => {
    await requestPasswordReset(email);
    alert("Password reset email sent.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <h2 className="mb-4 font-bold">Forgot Password</h2>
      <input {...register("email")} className="w-full p-2 border" />
      <button className="mt-3 bg-black text-white p-2 w-full">Send</button>
    </form>
  );
}
