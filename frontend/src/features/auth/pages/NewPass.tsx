import { TopBar } from '@/features/common/components/TopBar';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const NewPass = () => {
    const [newpassword, setnewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const navigate = useNavigate()
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!passwordRegex.test(newpassword)) {
            toast.error("Password must be at least 8 characters and contain a number")
            return
        }

        if (newpassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        toast.success("Your password changed successfully")
        navigate('/login')
    }
    return (
        <div className="h-screen overflow-hidden bg-main">
            <TopBar />
            <div className="w-full h-full flex items-center  justify-center ">

                <form
                    onSubmit={handleSubmit}
                    className="w-150 h-125 bg-gray-200 rounded-lg shadow-xl flex flex-col"
                >
                    <p className="flex items-center justify-center w-13 h-13 rounded-full bg-second text-5xl text-white mt-5 ml-70">3</p>
                    <div className="w-110  ml-15 mt-7 ">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-3">Change Your Password</h1>
                        <p className="text-gray-700 mb-5">Enter your new password below to change your password</p>
                    </div>
                    <div className="w-fit  ml-15">
                        <label className="block mb-2 text-lg font-medium text-black">
                            New password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={newpassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            className="bg-gray-300 focus:outline-none w-110 h-12 rounded-lg pl-8 mb-3 "
                            required
                        />
                        <label className="block mb-2 text-lg font-medium text-black">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-300 focus:outline-none w-110 h-12 rounded-lg pl-8"
                            required
                        />
                    </div>
                    <div className="mt-auto mb-10  ml-58">
                        <button
                            type='submit'
                            className='rounded-md w-40 h-10 text-white bg-second cursor-pointer'
                        >
                            Update Password
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}
export default NewPass