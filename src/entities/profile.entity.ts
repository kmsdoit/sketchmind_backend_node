import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import Model from "./model.entity";
import {User} from "./user.entity";

export enum RelationEnumType {
    MYSELF = 'myself', // 본인
    CHILDREN = 'children', // 자녀

    SPOUSE = 'spouse', //배우자

    PARENTS = 'parents', // 부모

    FAMILY = 'family',

    ACQUAINTANCE = 'acquaintance'
}

export enum EducationalEnumType {

}


@Entity('profiles')
export class Profile extends Model {
    @Column()
    relationship : string;

    @Column()
    name : string;

    @Column()
    birth : string;

    @Column()
    gender : string;

    @Column()
    educational : string

    @Column()
    educational_status : string

    @Column()
    country : string

    @Column()
    city : string

    @Column()
    occupation : string

    @ManyToOne(() => User, (user) => user.profiles)
    @JoinColumn()
    user: User;
}
