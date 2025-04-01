import { PrismaClient } from '@prisma/client';
import { User } from "../model/user";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser(user: User) {
    // Validate user data
    if (!user.username || !user.password) {
        throw new Error("Username and password are required");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { username: user.username },
    });

    if (existingUser) {
        throw new Error("Username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create user
    const addedUser = await prisma.user.create({
        data: {
            username: user.username,
            password: hashedPassword,
        },
        select: {
            id: true,
            username: true,
            // Don't return the password
        }
    });

    console.log("User created:", addedUser);
    return addedUser;
}

export async function verifyUserCredentials(verifyUser: User) {
    // Validate user data
    if (!verifyUser.username || !verifyUser.password) {
        throw new Error("Username and password are required");
    }

    const user = await prisma.user.findUnique({
        where: { username: verifyUser.username },
    });

    if (!user) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, user.password);
}