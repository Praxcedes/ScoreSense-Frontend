import { useForm } from "react-hook-form";

export default function AuthForm({ fields, onSubmit, loading, buttonText }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1">{field.label}</label>
          <input
            type={field.type}
            {...register(field.name, { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      ))}

      <button
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded"
      >
        {loading ? "Processing..." : buttonText}
      </button>
    </form>
  );
}
