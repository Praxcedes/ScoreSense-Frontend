import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../services/authApi";

export default function ResetPassword() {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ password }) => {
    await resetPassword(token, password);
    alert("Password reset successful");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10">
      <input
        type="password"
        {...register("password")}
        className="w-full p-2 border"
      />
      <button className="mt-3 bg-black text-white p-2 w-full">
        Reset Password
      </button>
    </form>
  );
}
