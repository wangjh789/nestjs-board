import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable() //다른곳에서도 주입을 해서 사용할 수 있게 하도록
export class JwtStrategy extends PassportStrategy(Strategy){
    //Strategy는 passport의 jwt에서 import 됨

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository, //payload 안에 유저이름 정보를 이용해 유저정보를 가져오기위해
    ){
        super({ 
            secretOrKey:"JWT_SECERT",// 토큰을 생성할 때 썻던 키, 유호한지 확인을 위해 사용
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() //토큰을 어디서 가져오는지. 헤더 bearer에서 가져옴
        })
    }

    async validate(payload): Promise<User>{ //인증이 된후 payload로 
        const {username} = payload;
        const user:User = await this.userRepository.findOne({username})

        if (!user){
            throw new UnauthorizedException();
        }
        return user
    }

}