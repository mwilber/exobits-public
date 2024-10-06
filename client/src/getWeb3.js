import Web3 from "web3";

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        //const web3 = new Web3(window.ethereum);
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        try {
          // Request account access if needed
          //await window.ethereum.enable();
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          // Accounts now exposed
          window.web3instance = web3;
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        window.web3instance = web3;
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      // else {
      //   const provider = new Web3.providers.HttpProvider(
      //     "http://127.0.0.1:7545"
      //   );
      //   const web3 = new Web3(provider);
      //   console.log("No web3 instance injected, using Local web3.");
      //   window.web3instance = web3;
      //   resolve(web3);
      // }
      else {
        reject(null);
      }
  });

export default getWeb3;
