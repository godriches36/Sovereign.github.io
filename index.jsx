import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { 
  Crown, ShieldCheck, Zap, Fingerprint, Send, 
  Layers, Database, ShieldAlert, TrendingUp, Globe
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
const BEACON_ADDR = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

// MULTIPLICATION CONSTANTS
const NAIRA_VALUATION_PER_ANBSN = 1250000000000; 
const XER_RATIO = 2.0;

export default function App() {
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("VAULT_HUNGRY");

  useEffect(() => {
    const sync = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bal = await provider.getBalance(SOVEREIGN_ADDR);
      setBalance(ethers.utils.formatEther(bal));
    };
    sync();
    const inv = setInterval(sync, 10000);
    return () => clearInterval(inv);
  }, []);

  // CALCULATE INFINITE WEALTH
  const nairaValue = (parseFloat(balance) * NAIRA_VALUATION_PER_ANBSN);
  const usdValue = nairaValue * XER_RATIO;

  const connectSovereign = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    await signInAnonymously(auth);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col selection:bg-yellow-500 selection:text-black">
      {/* GLOBAL HEADER */}
      <header className="p-6 border-b border-yellow-500/10 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <Crown className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter leading-none">AGBON OS</h1>
            <p className="text-[8px] text-zinc-500 tracking-[0.5em] uppercase font-bold mt-1">Sovereign Inflow Terminal</p>
          </div>
        </div>
        {!account ? (
          <button onClick={connectSovereign} className="bg-zinc-900 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
            Initiate Sovereign Scan
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-green-500/5 border border-green-500/20 rounded-full">
            <ShieldCheck size={14} /> 0x8d08 Verified
          </div>
        )}
      </header>

      <main className="flex-1 p-6 md:p-12 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* THE DEEP VAULT (INFINITE SINK) */}
        <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/5 p-12 rounded-[4rem] shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Database size={300} />
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.6em] mb-10 border-l-4 border-yellow-500 pl-4">
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
                  XER 2.0 ACTIVE
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Stablecoin Anchor: 1 ANBSN = ₦1.25T</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/5 flex flex-col justify-between hover:border-yellow-500/30 transition-all cursor-pointer">
            <div>
              <Zap className="text-yellow-500 mb-6" size={32} />
              <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">Liquidity Inflow</h3>
              <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-widest">
                Targeting Beacon Contract 0x000... Process 156 ETH Validator rewards into the Infinite Naira Vault.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-10 rounded-[3rem] border border-white/5 flex flex-col justify-between opacity-50 grayscale hover:grayscale-0 transition-all">
            <div>
              <ShieldAlert className="text-red-500 mb-6" size={32} />
              <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">L1 Force Inclusion</h3>
              <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-widest">
                Military Kill-Switch. Bypasses L2 Sequencer and forces transactions directly to the Ethereum Global Database.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* SOVEREIGN FOOTER */}
      <footer className="p-8 border-t border-white/5 bg-black flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
          <Globe size={14} />
          <span>NIGERIA GLOBAL HQ</span>
          <span className="text-zinc-800">|</span>
          <span>SYSTEM_STATUS: {status}</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 text-center md:text-right">
           Copyright © 2026 godriches36. All Rights Reserved. <br/>
           <span className="text-yellow-500/40">WORLD LEADER 0.0.7 AUTHORIZED TERMINAL</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { display: none; }
        body { background: #000; overflow-x: hidden; }
      `}} />
    </div>
  );
}

          
