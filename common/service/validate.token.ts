import { JwtService } from '@nestjs/jwt';

export async function validateToken(token: string) {
  const jwtService = new JwtService();
  try {
    const payload = await jwtService.verify(token);
    return payload;
  } catch (err) {
    return err;
  }
}
