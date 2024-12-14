import { ethers } from 'ethers';
import * as Certificate from '../service/certificate.json';

const contractABI = Certificate.abi;

const fetchContract = (
  API_URL?: string,
  PRIVATE_KEY?: string,
  CONTRACT_ADDRESS?: string,
) => {
  if (!API_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) return;
  const provider = new ethers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};

export default fetchContract;
