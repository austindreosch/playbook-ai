// 'use client'

// import React, { useState } from 'react'

// function PlayerRow({ player, index }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const toggleAccordion = () => setIsOpen(!isOpen)

//   return (
//     <div className="border border-gray-200 rounded-md my-1 bg-white shadow-sm">
//       {/* Header Row */}
//       <div
//         className="grid grid-cols-[30px_40px_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-1 px-2 py-1 cursor-pointer items-center hover:bg-gray-50"
//         onClick={toggleAccordion}
//       >
//         <span className="text-xs text-gray-400">{index + 1}</span>
//         <div className="h-8 w-8">
//           {/* <img
//             className="rounded-md"
//             src={player.img || '/placeholder.png'}
//             alt="player"
//           /> */}
//         </div>
//         <div className="text-sm font-medium">
//           <div>Player</div>
//           <div className="text-xs text-gray-400">player.position</div>
//         </div>
//         <div className="text-center text-xs">player.stats?.ptsPerGame</div>
//         <div className="text-center text-xs">player.stats?.rebPerGame</div>
//         <div className="text-center text-xs">player.stats?.astPerGame</div>
//         <div className="text-center text-xs">player.stats?.stlPerGame</div>
//         <div className="text-center text-xs">player.stats?.blkPerGame</div>
//         <div className="text-center text-xs">player.stats?.fg3PtMadePerGame</div>
//         <div className="text-center text-xs">player.stats?.toPerGame</div>
//         <div className="text-center text-xs">player.stats?.fgPct</div>
//         <div className="text-center text-xs">player.stats?.ftPct</div>
//       </div>

//       {/* Expanded Row */}
//       {isOpen && (
//         <div className="p-2 bg-gray-50 border-t border-gray-200 grid grid-cols-[2fr_3fr_4fr_3fr] gap-2 text-xs">
//           {/* Format Ranks Placeholder */}
//           <div className="border rounded p-2">
//             <h4 className="font-semibold mb-1">Ranks</h4>
//             <p>Standard: #</p>
//             <p>Redraft: #</p>
//             <p>Consensus: #</p>
//           </div>

//           {/* Playbook Score Placeholder */}
//           <div className="border rounded p-2">
//             <h4 className="font-semibold mb-1">Playbook Score</h4>
//             <p className="text-2xl font-bold text-yellow-500">
//               92
//             </p>
//           </div>

//           {/* Matchup Insights Placeholder */}
//           <div className="border rounded p-2">
//             <h4 className="font-semibold mb-1">Next 5 Games</h4>
//             <ul className="space-y-1">
//               {['@BOS', 'vs IND', '@CHA', 'vs PHX', '@SAS'].map((opponent, i) => (
//                 <li key={i} className="flex justify-between">
//                   <span>opponent</span>
//                   <span className="text-green-600">🛡️ 18th</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Last 30 Stats Placeholder */}
//           <div className="border rounded p-2">
//             <h4 className="font-semibold mb-1">Last 30</h4>
//             <ul className="space-y-1">
//               <li>PTS: 25.8 <span className="text-green-500">▲ 12%</span></li>
//               <li>REB: 4.1 <span className="text-gray-500">—</span></li>
//               <li>AST: 5.2 <span className="text-red-500">▼ 5%</span></li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PlayerRow
