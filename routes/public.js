import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    const { username , password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const userDB = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
    })

    res.status(201).json(userDB)
})

export default router;
