import z from "zod";

export const workspaceSchema = z.object({
    title : z.string().min(3, 'Title must be at least two characters'),
    description : z.string().optional()
})

export type WorkspaceInput = z.infer<typeof workspaceSchema>