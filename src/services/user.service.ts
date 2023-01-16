import {AppDataSource} from "../utils/data-source";
import {User} from "../entities/user.entity";
import {CreateUserInput} from "../schemas/user.schema";
import {DeepPartial} from "typeorm";
import redisClient from "../utils/connectRedis";
import config from "config";
import {signJwt} from "../utils/jwt";


const userRepository = AppDataSource.getRepository(User)

export const createUser = async (input: DeepPartial<User>) => {
    return userRepository.save(userRepository.create(input));
};
export const findUserByEmail = async({email} : {email :string}) => {
    return await userRepository.findOneBy({email})
}

export const findUserById = async(userId : string) => {
    return await userRepository.findOneBy({id : userId})
}

export const findUser = async(query : Object) => {
    return await userRepository.findOneBy(query)
}

export const signTokens = async(user : User) => {
    await redisClient.set(user.id, JSON.stringify(user), {
        EX: config.get<number>('redisCacheExpiresIn') * 60
    })

    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    });

    return { access_token, refresh_token };
}
