import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function SignUp() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (firstName.length < 2) {
      toast.error("First name must be at least 2 characters")
      return
    }

    if (lastName.length < 2) {
      toast.error("Last name must be at least 2 characters")
      return
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email")
      return
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Invalid Egyptian phone number")
      return
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters and contain a number")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    toast.success("Account created successfully")

    navigate("/login")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-main relative">

      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-[10px] w-[540px] h-[90vh] bg-second text-white">

        <h1 className="text-center mb-5 text-2xl font-semibold text-4xl mt-[20px]">
          Sign up
        </h1>

        <br />
        <hr />

        <div className="flex gap-[30px] mt-4">

          <div className="w-[48%]">
            <label htmlFor="fn">first name</label>
            <br />

            <input
              type="text"
              id="fn"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ahmed"
              className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
            />
          </div>

          <div className="w-[48%]">
            <label htmlFor="ln">last name</label>
            <br />

            <input
              type="text"
              id="ln"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="ali"
              className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
            />
          </div>

        </div>

        <div className="flex gap-[30px] mt-[10px]">

          <div className="w-[48%]">
            <label htmlFor="em">email</label>
            <br />

            <input
              type="email"
              id="em"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joe@company.com"
              className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
            />
          </div>

          <div className="w-[48%]">
            <label htmlFor="pn">phone number</label>
            <br />

            <input
              type="text"
              id="pn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01000000000"
              className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
            />
          </div>

        </div>

        <div className="mt-[10px]">
          <label htmlFor="pas">password</label>
          <br />

          <input
            type="password"
            id="pas"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
          />
        </div>

        <div className="mt-[10px]">
          <label htmlFor="cpas">conferm password</label>
          <br />

          <input
            type="password"
            id="cpas"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="h-[38px] w-full bg-[#0c2c3c] border border-[#1f3c4a] rounded-[6px] pl-[10px] text-white mt-[5px]"
          />
        </div>

        <button
          type="submit"
          className="mt-[20px] w-full h-[40px] bg-[#531b1e] border border-red-500 text-white rounded-[6px] cursor-pointer transition-all duration-200 hover:bg-[#ff483a] hover:scale-[1.03] active:scale-[0.95]"      >
          Sign up with email
        </button>

        <p className="text-center text-[12px] mt-[115px] text-[#8aa4b0]">
          By signing up, I am agreeing to the
          <span className="underline"> Redis Insight License Terms</span>
          <br />
          and the
          <span className="underline"> Redis Privacy Policy</span>
        </p>

      </form>

      <ToastContainer position="top-right" />

    </div>
  );
}

export default SignUp;


