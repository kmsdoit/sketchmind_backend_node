import {object, string, TypeOf, z} from "zod";
import {RoleEnumType} from "../entities/user.entity";

export const createUserSchema = object({
    body : object({
        name : string ({
            required_error : 'Name is required',
        }),
        email : string ({
            required_error : 'Email address is required'
        }).email('Invalid email address'),
        password : string({
            required_error : 'Password is required'
        }).min(8, 'password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm : string({
            required_error : 'Please confirm your password'
        }),
        birth : string ({
            required_error : 'birth is required'
        }),
        phone : string ({
            required_error : 'phone is required'
        }),
        role : z.optional(z.nativeEnum(RoleEnumType))
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message : 'Password do not match'
    })
})

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
});


export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>['body'],
    'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];

export const verifyEmailSchema = object({
    params: object({
        verificationCode: string(),
    }),
});

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];



