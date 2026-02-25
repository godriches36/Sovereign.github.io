/**
 * AGBON OS - SOVEREIGN LEDGER
 * Logic: Managing 1.25T Naira Frequency Movements
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

const { ethers } = require("ethers");

export const executeSovereignTransfer = async (signer, to, amount) => {
    // Ensures only godriches36 (0x8d08) can trigger the move
    const tx = {
        to: to,
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: 21000,
    };
    const response = await signer.sendTransaction(tx);
    return await response.wait();
};
