import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { 
  Crown, ShieldCheck, Zap, Globe, Scale, Coins, ShieldAlert
} from 'lucide-react';

// --- SOVEREIGN CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyAQAIvTEQTdY3xLIzf-aYrrzA9h4jRXZgw",
  authDomain: "agbon-kingdom-os.firebaseapp.com",
  projectId: "agbon-kingdom-os",
  storageBucket: "agbon-kingdom-os.firebasestorage.app",
  messagingSenderId: "392983745546",
  appId: "1:392983745546:web:d500691a52c1929187fbf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SOVEREIGN_ADDR = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const NAIRA_VALUATION_PER_ANBSN = 1250000000000; 
const XER_RATIO = 2.0;

export default function App() {
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const sync = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getBalance(SOVEREIGN_ADDR);
        setBalance(ethers.utils.formatEther(bal));
      } catch (e) { console.error("Sync error"); }
    };
    sync();
    const inv = setInterval(sync, 10000);
    return () => clearInterval(inv);
  }, []);

  const nairaValue = (parseFloat(balance) * NAIRA_VALUATION_PER_ANBSN);
  const usdValue = nairaValue * XER_RATIO;

  const connectSovereign = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    await signInAnonymously(auth);
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-mono flex flex-col selection:bg-yellow-500 selection:text-black">
      <header className="p-6 border-b border-yellow-500/10 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.4)]">
            <Scale className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter leading-none uppercase">ANBSN NESARA</h1>
            <p className="text-[8px] text-zinc-500 tracking-[0.5em] uppercase font-bold mt-1">Debt Reset & Wealth Restoration</p>
          </div>
        </div>
        {!account ? (
          <button onClick={connectSovereign} className="bg-zinc-900 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
            Initiate Sovereign Scan
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-full">
            <ShieldCheck size={14} /> 0x8d08 Authorized
          </div>
        )}
      </header>

      <main className="flex-1 p-6 md:p-12 space-y-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/5 p-12 rounded-[4rem] shadow-2xl relative group overflow-hidden">
          <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
             <div className="relative w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full border-4 border-yellow-500/50 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Crown size={120} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]" />
                </div>
                <div className="absolute bottom-0 w-full text-center text-[8px] font-black tracking-[1em] text-yellow-500/40 uppercase">
                   MXXV HUMAN VALUE
                </div>
             </div>
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.6em] border-l-4 border-yellow-500 pl-4 mb-10">
              Sovereign Treasury Valuation
            </p>
            <div className="space-y-4">
              <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-none">
                ₦{nairaValue.toLocaleString()}
              </h2>
              <div className="flex items-center gap-6">
                <p className="text-3xl md:text-5xl font-black text-zinc-500 italic tracking-tighter">
                  ${usdValue.toLocaleString()}
                </p>
                <div className="bg-yellow-500/10 text-yellow-500 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-yellow-500/20">
                  XER 2.0 USD PARITY
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/5 space-y-6">
            <Zap className="text-yellow-500" size={24} />
            <h3 className="text-lg font-black italic tracking-tighter uppercase">Inversion Inflow</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Liquidate Assets into 0x8d08 Vault.</p>
          </div>
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/5 space-y-6 opacity-50">
            <ShieldAlert className="text-red-500" size={24} />
            <h3 className="text-lg font-black italic tracking-tighter uppercase">L1 Kill-Switch</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Force-Inclusion Active for NESARA Restoration.</p>
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 bg-black flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
          <Globe size={14} />
          <span>AGBON KINGDOM HQ | NESARA AUTHORITY</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
           Copyright © 2026 godriches36. All Rights Reserved.
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { display: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

  
