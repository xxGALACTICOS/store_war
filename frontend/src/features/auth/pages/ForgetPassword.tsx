import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { TopBar } from "../../common/components/TopBar"
import { toast } from "react-toastify"
import { authService } from "@/services/auth.service"

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      return
    }

    const res = await authService.forgetPassword(email)

    if (!res.ok) {
      toast.error(res.message)
      return
    }

    toast.success('OTP has been sent')
    navigate(`/otp/${res.session}`)

  }

  return (
    <div className="h-screen overflow-hidden bg-main">
      <TopBar />
      <div className="w-full h-full flex items-center justify-center ">



        <form
          onSubmit={handleSubmit}
          className="w-150 h-125 bg-gray-200 rounded-lg shadow-xl flex flex-col "
        >
          <p className="flex items-center justify-center w-13 h-13 rounded-full bg-second text-5xl text-white mt-5 ml-70">1</p>
          <div className="w-110  ml-15 mt-7">
            <h1 className="text-3xl font-semibold text-gray-800 mb-3">Forgot your password</h1>
            <p className="text-gray-600">Please enter the email address you'd like your password reset information sent to</p>
          </div>
          <div className="w-fit mt-12  ml-15  relative">
            <label className="block mb-2 text-lg font-medium text-black">
              Email address
            </label>
            <EnvelopeIcon className="absolute size-5 mt-4 ml-2 text-gray-500"></EnvelopeIcon>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-300 focus:outline-none w-110 h-12 rounded-lg pl-8"
              required
            />
          </div>
          <div className="mt-auto mb-15  ml-58">
            <button
              type="submit"
              disabled={!email}
              className={`rounded-md w-40 h-10 text-white 
              ${email
                  ? "bg-second cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Request OTP
            </button>
          </div>

        </form>


      </div>
    </div>
  )
}

export default ForgetPassword
