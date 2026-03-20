import React, { useState, useRef } from "react";
import { TopBar } from '../../common/components/TopBar'
import { useNavigate, useParams } from "react-router-dom"
import { authService } from "@/services/auth.service";
import { toast } from "react-toastify";

export const Otp = () => {
    const [otpin, setOtpin] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate()
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return; // numbers only

        const newOtp = [...otpin];
        newOtp[index] = value;
        setOtpin(newOtp);
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const { session } = useParams()


    const isOTPComplete = otpin.every((digit) => digit !== "");
    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isOTPComplete) {
            const res = await authService.sendOtp(otpin.join(""), session!)
            if (res.ok) {
                if (res.forgotPassword) {
                    setTimeout(() => {
                        navigate("/newpassword/" + res.session)

                    }, 1500)
                    toast.success(res.message)
                } else {
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500)
                    toast.success(res.message)

                }
                return
            }

            toast.error(res.message)

        }
    };



    return (
        <div className="h-screen overflow-hidden bg-main">
            <TopBar />
            <div className="w-full h-full flex items-center  justify-center ">

                <form
                    onSubmit={handleVerify}
                    className="w-150 h-125 bg-gray-200 rounded-lg shadow-xl flex flex-col"
                >
                    <p className="flex items-center justify-center w-13 h-13 rounded-full bg-second text-5xl text-white mt-5 ml-70">2</p>
                    <div className="w-110  ml-20 mt-8 flex flex-col items-center">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-3">OTP Verification</h1>
                        <p className="text-gray-700 mb-7">We have sent the verification code to your email address</p>
                        <p className='text-gray-500'>Please enter the code below to verify it.</p>
                    </div>
                    <div className="w-fit mt-12  ml-24 flex gap-3 ">
                        {otpin.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                ref={(el) => {
                                    if (el) inputsRef.current[index] = el;
                                }}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className="w-15 h-18 text-center shadow-lg text-xl border-2 border-[#0b3a44]  rounded-lg"
                            />
                        ))}
                    </div>
                    <div className="mt-auto mb-15  ml-58">
                        <button
                            type='submit'
                            disabled={!isOTPComplete}
                            className={`rounded-md w-40 h-10 text-white 
                                    ${isOTPComplete
                                    ? "bg-second cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            Verify OTP
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}
