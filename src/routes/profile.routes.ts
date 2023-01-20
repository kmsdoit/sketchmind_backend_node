import express from "express";
import {validate} from "../middleware/validate";
import {
    createProfileSchema,
    deleteProfileSchema,
    getProfileSchema,
    updateProfileSchema
} from "../schemas/profile.schema";
import {
    createProfileHandler, deleteProfileHandler,
    getProfileHandler,
    updateProfileHandler
} from "../controller/profile.controller";
import {deserializeUser} from "../middleware/deserializeUser";
import {requireUser} from "../middleware/requireUser";

const router = express.Router();

router.use(deserializeUser, requireUser)

router
    .route("/")
    .post(validate(createProfileSchema), createProfileHandler)
    .get(getProfileHandler)

router
    .route('/:profileId')
    .get(validate(getProfileSchema), getProfileHandler)
    .patch(validate(updateProfileSchema), updateProfileHandler)
    .delete(validate(deleteProfileSchema), deleteProfileHandler)

export default router;
