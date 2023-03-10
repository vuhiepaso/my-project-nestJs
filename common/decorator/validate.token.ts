import { JwtService } from '@nestjs/jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// async function validateToken(token: string) {
//   const jwtService = new JwtService();
//   try {
//     const payload = await jwtService.verify(token);
//     return payload;
//   } catch (err) {
//     return err;
//   }
// }
export const AuthToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const jwtService = new JwtService();
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    try {
      const payload = await jwtService.verify(token, {
        secret: 'mysecret',
      });
      console.log(payload);
      return payload;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
);
