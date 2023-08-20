import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../JwtPayload';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../service/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private static JWT_KEY = 'JWT_SECRET';

    constructor(
        private readonly userService: UserService,
        // service that is used for
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get(JwtStrategy.JWT_KEY),
        });
    }

    /**
     * https://docs.nestjs.com/security/authentication#implementing-passport-jwt
     */
    async validate(payload: JwtPayload, done: Function) {
        const user = await this.userService.findUserOrNullByEmail(payload.email);

        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }
}
