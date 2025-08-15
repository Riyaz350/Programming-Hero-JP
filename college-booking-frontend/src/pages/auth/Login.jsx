import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      nav(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      nav(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      nav(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "GitHub Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            {...register("email", { required: true })}
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            {...register("password", { required: true })}
          />
        </div>

        <button className="btn bg-blue-600 text-white w-full">Login</button>
      </form>

      <div className="flex flex-col gap-2 mt-4">
        <button
          type="button"
          className="btn bg-red-500 text-white w-full"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        <button
          type="button"
          className="btn bg-gray-800 text-white w-full"
          onClick={handleGithubLogin}
        >
          Continue with GitHub
        </button>
      </div>

      <div className="text-sm text-center mt-2">
        <Link to="/reset" className="text-blue-600">
          Forgot password?
        </Link>
      </div>

      <p className="text-sm text-center">
        No account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}
