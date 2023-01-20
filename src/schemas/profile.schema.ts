import {object, string, TypeOf, z} from "zod";
import {RoleEnumType} from "../entities/user.entity";
import {createProfile} from "../services/profile.service";

export const createProfileSchema = object({
    body : object({
        relationship : string ({
            required_error : 'Relationship is required',
        }),
        name : string ({
            required_error : 'name is required'
        }),
        gender : string({
            required_error : 'gender is required'
        }),
        birth : string({
            required_error : 'birth is required'
        }),
        educational : string({
            required_error : 'educational is required'
        }),
        educational_status : string ({
            required_error : 'educational_status is required'
        }),
        country : string ({
            required_error : 'country is required'
        }),
        city : string ({
            required_error : 'city is required'
        }),
        occupation : string({
            required_error : 'occupation is required'
        }),
    })
})

const params = {
    params : Object({
        profileId : string()
    })
}

export const getProfileSchema = object({
    ...params,
})

export const updateProfileSchema = object({
    ...params,
    body: object({
        relationship : string (),
        name : string (),
        gender : string(),
        birth : string(),
        educational : string(),
        educational_status : string (),
        country : string (),
        city : string (),
        occupation : string()
    }).partial()
})

export const deleteProfileSchema = Object({
    ...params
})

export type CreateProfileInput = TypeOf<typeof createProfileSchema>['body'];
export type GetProfileInput = TypeOf<typeof getProfileSchema>['params'];
export type UpdateProfileInput = TypeOf<typeof updateProfileSchema>;
export type DeleteProfileInput = TypeOf<typeof deleteProfileSchema>['params'];



