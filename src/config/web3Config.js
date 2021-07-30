import Web3 from "web3";

const Web3Config = () => {

  return {
    web3Instance: new Promise((resolve, reject) => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      (async () => {
        // Modern dapp browsers...
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            window.ethereum.on('accountsChanged', function (accounts) {
              localStorage.clear();
              location.reload();
            });
            // Acccounts now exposed

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
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
          );
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }
      })();
    }),
  };
};

export default Web3Config;
