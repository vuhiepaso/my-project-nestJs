import * as bcrypt from 'bcryptjs';

async function hashWord(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
async function validatePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
export { hashWord, validatePassword };
