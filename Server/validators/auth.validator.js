import z, { email } from "zod";

export const registerSchema = z.object({

    userName: z.string(),
    email: z.email().lowercase(),
    password: z.string().min(6),
})



export const loginSchema = z.object({

    email: z.email().lowercase(),
    password: z.string().min(6),

})

export const validateBusiness = z.object({
    name : z.string(),
    description : z.string(),
    address : z.string(),
})
