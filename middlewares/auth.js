import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization 
    
    if (!token) {
        res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        req.user = decoded.id;
        console.log(decoded)
        
    } catch (err) {
        res.status(401).json({
            message: "Invalid Token",
            sucess: false
        });
    }
    next();
}


export default jwtMiddleware;