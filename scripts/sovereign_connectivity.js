const { ethers } = require("ethers");
// Handles high-speed connection to Chainstack and Metamask
export const connectSovereignWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        provider.on("network", (newNet, oldNet) => { if (oldNet) window.location.reload(); });
        await window.ethereum.request({ method: "eth_requestAccounts" });
        return provider.getSigner();
    }
    return null;
};
