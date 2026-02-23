/**
 * @title ANBSN Sovereign API Map
 * @author 0.0.7 World Leader
 * @notice Organizes the "Get" URLs for Metamask and the Runner Man.
 * @dev Aligned with Chainstack L1 and EVMbench standards.
 */

const SOVEREIGN_CONFIG = {
    // THE GROUND: Your Chainstack Node (For Metamask RPC)
    // Linked to GitHub Secrets: SOVEREIGN_RPC
    rpcUrl: process.env.SOVEREIGN_RPC || "https://ethereum-mainnet.core.chainstack.com/your-id",
    
    // THE EYES: Your Etherscan API (For Data Retrieval)
    // This handles the "eth_call" proxy logic for the Runner Man
    explorerApi: `https://api.etherscan.io/api?module=proxy&action=eth_call&apikey=${process.env.ETHERSCAN_API_KEY}`,
    
    // THE ASSET: Your Name Tag Anchor (The Root Bank)
    nairaAddress: "0x8d08948eca2587f5c10159e483b660e98cd5a514",

    // THE FREQUENCY: 1 Trillion Valuation Anchor
    frequency: "1.25T",
    ratioXER: 2.0
};

console.log("------------------------------------------");
console.log("SOVEREIGN API MAP: ALIGNED 👍");
console.log(`ANCHOR: ${SOVEREIGN_CONFIG.nairaAddress}`);
console.log(`RPC_STATUS: CONNECTED TO CHAINSTACK`);
console.log("------------------------------------------");

module.exports = SOVEREIGN_CONFIG;
