import morgan from "morgan";
require('dotenv').config();
import express, {NextFunction, Response, Request} from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import redisClient from './utils/connectRedis';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import IndexError from "./utils/indexError";


AppDataSource.initialize()
    .then(async () => {
        // VALIDATE ENV
        validateEnv();

        const app = express();

        //TEMPLATE ENGINE
        app.set('view engine', 'pug')
        app.set('views', `${__dirname}/views`)

        // MIDDLEWARE

        // 1. Body parser
        app.use(express.json({ limit: '10kb' }));

        // 2. Logger
        if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));


        // 3. Cookie Parser
        app.use(cookieParser());

        // 4. Cors
        app.use(
            cors({
                origin: config.get<string>('origin'),
                credentials: true,
            })
        );

        // ROUTES
        app.use('/api/auth', authRoutes)
        app.use('/api/users', userRoutes)

        // HEALTH CHECKER
        app.get('/api/healthchecker', async (_, res: Response) => {
            const message = await redisClient.get('try');
            res.status(200).json({
                status: 'success',
                message,
            });
        });

        // UNHANDLED ROUTE

        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new IndexError(404, `Route ${req.originalUrl} not found`));
        });

        // GLOBAL ERROR HANDLER

        app.use(
            (error: IndexError, req: Request, res: Response, next: NextFunction) => {
                error.status = error.status || 'error';
                error.statusCode = error.statusCode || 500;

                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
        );

        const port = config.get<number>('port');
        app.listen(port);

        console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));
