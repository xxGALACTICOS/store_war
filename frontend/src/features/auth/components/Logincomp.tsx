import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logincomp() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  // regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    toast.success("Login successful");

    console.log("Email:", email);
    console.log("Password:", password);

    navigate("/home");
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-[80%] h-[80vh] flex flex-col gap-[15px] border border-[#0c232f] p-[40px] rounded-[10px] bg-second text-white relative shadow-[0px_25px_60px_rgba(14,18,39,0.62)]"
      >

        <h1 className="mb-[10px] text-[50px] text-center">
          Sign In
        </h1>

        {/* Email */}
        <label className="text-[14px] text-[#9ca3af]">
          Email :
        </label>

        <input
          type="text"
          className="p-[12px] rounded-[5px] border border-[#1b3a46] outline-none bg-main text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="mt-[10px] text-[14px] text-[#9ca3af]">
          Password :
        </label>

        <input
          type={showPassword ? "text" : "password"}
          className="p-[12px] rounded-[5px] border border-[#1b3a46] outline-none bg-main text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between text-[14px]">

          <label>
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show password
          </label>

          <span className="text-[#4fa3ff] cursor-pointer">
            Forgot password?
          </span>

        </div>

        <button
          type="submit"
          className="p-[12px] border-none rounded-[5px] text-white text-[16px] cursor-pointer bg-[#0e2533] transition-all duration-200 hover:bg-[#143446] hover:scale-[1.03] active:scale-[0.95]"      >
          Sign In
        </button>

        {/* Bottom Section */}
        <div className="mt-auto text-center text-[13px] text-[#9ca3af]">

          <p>
            Don't have an account yet?
            <span
              className="text-[#2bb0ff] cursor-pointer ml-1"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </p>

          <p className="mt-[10px]">
            By signing up, you acknowledge that you agree to our
            <span className="text-[#2bb0ff] cursor-pointer ml-1">
              Cloud Terms of Service
            </span>
            {" "}and{" "}
            <span className="text-[#2bb0ff] cursor-pointer">
              Privacy Policy
            </span>.
          </p>

        </div>

      </form>

      <ToastContainer position="top-right" />

    </>
  );
}

export default Logincomp;