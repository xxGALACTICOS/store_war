export const authService = {
    sendEmail: async (email: string) => {
        const res = await fetch('http://localhost:6969/api/v1/auth/forgotpassword', {
            method: "POST",
            body: JSON.stringify({
                email,
            })
        })

        const data = await res.json()
        return data
    }
}
