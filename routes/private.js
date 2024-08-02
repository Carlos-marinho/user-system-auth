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

    await prisma.user.delete({
        where: {
            id: userID
        }
    });

    res.status(200).send("Usuário deletado com sucesso.")
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

    res.status(200).send("Usuário atualizado com sucesso.")
});

export default router;
