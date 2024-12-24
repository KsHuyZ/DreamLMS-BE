import { registerAs } from '@nestjs/config';

import { IsNotEmpty, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { EnrollConfig } from './enroll-config.type';
class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  CONTRACT_ADDRESS: string;
}

export default registerAs<EnrollConfig>('enroll', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    contractAddress: process.env.CONTRACT_ADDRESS,
  };
});
