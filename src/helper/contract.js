// ABI
import CONTRACT_ABI from "./json/contract_abi.json";

export const CONTRACT_ADDRESS = "0xCBBfBafEDB0Eb83016d2A96A4E80d30B20Fa3e30";
export { CONTRACT_ABI }

// Gas price multiplier
export const GAS_PRICE_MULTIPLIER = 1.2;

export const getGasFee = (gasPrice) => {
  return Math.round(gasPrice * GAS_PRICE_MULTIPLIER);
}
