/**
 * AGBON OS - SOVEREIGN CONNECTIVITY
 * Logic: High-Throughput RPC Bridging
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

const { ethers } = require("ethers");

// Anchors to your Chainstack RPC via GitHub Secrets
const RPC_URL = process.env.SOVEREIGN_RPC;

export const initializeSovereignProvider = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
        // Metamask/Web3 Bridge
        return new ethers.providers.Web3Provider(window.ethereum, "any");
    } else {
        // Headless/Runner Man Bridge
        return new ethers.providers.JsonRpcProvider(RPC_URL);
    }
};
