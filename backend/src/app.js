import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app= express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"32kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes
import userRouter from './routes/user.routes.js'
import medRouter from "./routes/med.routes.js";


//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/medicines",medRouter)


export { app }






// certain CORS requests are considered 'complex' amnd require an initial OPTIONS request ( called the pre-flight request ) . an example of a complex CORS request is one that uses an HTTP verb other than GET/HEAD/POST ( such as DELETE ) or that uses custom headers .
// cookie-parser -> parse cookie header and populate req.cookies with an object keyed by the cookie names . optionally you may enable signed cookie support by passing a secret string , which assigns req.secret so it may be used by other middleware 
