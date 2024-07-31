import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json({
        users
    })
});

export default router;
