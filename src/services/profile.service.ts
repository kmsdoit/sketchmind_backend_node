import {AppDataSource} from "../utils/data-source";
import {User} from "../entities/user.entity";
import {DeepPartial, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere} from "typeorm";
import {Profile} from "../entities/profile.entity";


const profileRepository = AppDataSource.getRepository(Profile)

export const createProfile = async(input:Partial<Profile>, user:User) => {
    return await profileRepository.save(profileRepository.create({...input, user}))
}

export const getProfile = async(profileId : string) => {
    return await profileRepository.findOneBy({id : profileId})
}

export const findProfiles = async(
    where : FindOptionsWhere<Profile> = {},
    select : FindOptionsSelect<Profile> = {},
    relations : FindOptionsRelations<Profile> = {}
) => {
    return await profileRepository.find({
        where,
        select,
        relations
    })
}
