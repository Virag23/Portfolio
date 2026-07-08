import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, DollarSign, ShieldCheck, AlertCircle, Plus, Trash2 } from 'lucide-react';

export default function FleetDocsDashboard() {
  const [activeTab, setActiveTab] = useState('tracker');
  
  // Tracker States
  const [truckCoords, setTruckCoords] = useState(0); // 0 to 100% progress
  const [truckSpeed, setTruckSpeed] = useState(62);
  const [warnings, setWarnings] = useState([]);
  
  // Expenses States
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Diesel Refuel (Pune)', cost: 120, category: 'Fuel' },
    { id: 2, name: 'Toll plaza (Mumbai Express)', cost: 15, category: 'Toll' }
  ]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseCost, setNewExpenseCost] = useState('');

  // Compliance States
  const [compliance, setCompliance] = useState({
    license: true,
    pollution: true,
    insurance: false
  });

  // Track movement simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setTruckCoords(prev => {
        const next = prev + 5;
        if (next > 100) {
          setWarnings([]);
          return 0;
        }
        
        // Random warnings and speeds
        if (next === 25) {
          setWarnings(prevWarns => [...prevWarns, 'Speed limit alert (Pune-Mumbai Tollway): 82 km/h']);
          setTruckSpeed(82);
        } else if (next === 30) {
          setTruckSpeed(60);
        } else if (next === 60) {
          setWarnings(prevWarns => [...prevWarns, 'Braking G-force spike detected at Mumbai checkpost']);
        }
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    if (!newExpenseName || !newExpenseCost) return;
    const costNum = parseFloat(newExpenseCost);
    if (isNaN(costNum)) return;

    setExpenses(prev => [
      ...prev,
      { id: Date.now(), name: newExpenseName, cost: costNum, category: 'General' }
    ]);
    setNewExpenseName('');
    setNewExpenseCost('');
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((sum, current) => sum + current.cost, 0);
  };

  const calculateCompliancePercent = () => {
    const values = Object.values(compliance);
    const passes = values.filter(v => v).length;
    return Math.round((passes / values.length) * 100);
  };

  return (
    <div className="cyber-glass p-6 rounded-xl border border-cyber-pink/20 w-full max-w-xl mx-auto shadow-neon-pink relative overflow-hidden text-left">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-cyber-purple/20 pb-4 mb-4">
        <div>
          <h4 className="font-bold text-lg font-heading text-cyber-pink tracking-wide flex items-center gap-1.5">
            <Truck className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <span>FleetDocs SaaS Widget</span>
          </h4>
          <span className="text-[10px] font-mono text-cyber-purple uppercase tracking-wider">Live Control Panel</span>
        </div>
        
        <div className="flex gap-1.5 bg-cyber-bg p-1 rounded border border-cyber-purple/20">
          {['tracker', 'expenses', 'compliance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded transition-all uppercase ${activeTab === tab ? 'bg-cyber-pink text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Renderings */}
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeTab === 'tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>ACTIVE FLEET: MH-12-PQ-9081</span>
                <span>Speed: <strong className="text-cyber-cyan">{truckSpeed} km/h</strong></span>
              </div>

              {/* Progress Line */}
              <div className="relative h-8 bg-cyber-bg border border-cyber-purple/25 rounded-md flex items-center px-4 overflow-hidden">
                <div className="absolute left-4 right-4 h-1 bg-cyber-purple/20 rounded" />
                <div 
                  className="absolute left-4 right-4 h-1 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded transition-all duration-1000"
                  style={{ width: `${truckCoords}%` }}
                />
                
                {/* Truck icon placement */}
                <div 
                  className="absolute transition-all duration-1000"
                  style={{ left: `calc(1rem + ${truckCoords * 0.88}%)`, transform: 'translateX(-50%)' }}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                    className="p-1 rounded-full bg-cyber-pink shadow-neon-pink"
                  >
                    <Truck className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-gray-500 px-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyber-cyan" /> Pune Hub</span>
                <span className="flex items-center gap-1">Mumbai Depot <MapPin className="w-3 h-3 text-cyber-pink" /></span>
              </div>

              {/* Real-time warning alert console */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-cyber-pink font-bold uppercase tracking-wider block">TELEMETRY WARNINGS:</span>
                <div className="bg-black/50 border border-red-500/20 rounded p-2.5 max-h-20 overflow-y-auto font-mono text-[10px] text-gray-400 space-y-1">
                  {warnings.length === 0 ? (
                    <span className="text-cyber-lime flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> System healthy. Zero infractions detected.</span>
                  ) : (
                    warnings.map((warn, index) => (
                      <span key={index} className="text-red-400 flex items-start gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500 animate-pulse mt-0.5" />
                        <span>{warn}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'expenses' && (
            <motion.div
              key="expenses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-400">TRIP EXPENSES LEDGER</span>
                <span className="text-cyber-pink font-bold">Total: ${calculateTotalExpenses()}</span>
              </div>

              {/* Expense list */}
              <div className="max-h-24 overflow-y-auto bg-black/30 border border-cyber-purple/15 rounded p-2 text-xs font-mono space-y-1">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-1.5 border-b border-cyber-purple/10 last:border-b-0 hover:bg-cyber-purple/5">
                    <span className="text-gray-300">{exp.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyber-cyan">${exp.cost}</span>
                      <button onClick={() => deleteExpense(exp.id)} className="text-gray-500 hover:text-cyber-pink transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Expense Form */}
              <form onSubmit={addExpense} className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="Expense desc (e.g. Toll)"
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                  className="col-span-6 bg-cyber-bg border border-cyber-purple/30 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 outline-none focus:border-cyber-pink transition-colors"
                />
                <input
                  type="number"
                  placeholder="Amt"
                  value={newExpenseCost}
                  onChange={(e) => setNewExpenseCost(e.target.value)}
                  className="col-span-3 bg-cyber-bg border border-cyber-purple/30 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 outline-none focus:border-cyber-pink transition-colors"
                />
                <button
                  type="submit"
                  className="col-span-3 bg-cyber-pink text-white hover:bg-cyber-purple font-bold text-xs py-1.5 rounded flex items-center justify-center gap-0.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'compliance' && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-400">VEHICLE COMPLIANCE SCAN</span>
                <span 
                  className={`font-bold ${calculateCompliancePercent() === 100 ? 'text-cyber-lime' : 'text-amber-400'}`}
                >
                  Score: {calculateCompliancePercent()}%
                </span>
              </div>

              {/* Dynamic compliance list checkboxes */}
              <div className="space-y-2">
                {[
                  { key: 'license', title: 'Driver Commercial License (Class A)' },
                  { key: 'pollution', title: 'Pollution Under Control (PUC) Registry' },
                  { key: 'insurance', title: 'Carrier Liability Transit Insurance' }
                ].map((doc) => (
                  <label 
                    key={doc.key} 
                    className="flex items-center justify-between p-3 border border-cyber-purple/15 bg-black/20 rounded cursor-pointer hover:border-cyber-pink/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-gray-300">{doc.title}</span>
                    <input
                      type="checkbox"
                      checked={compliance[doc.key]}
                      onChange={(e) => setCompliance(prev => ({ ...prev, [doc.key]: e.target.checked }))}
                      className="w-4 h-4 accent-cyber-pink cursor-pointer rounded bg-cyber-bg border-cyber-purple/30"
                    />
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
