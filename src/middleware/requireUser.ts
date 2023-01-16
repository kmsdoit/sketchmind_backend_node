import { NextFunction, Request, Response } from 'express';
import IndexError from '../utils/indexError';

export const requireUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        if (!user) {
            return next(
                new IndexError(400, `Session has expired or user doesn't exist`)
            );
        }

        next();
    } catch (err: any) {
        next(err);
    }
};
