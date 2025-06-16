import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
    id: number
    name: string
    email: string
    password: string
}

export function useUserDatabase() {
    const database = useSQLiteContext()


    async function create(data: Omit<UserDatabase, "id">) {
        const statment = await database.prepareAsync(
            "INSERT INTO users (name, email, password) VALUES ($name, $email, $password)"
        )

        try {
            const result = await statment.executeAsync({
                $name: data.name,
                $email: data.email,
                $password: data.password,
            })

        } catch (error: any) {
            if (error.message?.includes("UNIQUE constraint failed: users.email")) {
                throw new Error("Este e-mail já está cadastrado.");
            }
        } finally {
            await statment.finalizeAsync()
        }
    }

    async function findByEmail(email: string): Promise<UserDatabase | null> {
        const query = "SELECT * FROM users WHERE email = $email";

        const user = await database.getFirstAsync<UserDatabase>(query, { $email: email });
        
        return user ?? null;
    }

    return { create, findByEmail }
}