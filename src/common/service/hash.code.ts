import * as bcrypt from 'bcryptjs';

async function hashWord(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
export { hashWord };
