import {
  Web3Provider,
} from "ethers/providers";

export const connectWallet = () => {
  const web3 = (window as any).web3 || (window as any).ethereum
  const provider = new Web3Provider(web3.currentProvider)
  console.log(provider)
  return provider
}

