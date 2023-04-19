import { JwtService } from '@nestjs/jwt';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
export const AuthToken = createParamDecorator(
  async (roles: string[], ctx: ExecutionContext) => {
    const jwtService = new JwtService();
    const request = ctx.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.split(' ')[1];
      let payload: any;
      if (token) {
        payload = await jwtService.verify(token, {
          secret: process.env.KEY_SECRET,
        });
      }
      const checkRole = roles.some((role) => role === payload?.role);
      if (!checkRole) {
        throw new UnauthorizedException('Unauthorized', {
          description: 'You don not have access !',
        });
      }
      return payload;
    } catch (err) {
      console.error(err);
      const errorException = {
        status: 401,
        ...err,
      };
      const { response, status, options } = err;
      throw new HttpException(
        response || errorException,
        status || errorException.status,
        options,
      );
    }
  },
);
export function ValidatorToke(token: any) {
  const jwtService = new JwtService();
  const formatToke = token?.split(' ')[1];
  try {
    jwtService.verify(formatToke, {
      secret: process.env.KEY_SECRET,
    });
    return true;
  } catch (error) {
    return false;
  }
}
