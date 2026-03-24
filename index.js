import express from "express"
import { PORT, SECRET } from "./src/config/config.js"
import productRoute from "./src/routes/productRoute.js"
import categoryRoute from "./src/routes/categoryRoute.js"
import userRoute from "./src/routes/userRoute.js"
import cors from 'cors'
import { connectDB } from "./src/config/db.js"
const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(express.json())

app.use(express.urlencoded({extended: true}))
// Rutas
// Agrupador de rutas de productos
app.use("/api/product", productRoute)
app.use("/api/category", categoryRoute)
app.use("/api/user", userRoute)

// Conectar a la DB sin bloquear el servidor
connectDB().catch(err => {
    console.error("La aplicación seguirá funcionando sin conexión a la DB")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
}) 

export default app