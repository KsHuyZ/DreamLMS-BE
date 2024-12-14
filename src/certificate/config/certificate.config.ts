import { registerAs } from '@nestjs/config';

import { IsNotEmpty, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { CertificateConfig } from './certificate-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  CONTRACT_ADDRESS: string;

  @IsString()
  @IsNotEmpty()
  API_URL: string;

  @IsString()
  @IsNotEmpty()
  PRIVATE_KEY: string;
}

export default registerAs<CertificateConfig>('certificate', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    contractAddress: process.env.CONTRACT_ADDRESS,
    apiUrl: process.env.API_URL,
    privateKey: process.env.PRIVATE_KEY,
  };
});
