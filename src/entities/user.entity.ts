import {BeforeInsert, Column, Entity, Index} from "typeorm";
import Model from "./model.entity";
import * as bcrypt from 'bcryptjs'
import * as crypto from "crypto";

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin'
}

export enum SnsEnumType {
    EMAIL = 'email',
    KAKAO = 'kakao',

    GOOGLE = 'google',

    NAVER = 'naver'
}

@Entity('users')
export class User extends Model {
    @Index('email_index')
    @Column({
        unique : true
    })
    email : string;

    @Column()
    name : string

    @Column()
    password : string

    @Column({
        type : 'enum',
        enum : RoleEnumType,
        default : RoleEnumType.USER
    })
    role : RoleEnumType.USER

    @Column()
    birth : string;

    @Column()
    phone : string;

    @Column({
        type : 'enum',
        enum : SnsEnumType,
        default : SnsEnumType.EMAIL
    })
    sns_type : SnsEnumType.EMAIL

    @Column({
        default : false
    })
    verified : boolean;

    @Index('verificationCode_index')
    @Column({
        type: 'text',
        nullable: true,
    })
    verificationCode!: string | null;


    toJSON() {
        return {...this, password:undefined,verified : undefined };
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    static createVerificationCode() {
        const verificationCode = crypto.randomBytes(32).toString('hex');

        const hashedVerificationCode = crypto
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex');

        return { verificationCode, hashedVerificationCode };
    }
}
