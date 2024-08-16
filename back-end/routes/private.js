import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json({
        users: users
    })
});


router.delete('/users/:id', async (req, res) => {
    const userID = req.params.id;

    try {
        await prisma.user.delete({
            where: {
                id: userID
            }
        });
    
        res.status(200).send("User deleted")
    } catch (error) {
        res.sendStatus(401)
        console.log(error)
    }
});

router.put('/users', async (req, res) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    await prisma.user.update({
        where: {
            username: userData.username
        },
        data: {
            password: hashedPassword
        }
    });

    res.status(200).send("User updated")
});

export default router;
