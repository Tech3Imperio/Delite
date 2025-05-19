// schemas/formSchema.ts
import { z } from 'zod';

export const SignInFromSchema = z.object({
    userID: z.string({ required_error: "User ID is required" }).min(1, "User ID cannot be empty"),
    password: z.string({ required_error: "Password is required" }).min(8, "min 8 characters")
})

export type SignInFormType = z.infer<typeof SignInFromSchema>;

export enum Role {
    ADMIN = 'admin',
    DEALER = 'dealer',
    GUEST = 'guest'
}

export type AuthContextType = {
    role: Role;
    loading: boolean;
    signIn: (role: Role) => void
    signOut: () => void
}