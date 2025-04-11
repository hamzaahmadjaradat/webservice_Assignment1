import express from 'express';
import cors from 'cors';
import favoritesRoutes from './routes/favoritesRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adviceRoutes from './routes/adviceRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', favoritesRoutes);
app.use('/api', userRoutes);
app.use('/api', adviceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
