import { createUserResponse, sendOtpResponse, signInResponse, type forgotPasswordResponse, type restorePasswordResponse } from "../../../shared/types/auth.types";
export const authService = {


    create: async (name: string, email: string, password: string, phone: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/signup', {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: name,
                email,
                password,
                phone
            })
        })



        const data = await res.json() as createUserResponse
        return data
    }
    ,
    sendOtp: async (otp: string, session: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/validateotp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otp,
                session
            })
        })

        const data = await res.json() as sendOtpResponse
        return data
    }
    ,
    valiadatEmail: async (email: string, password: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json() as signInResponse
        return data
    }
    ,
    forgetPassword: async (email: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/forgotpassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            })
        })

        const data = await res.json() as forgotPasswordResponse
        return data
    }
    ,
    restorePassword: async (password: string, confirmPassword: string, session: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/restorepassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                confirmPassword,
                session
            })
        })

        const data = await res.json() as restorePasswordResponse
        return data
    }
}

