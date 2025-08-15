import { useForm } from "react-hook-form";
import { useAuth } from "../../state/AuthContext";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const { reset } = useAuth();
  const onSubmit = async (data) => {
    await reset(data.email); 
    Swal.fire({
      icon: "success",
      title: "Password reset email sent (if the email exists).",
      text: err.message,
    });
  };
  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <button className="btn bg-blue-600 text-white w-full">
          Send reset link
        </button>
      </form>
    </div>
  );
}
