import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (existingUser) {
        res.status(400).json({
            sucess: false,
            message: "User already taken"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
            username: username,
            password: hashedPassword,
            },
        });
    
        res.status(201).send("User sucessfully created");
    } catch (error) {
        console.log(error)
    }
    
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        return res.status(401).json({message: "User not found"})
    };

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        
        //req.headers.authorization = `Bearer ${token}`;
        
        res.status(200).json({
            sucess: true,
            token: token
        })

    } else {
        res.status(400).json({
            message: "Incorrect Password",
            sucess: false
        })
    }
});

export default router;
