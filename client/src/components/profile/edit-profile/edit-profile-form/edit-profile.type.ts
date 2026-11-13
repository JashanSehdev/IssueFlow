import z from "zod";

export const  profileSchema = z.object({
    first_name : z.string(),
    last_name : z.string(),
    age : z.coerce.number().int("Age must be a whole number").min(10, 'age should be at least 10 years').max(100, 'age should not be greateer that 100')
})

export type ProfileInput = z.input<typeof profileSchema> 
export type ProfileOutput = z.output<typeof  profileSchema>