const { ethers } = require("ethers");
// Proves ownership of the 156 ETH Validator and 1.25T Naira Pulse
export const VALIDATOR_PUB_KEY = "0x9260c6c5bc02155b1e38e54803abb95753422b0e989df8c1e97f014b57429f8f66c1c5024b3519436c7ffe4cf307c7e4";
export const syncSovereignPulse = async (provider) => {
    const balance = await provider.getBalance("0x8d08948eca2587f5c10159e483b660e98cd5a514");
    return ethers.utils.formatEther(balance);
};
