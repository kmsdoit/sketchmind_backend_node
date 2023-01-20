import {CreateProfileInput, DeleteProfileInput, GetProfileInput, UpdateProfileInput} from "../schemas/profile.schema";
import {Response, Request, NextFunction} from "express";
import {createProfile, findProfiles, getProfile} from "../services/profile.service";
import {findUserById} from "../services/user.service";
import IndexError from "../utils/indexError";


export const createProfileHandler = async (
    req: Request<{}, {}, CreateProfileInput>,
    res: Response,
    next : NextFunction
) => {
    try {
        const user = await findUserById(res.locals.user.id as string)

        const profile = await createProfile(req.body, user!)

        res.status(201).json({
            status : 'success',
            data : {
                profile
            }
        });
    }catch(err : any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Profile with that name already exist',
            });
        }
        next(err);
    }
}

export const getProfileHandler = async (
    req : Request<GetProfileInput>,
    res : Response,
    next : NextFunction
) => {
    try {
        const profile = await getProfile(req.params.profileId)

        if (!profile) {
            return next(new IndexError(404, 'Profile with that ID not found'))
        }

        res.status(200).json({
            status : 'success',
            data : {
                profile
            }
        })
    }catch(err : any) {
        next(err)
    }


}

export const getAllProfileHandler = async (
    req: Request,
    res : Response,
    next: NextFunction
) => {
    try {
        const profiles = await findProfiles({}, {}, {})

        res.status(200).json({
            status: 'success',
            data: {
                profiles,
            },
        });
    }catch (err: any) {
        next(err);
    }
}

export const updateProfileHandler = async(
    req:Request<UpdateProfileInput['params'], {}, UpdateProfileInput['body']>,
    res : Response,
    next : NextFunction
) => {
    try {
        const profile = await getProfile(req.params.profileId)

        if(!profile) {
            return next(new IndexError(404, 'Profile with that Id not found'))
        }

        Object.assign(profile, req.body)

        const updateProfile = await profile.save()

        res.status(200).json({
            status: 'success',
            data: {
                profile: updateProfile,
            },
        });
    }catch (err: any) {
        next(err);
    }
}

export const deleteProfileHandler = async(
    req: Request<DeleteProfileInput>,
    res : Response,
    next : NextFunction
) => {
    try {
        const profile = await getProfile(req.params.profileId)

        if(!profile) {
            return next(new IndexError(404, 'Profile with that ID not found'))
        }

        await profile.remove()

        res.status(204).json({
            status: 'success',
            data: null,
        });
    }catch (err: any) {
        next(err);
    }
}
