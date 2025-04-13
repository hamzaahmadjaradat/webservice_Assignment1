import express from 'express';
import cors from 'cors';
import quoteRoutes from './routes/quoteRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adviceRoutes from './routes/adviceRoutes.js';
import jokeRoutes from './routes/jokeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', quoteRoutes);
app.use('/api', userRoutes);
app.use('/api', adviceRoutes);
app.use('/api', jokeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
