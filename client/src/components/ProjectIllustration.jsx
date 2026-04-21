/* Animated SVG illustrations — one per project */

function StockGPT() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes sg-rise  { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
        @keyframes sg-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes sg-tick  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes sg-glow  { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes sg-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .sg-trend { stroke-dasharray:600; animation:sg-rise 2.8s ease-out forwards; }
        .sg-glow  { animation:sg-glow 2.5s ease-in-out infinite; }
        .sg-node  { animation:sg-blink 2s ease-in-out infinite; }
        .sg-n2    { animation-delay:0.6s; }
        .sg-n3    { animation-delay:1.2s; }
        .sg-ticker{ animation:sg-tick 14s linear infinite; }
        .sg-brain { animation:sg-float 3s ease-in-out infinite; }
      `}</style>
      <defs>
        <linearGradient id="sg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f0c29"/>
          <stop offset="55%" stopColor="#1e1b4b"/>
          <stop offset="100%" stopColor="#2d2a7a"/>
        </linearGradient>
        <linearGradient id="sg-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </linearGradient>
        <linearGradient id="sg-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171"/>
          <stop offset="100%" stopColor="#dc2626"/>
        </linearGradient>
        <linearGradient id="sg-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
        </linearGradient>
        <filter id="sg-gf">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="sg-clip"><rect x="0" y="0" width="400" height="370"/></clipPath>
      </defs>

      {/* Background */}
      <rect width="400" height="400" fill="url(#sg-bg)"/>

      {/* Grid */}
      {[80,130,180,230,280].map(y =>
        <line key={y} x1="40" y1={y} x2="370" y2={y} stroke="rgba(99,102,241,0.12)" strokeWidth="1"/>
      )}
      {[80,150,220,290,360].map(x =>
        <line key={x} x1={x} y1="50" x2={x} y2="310" stroke="rgba(99,102,241,0.08)" strokeWidth="1"/>
      )}

      {/* Y-axis labels */}
      {[[80,'320'],[130,'280'],[180,'240'],[230,'200'],[280,'160']].map(([y,lbl]) =>
        <text key={y} x="34" y={y+4} textAnchor="end" fontFamily="monospace" fontSize="9" fill="rgba(165,180,252,0.4)">{lbl}</text>
      )}

      {/* Candlesticks */}
      {/* Candle 1 green */}
      <line x1="90" y1="275" x2="90" y2="215" stroke="#4ade80" strokeWidth="1.5"/>
      <rect x="83" y="235" width="14" height="40" fill="url(#sg-green)" rx="1"/>
      {/* Candle 2 red */}
      <line x1="130" y1="265" x2="130" y2="200" stroke="#f87171" strokeWidth="1.5"/>
      <rect x="123" y="215" width="14" height="50" fill="url(#sg-red)" rx="1"/>
      {/* Candle 3 green */}
      <line x1="170" y1="250" x2="170" y2="175" stroke="#4ade80" strokeWidth="1.5"/>
      <rect x="163" y="195" width="14" height="55" fill="url(#sg-green)" rx="1"/>
      {/* Candle 4 green */}
      <line x1="210" y1="225" x2="210" y2="155" stroke="#4ade80" strokeWidth="1.5"/>
      <rect x="203" y="170" width="14" height="55" fill="url(#sg-green)" rx="1"/>
      {/* Candle 5 red */}
      <line x1="250" y1="235" x2="250" y2="165" stroke="#f87171" strokeWidth="1.5"/>
      <rect x="243" y="178" width="14" height="57" fill="url(#sg-red)" rx="1"/>
      {/* Candle 6 green */}
      <line x1="290" y1="200" x2="290" y2="118" stroke="#4ade80" strokeWidth="1.5"/>
      <rect x="283" y="135" width="14" height="65" fill="url(#sg-green)" rx="1"/>
      {/* Candle 7 green */}
      <line x1="330" y1="175" x2="330" y2="95" stroke="#4ade80" strokeWidth="1.5"/>
      <rect x="323" y="110" width="14" height="65" fill="url(#sg-green)" rx="1"/>

      {/* Area fill under trend */}
      <path
        d="M 76 290 Q 170 210 255 185 Q 300 155 345 110 L 345 330 L 76 330 Z"
        fill="url(#sg-area)"
      />

      {/* Trend line glow */}
      <path
        className="sg-glow"
        d="M 76 290 Q 170 210 255 185 Q 300 155 345 110"
        fill="none" stroke="#34d399" strokeWidth="7" strokeOpacity="0.18" strokeLinecap="round"
      />
      {/* Trend line */}
      <path
        className="sg-trend"
        d="M 76 290 Q 170 210 255 185 Q 300 155 345 110"
        fill="none" stroke="#34d399" strokeWidth="2.5"
        filter="url(#sg-gf)" strokeLinecap="round"
      />
      {/* Trend endpoint dot */}
      <circle cx="345" cy="110" r="5" fill="#34d399" className="sg-glow"/>
      <circle cx="345" cy="110" r="10" fill="none" stroke="#34d399" strokeWidth="1" strokeOpacity="0.4" className="sg-glow"/>

      {/* Neural net nodes (bottom right) */}
      <g className="sg-brain">
        <circle cx="318" cy="348" r="5" fill="#818cf8" className="sg-node"/>
        <circle cx="345" cy="338" r="4" fill="#6366f1" className="sg-node sg-n2"/>
        <circle cx="360" cy="358" r="4" fill="#a5b4fc" className="sg-node sg-n3"/>
        <circle cx="335" cy="368" r="4" fill="#818cf8" className="sg-node"/>
        <line x1="318" y1="348" x2="345" y2="338" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.6"/>
        <line x1="345" y1="338" x2="360" y2="358" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.6"/>
        <line x1="360" y1="358" x2="335" y2="368" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.6"/>
        <line x1="335" y1="368" x2="318" y2="348" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.6"/>
        <line x1="318" y1="348" x2="360" y2="358" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3"/>
        <line x1="345" y1="338" x2="335" y2="368" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3"/>
        <text x="290" y="335" fontFamily="monospace" fontSize="8" fill="rgba(165,180,252,0.5)" letterSpacing="1">AI</text>
      </g>

      {/* Label */}
      <text x="40" y="330" fontFamily="monospace" fontSize="9" fill="rgba(165,180,252,0.5)" letterSpacing="1.5">STOCK GPT · ZERODHA MCP</text>

      {/* Ticker bar */}
      <rect x="0" y="373" width="400" height="27" fill="rgba(0,0,0,0.5)"/>
      <clipPath id="sg-tclip"><rect x="0" y="373" width="400" height="27"/></clipPath>
      <g clipPath="url(#sg-tclip)">
        <text className="sg-ticker" y="390" fontFamily="monospace" fontSize="9" fill="rgba(74,222,128,0.8)" letterSpacing="1">
          {'  NIFTY +1.2%   RELIANCE +2.4%   TCS +0.8%   INFY -0.5%   HDFC +1.9%   ZERODHA API   NIFTY +1.2%   RELIANCE +2.4%   TCS +0.8%   INFY -0.5%'}
        </text>
      </g>
    </svg>
  );
}

function TokenMaster() {
  const nodes = [
    {cx:200, cy:165, r:18, main:true},
    {cx:120, cy:115, r:10},
    {cx:280, cy:115, r:10},
    {cx:90,  cy:215, r:8},
    {cx:310, cy:215, r:8},
    {cx:145, cy:285, r:9},
    {cx:255, cy:285, r:9},
    {cx:60,  cy:160, r:6},
    {cx:340, cy:160, r:6},
    {cx:200, cy:320, r:7},
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [1,2],[1,3],[2,4],[3,5],[4,6],[5,9],[6,9],[7,1],[8,2],[7,3],[8,4],
  ];
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes tm-pulse { 0%,100%{r:18;opacity:1} 50%{r:22;opacity:0.7} }
        @keyframes tm-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes tm-flow  { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        @keyframes tm-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .tm-hub   { animation:tm-pulse 2.5s ease-in-out infinite; transform-origin:200px 165px; }
        .tm-ring  { animation:tm-orbit 8s linear infinite; transform-origin:200px 165px; }
        .tm-ring2 { animation:tm-orbit 14s linear infinite reverse; transform-origin:200px 165px; }
        .tm-edge  { stroke-dasharray:200; animation:tm-flow 3s ease-out forwards; }
        .tm-nd    { animation:tm-blink 2s ease-in-out infinite; }
        .tm-nd:nth-child(odd)  { animation-delay:0.4s; }
        .tm-nd:nth-child(even) { animation-delay:0.9s; }
      `}</style>
      <defs>
        <linearGradient id="tm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d0118"/>
          <stop offset="50%" stopColor="#1a0533"/>
          <stop offset="100%" stopColor="#2e1065"/>
        </linearGradient>
        <linearGradient id="tm-hub-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <filter id="tm-glow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="tm-soft">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="tm-aura">
          <stop offset="0%" stopColor="rgba(124,58,237,0.3)"/>
          <stop offset="100%" stopColor="rgba(124,58,237,0)"/>
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill="url(#tm-bg)"/>

      {/* Hex grid background */}
      {[0,1,2,3,4,5,6].map(row =>
        [0,1,2,3,4,5].map(col => {
          const hx = 55 + col*65 + (row%2)*32;
          const hy = 30 + row*55;
          return <circle key={`${row}-${col}`} cx={hx} cy={hy} r="1.5" fill="rgba(139,92,246,0.2)"/>;
        })
      )}

      {/* Aura behind hub */}
      <circle cx="200" cy="165" r="70" fill="url(#tm-aura)"/>

      {/* Edges */}
      {edges.map(([a,b], i) => (
        <line
          key={i}
          className="tm-edge"
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(167,139,250,0.35)" strokeWidth="1.2"
          style={{animationDelay:`${i*0.12}s`}}
        />
      ))}

      {/* Orbit rings */}
      <g className="tm-ring">
        <circle cx="200" cy="165" r="55" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 8"/>
      </g>
      <g className="tm-ring2">
        <circle cx="200" cy="165" r="80" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="1" strokeDasharray="2 12"/>
      </g>

      {/* Satellite nodes */}
      {nodes.slice(1).map((n, i) => (
        <circle key={i} className="tm-nd" cx={n.cx} cy={n.cy} r={n.r}
          fill="rgba(139,92,246,0.7)" filter="url(#tm-soft)"
          style={{animationDelay:`${i*0.3}s`}}/>
      ))}

      {/* Hub glow */}
      <circle cx="200" cy="165" r="26" fill="rgba(124,58,237,0.3)" filter="url(#tm-glow)"/>
      {/* Hub */}
      <circle className="tm-hub" cx="200" cy="165" r="18" fill="url(#tm-hub-g)" filter="url(#tm-soft)"/>

      {/* ETH diamond symbol */}
      <g transform="translate(200,165)">
        <polygon points="0,-11 7,0 0,5 -7,0" fill="rgba(255,255,255,0.9)"/>
        <polygon points="0,-11 7,0 0,5 -7,0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
        <polygon points="0,5 7,0 0,14 -7,0" fill="rgba(255,255,255,0.55)"/>
      </g>

      {/* Labels near nodes */}
      <text x="200" y="370" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(167,139,250,0.6)" letterSpacing="3">TOKEN MASTER · ETHEREUM</text>

      {/* Transaction hashes (decorative) */}
      <text x="40" y="345" fontFamily="monospace" fontSize="7.5" fill="rgba(139,92,246,0.4)">0x4a2f…8c1e → 0x91d0…3fb2</text>
      <text x="40" y="358" fontFamily="monospace" fontSize="7.5" fill="rgba(139,92,246,0.3)">block: #19482601 · gas: 21000</text>

      {/* Corner smart contract tag */}
      <rect x="290" y="340" width="98" height="22" rx="2" fill="rgba(124,58,237,0.2)" stroke="rgba(167,139,250,0.3)" strokeWidth="1"/>
      <text x="339" y="355" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(167,139,250,0.8)" letterSpacing="1">SMART CONTRACT</text>
    </svg>
  );
}

function AICodeAnalyzer() {
  const lines = [
    {y:95,  w:180, col:'#818cf8', indent:0},
    {y:113, w:120, col:'#34d399', indent:16},
    {y:131, w:200, col:'#94a3b8', indent:32},
    {y:149, w:150, col:'#f472b6', indent:32},
    {y:167, w:220, col:'#94a3b8', indent:32},
    {y:185, w:90,  col:'#818cf8', indent:16},
    {y:203, w:160, col:'#34d399', indent:32},
    {y:221, w:130, col:'#fbbf24', indent:32},
    {y:239, w:200, col:'#94a3b8', indent:32},
    {y:257, w:80,  col:'#818cf8', indent:16},
    {y:275, w:170, col:'#34d399', indent:16},
    {y:293, w:60,  col:'#818cf8', indent:0},
  ];
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes ac-scan  { 0%{transform:translateY(-20px);opacity:0} 40%{opacity:1} 100%{transform:translateY(260px);opacity:0} }
        @keyframes ac-blink { 0%,100%{opacity:1} 49%{opacity:1} 50%{opacity:0} 99%{opacity:0} }
        @keyframes ac-type  { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes ac-slide { from{transform:translateX(-10px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes ac-glow  { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .ac-scan   { animation:ac-scan 3.5s ease-in-out infinite; }
        .ac-cursor { animation:ac-blink 1s step-end infinite; }
        .ac-badge  { animation:ac-glow 2s ease-in-out infinite; }
        .ac-line   { animation:ac-slide 0.5s ease-out both; }
      `}</style>
      <defs>
        <linearGradient id="ac-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#020617"/>
          <stop offset="50%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#1e293b"/>
        </linearGradient>
        <linearGradient id="ac-scan-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(99,102,241,0)"/>
          <stop offset="50%" stopColor="rgba(99,102,241,0.18)"/>
          <stop offset="100%" stopColor="rgba(99,102,241,0)"/>
        </linearGradient>
        <filter id="ac-gf">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#ac-bg)"/>

      {/* Terminal window chrome */}
      <rect x="30" y="50" width="340" height="320" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(99,102,241,0.25)" strokeWidth="1"/>
      {/* Title bar */}
      <rect x="30" y="50" width="340" height="28" rx="6" fill="rgba(30,41,59,0.95)"/>
      <rect x="30" y="64" width="340" height="14" fill="rgba(30,41,59,0.95)"/>
      {/* Traffic lights */}
      <circle cx="50" cy="64" r="5" fill="#ff5f57"/>
      <circle cx="66" cy="64" r="5" fill="#febc2e"/>
      <circle cx="82" cy="64" r="5" fill="#28c840"/>
      {/* Window title */}
      <text x="200" y="68" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(148,163,184,0.6)" letterSpacing="1">AI CODE ANALYZER — analysis.js</text>

      {/* Line numbers */}
      {lines.map((l,i) => (
        <text key={i} x="48" y={l.y+1} textAnchor="end" fontFamily="monospace" fontSize="9" fill="rgba(71,85,105,0.7)">{i+1}</text>
      ))}
      {/* Vertical line number divider */}
      <line x1="52" y1="80" x2="52" y2="310" stroke="rgba(71,85,105,0.3)" strokeWidth="1"/>

      {/* Code lines */}
      {lines.map((l,i) => (
        <rect
          key={i}
          className="ac-line"
          x={58 + l.indent}
          y={l.y - 9}
          width={l.w}
          height="8"
          rx="2"
          fill={l.col}
          fillOpacity="0.75"
          style={{animationDelay:`${i*0.06}s`}}
        />
      ))}

      {/* AI scan beam */}
      <rect className="ac-scan" x="52" y="80" width="310" height="28" fill="url(#ac-scan-g)" rx="2"/>

      {/* AI badge (bottom right) */}
      <g className="ac-badge">
        <rect x="268" y="315" width="88" height="26" rx="3" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
        <text x="312" y="332" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(165,180,252,0.9)" letterSpacing="1.5">AI SCAN ✓</text>
      </g>

      {/* Bottom status bar */}
      <rect x="30" y="342" width="340" height="28" rx="0" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
      <rect x="30" y="355" width="340" height="15" fill="rgba(99,102,241,0.12)"/>

      {/* Cursor */}
      <rect className="ac-cursor" x="58" y="311" width="7" height="11" rx="1" fill="rgba(165,180,252,0.8)"/>

      {/* Status bar text */}
      <text x="44" y="360" fontFamily="monospace" fontSize="8" fill="rgba(99,102,241,0.8)" letterSpacing="1">JS · UTF-8 · LF</text>
      <text x="200" y="360" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(52,211,153,0.7)" letterSpacing="1">3 issues detected · MERN</text>
      <text x="358" y="360" textAnchor="end" fontFamily="monospace" fontSize="8" fill="rgba(148,163,184,0.5)" letterSpacing="1">Ln 12</text>

      {/* Error markers */}
      <circle cx="355" cy="149" r="5" fill="rgba(248,113,113,0.8)"/>
      <text x="355" y="153" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fff">!</text>
      <circle cx="355" cy="221" r="5" fill="rgba(251,191,36,0.8)"/>
      <text x="355" y="225" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#1e293b">!</text>
    </svg>
  );
}

function YellowStone() {
  const cols = [
    { label:'TO DO',  color:'#f97316', cards:['User Auth', 'Dashboard UI', 'API Routes'] },
    { label:'IN PROG',color:'#fbbf24', cards:['AI Tasks', 'Team Module'] },
    { label:'DONE',   color:'#4ade80', cards:['DB Schema', 'Auth Flow', 'Deploy'] },
  ];
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes ys-bar  { from{width:0} to{width:var(--w)} }
        @keyframes ys-pulse{ 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ys-float{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .ys-bar1 { --w:70%; animation:ys-bar 1.8s ease-out forwards; }
        .ys-bar2 { --w:45%; animation:ys-bar 1.8s 0.2s ease-out forwards; }
        .ys-bar3 { --w:88%; animation:ys-bar 1.8s 0.4s ease-out forwards; }
        .ys-ai   { animation:ys-pulse 2s ease-in-out infinite; }
        .ys-card { animation:ys-float 3s ease-in-out infinite; }
        .ys-c2   { animation-delay:0.5s; }
        .ys-c3   { animation-delay:1s; }
      `}</style>
      <defs>
        <linearGradient id="ys-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c0a00"/>
          <stop offset="50%" stopColor="#2d1800"/>
          <stop offset="100%" stopColor="#1a1200"/>
        </linearGradient>
        <linearGradient id="ys-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
        <linearGradient id="ys-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#4ade80"/>
        </linearGradient>
        <filter id="ys-gf">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#ys-bg)"/>

      {/* Subtle dot grid */}
      {Array.from({length:8}, (_,row) =>
        Array.from({length:10}, (_,col) =>
          <circle key={`${row}-${col}`} cx={20+col*42} cy={20+row*42} r="1" fill="rgba(251,191,36,0.12)"/>
        )
      )}

      {/* Glow orb */}
      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(251,191,36,0.04)" strokeWidth="1"/>
      <ellipse cx="200" cy="160" rx="120" ry="80" fill="rgba(249,115,22,0.06)" filter="url(#ys-gf)"/>

      {/* Kanban header */}
      <text x="200" y="42" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgba(251,191,36,0.7)" letterSpacing="3">YELLOW STONE · PROJECT AI</text>
      <line x1="40" y1="50" x2="360" y2="50" stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>

      {/* Kanban columns */}
      {cols.map((col, ci) => {
        const x = 38 + ci * 112;
        return (
          <g key={ci}>
            {/* Column header */}
            <rect x={x} y="60" width="100" height="20" rx="2" fill={`${col.color}22`} stroke={`${col.color}55`} strokeWidth="1"/>
            <text x={x+50} y="74" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={col.color} letterSpacing="1">{col.label}</text>

            {/* Cards */}
            {col.cards.map((card, ki) => (
              <g key={ki} className={ki===1 ? 'ys-card ys-c2' : ki===2 ? 'ys-card ys-c3' : 'ys-card'}>
                <rect x={x} y={88+ki*52} width="100" height="42" rx="3"
                  fill="rgba(30,20,5,0.8)" stroke={`${col.color}40`} strokeWidth="1"/>
                <rect x={x} y={88+ki*52} width="3" height="42" rx="1" fill={col.color} fillOpacity="0.8"/>
                <text x={x+10} y={104+ki*52} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.75)" letterSpacing="0.5">{card}</text>
                {/* Progress mini bar */}
                <rect x={x+10} y={114+ki*52} width="80" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
                <rect x={x+10} y={114+ki*52} width={[55,35,72,80,55,72][ci*3+ki]||50} height="3" rx="1" fill={col.color} fillOpacity="0.7"/>
              </g>
            ))}
          </g>
        );
      })}

      {/* Progress bars section */}
      <text x="40" y="268" fontFamily="monospace" fontSize="9" fill="rgba(251,191,36,0.6)" letterSpacing="2">SPRINT PROGRESS</text>
      {[
        {label:'Design',  pct:70, color:'#f97316'},
        {label:'Backend', pct:45, color:'#fbbf24'},
        {label:'Deploy',  pct:88, color:'#4ade80'},
      ].map(({label, pct, color}, i) => (
        <g key={i}>
          <text x="40" y={290+i*22} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.5)">{label}</text>
          <rect x="100" y={281+i*22} width="200" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
          <rect x="100" y={281+i*22} width={pct*2} height="6" rx="3" fill={color} fillOpacity="0.75"
            className={`ys-bar${i+1}`}/>
          <text x="308" y={290+i*22} fontFamily="monospace" fontSize="8" fill={color}>{pct}%</text>
        </g>
      ))}

      {/* AI assistant badge */}
      <g className="ys-ai">
        <rect x="280" y="270" width="92" height="60" rx="4" fill="rgba(249,115,22,0.12)" stroke="rgba(251,191,36,0.4)" strokeWidth="1"/>
        <text x="326" y="293" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(251,191,36,0.9)">AI</text>
        <text x="326" y="307" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="rgba(255,255,255,0.5)" letterSpacing="1">ASSISTANT</text>
        <text x="326" y="320" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(74,222,128,0.7)">● ACTIVE</text>
      </g>

      {/* Bottom strip */}
      <line x1="40" y1="358" x2="360" y2="358" stroke="rgba(251,191,36,0.15)" strokeWidth="1"/>
      <text x="200" y="374" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="rgba(251,191,36,0.4)" letterSpacing="2">MERN · AI · TASK MANAGEMENT</text>
    </svg>
  );
}

function CodeHawks() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes ch-scan  { from{transform:translateY(0);opacity:0.8} to{transform:translateY(220px);opacity:0} }
        @keyframes ch-pulse { 0%,100%{opacity:1;r:28} 50%{opacity:0.6;r:32} }
        @keyframes ch-rain  { from{transform:translateY(-40px)} to{transform:translateY(420px)} }
        @keyframes ch-glow  { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes ch-crack { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
        .ch-scan  { animation:ch-scan 2.8s ease-in infinite; }
        .ch-scan2 { animation:ch-scan 2.8s 1.4s ease-in infinite; }
        .ch-shield{ animation:ch-pulse 2.5s ease-in-out infinite; transform-origin:200px 185px; }
        .ch-r1    { animation:ch-rain 3s -0.5s linear infinite; }
        .ch-r2    { animation:ch-rain 3.5s -1.2s linear infinite; }
        .ch-r3    { animation:ch-rain 4s -2s linear infinite; }
        .ch-glow  { animation:ch-glow 2s ease-in-out infinite; }
        .ch-crack { stroke-dasharray:100; animation:ch-crack 1.5s 1s ease-out forwards; }
      `}</style>
      <defs>
        <linearGradient id="ch-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0000"/>
          <stop offset="50%" stopColor="#1a0500"/>
          <stop offset="100%" stopColor="#0f0000"/>
        </linearGradient>
        <linearGradient id="ch-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7f1d1d"/>
          <stop offset="100%" stopColor="#450a0a"/>
        </linearGradient>
        <linearGradient id="ch-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444"/>
          <stop offset="100%" stopColor="#991b1b"/>
        </linearGradient>
        <filter id="ch-gf">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ch-sm">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#ch-bg)"/>

      {/* Matrix rain columns */}
      {['10110', '01001', '11010', '00111', '10001', '01110'].map((txt, i) => (
        <text key={i} className={i%3===0?'ch-r1':i%3===1?'ch-r2':'ch-r3'}
          x={30+i*62} y="0" fontFamily="monospace" fontSize="10" fill="rgba(239,68,68,0.18)"
          style={{animationDelay:`${i*0.5}s`}}>
          {txt.split('').map((c,j) => <tspan key={j} x={30+i*62} dy="14">{c}</tspan>)}
        </text>
      ))}

      {/* Shield glow */}
      <ellipse cx="200" cy="185" rx="80" ry="90" fill="rgba(185,28,28,0.12)" filter="url(#ch-gf)"/>

      {/* Shield body */}
      <path d="M 200 95 L 270 125 L 270 200 Q 270 255 200 280 Q 130 255 130 200 L 130 125 Z"
        fill="url(#ch-shield)" stroke="rgba(239,68,68,0.6)" strokeWidth="2"/>
      {/* Shield inner */}
      <path d="M 200 110 L 256 136 L 256 198 Q 256 245 200 265 Q 144 245 144 198 L 144 136 Z"
        fill="rgba(0,0,0,0.4)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>

      {/* Crack */}
      <path className="ch-crack" d="M 200 115 L 215 155 L 195 175 L 210 210"
        fill="none" stroke="rgba(252,165,165,0.8)" strokeWidth="2" strokeLinecap="round"/>

      {/* Bug icon inside shield */}
      <circle cx="200" cy="185" r="22" fill="rgba(185,28,28,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5"/>
      {/* Bug body */}
      <ellipse cx="200" cy="187" rx="8" ry="11" fill="rgba(239,68,68,0.8)"/>
      {/* Bug head */}
      <circle cx="200" cy="174" r="6" fill="rgba(239,68,68,0.9)"/>
      {/* Bug legs */}
      <line x1="192" y1="181" x2="183" y2="176" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>
      <line x1="192" y1="187" x2="182" y2="185" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>
      <line x1="192" y1="193" x2="183" y2="196" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>
      <line x1="208" y1="181" x2="217" y2="176" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>
      <line x1="208" y1="187" x2="218" y2="185" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>
      <line x1="208" y1="193" x2="217" y2="196" stroke="rgba(252,165,165,0.7)" strokeWidth="1.5"/>

      {/* Scan line */}
      <rect className="ch-scan" x="130" y="95" width="140" height="3" rx="1" fill="rgba(239,68,68,0.6)"/>
      <rect className="ch-scan2" x="130" y="95" width="140" height="2" rx="1" fill="rgba(252,165,165,0.4)"/>

      {/* Vulnerability badges */}
      <rect x="32" y="295" width="110" height="22" rx="2" fill="rgba(185,28,28,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>
      <text x="87" y="310" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(252,165,165,0.9)" letterSpacing="1">REENTRANCY ×2</text>

      <rect x="152" y="295" width="96" height="22" rx="2" fill="rgba(120,53,15,0.4)" stroke="rgba(249,115,22,0.5)" strokeWidth="1"/>
      <text x="200" y="310" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(253,186,116,0.9)" letterSpacing="1">OVERFLOW ×1</text>

      <rect x="258" y="295" width="110" height="22" rx="2" fill="rgba(30,58,138,0.3)" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
      <text x="313" y="310" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(165,180,252,0.9)" letterSpacing="1">ACCESS CTL</text>

      {/* Hex code */}
      <text x="40" y="334" fontFamily="monospace" fontSize="8" fill="rgba(239,68,68,0.35)" letterSpacing="0.5">{'function withdraw() { (bool ok,) = msg.sender.call{value:bal}(""); }'}</text>
      <text x="40" y="349" fontFamily="monospace" fontSize="8" fill="rgba(239,68,68,0.35)" letterSpacing="0.5">{'// ⚠ Missing reentrancy guard — critical vulnerability'}</text>

      <text x="200" y="380" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(239,68,68,0.5)" letterSpacing="3">CODEHAWKS · CYFRIN · CTF</text>
    </svg>
  );
}

function WomenSafety() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <style>{`
        @keyframes ws-ping  { 0%{r:8;opacity:1} 100%{r:60;opacity:0} }
        @keyframes ws-ping2 { 0%{r:8;opacity:0.8} 100%{r:50;opacity:0} }
        @keyframes ws-sos   { 0%,100%{opacity:1;fill:#ef4444} 50%{opacity:0.4;fill:#fca5a5} }
        @keyframes ws-scan  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ws-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes ws-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes ws-path  { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
        .ws-ping  { animation:ws-ping  2.5s ease-out infinite; }
        .ws-ping2 { animation:ws-ping2 2.5s 0.8s ease-out infinite; }
        .ws-sos   { animation:ws-sos 1.2s ease-in-out infinite; }
        .ws-radar { animation:ws-scan 4s linear infinite; transform-origin:200px 185px; }
        .ws-pin   { animation:ws-float 2.5s ease-in-out infinite; }
        .ws-cursor{ animation:ws-blink 1s step-end infinite; }
        .ws-path  { stroke-dasharray:500; animation:ws-path 3s ease-out forwards; }
      `}</style>
      <defs>
        <linearGradient id="ws-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#03111a"/>
          <stop offset="50%" stopColor="#0c1f2e"/>
          <stop offset="100%" stopColor="#1a0a0a"/>
        </linearGradient>
        <linearGradient id="ws-pin-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171"/>
          <stop offset="100%" stopColor="#dc2626"/>
        </linearGradient>
        <radialGradient id="ws-radar-g" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(239,68,68,0.25)"/>
          <stop offset="100%" stopColor="rgba(239,68,68,0)"/>
        </radialGradient>
        <filter id="ws-gf">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="ws-circle-clip">
          <circle cx="200" cy="185" r="110"/>
        </clipPath>
      </defs>

      <rect width="400" height="400" fill="url(#ws-bg)"/>

      {/* Map grid */}
      {[60,100,140,180,220,260,300].map(y =>
        <line key={`h${y}`} x1="30" y1={y} x2="370" y2={y} stroke="rgba(56,189,248,0.08)" strokeWidth="1"/>
      )}
      {[60,100,140,180,220,260,300,340].map(x =>
        <line key={`v${x}`} x1={x} y1="30" x2={x} y2="340" stroke="rgba(56,189,248,0.08)" strokeWidth="1"/>
      )}

      {/* Map roads (decorative) */}
      <path className="ws-path" d="M 60 200 Q 130 195 200 185 Q 270 175 340 190"
        fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="8"/>
      <path className="ws-path" d="M 80 120 Q 160 150 200 185 Q 240 220 320 260"
        fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="5"
        style={{animationDelay:'0.3s'}}/>

      {/* Radar rings */}
      {[30,60,90].map((r,i) => (
        <circle key={r} cx="200" cy="185" r={r}
          fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1"
          strokeDasharray={i===0?'':'4 6'}/>
      ))}

      {/* Radar sweep */}
      <g className="ws-radar" clipPath="url(#ws-circle-clip)">
        <path d="M 200 185 L 200 85 A 100 100 0 0 1 300 185 Z"
          fill="url(#ws-radar-g)" opacity="0.5"/>
        <line x1="200" y1="185" x2="200" y2="85"
          stroke="rgba(239,68,68,0.6)" strokeWidth="1.5"/>
      </g>

      {/* Ping circles from pin */}
      <circle className="ws-ping"  cx="200" cy="185" r="8" fill="none" stroke="#ef4444" strokeWidth="2"/>
      <circle className="ws-ping2" cx="200" cy="185" r="8" fill="none" stroke="#f87171" strokeWidth="1.5"/>

      {/* GPS Pin */}
      <g className="ws-pin">
        <filter id="ws-pin-gf">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <circle cx="200" cy="180" r="18" fill="rgba(239,68,68,0.2)" filter="url(#ws-pin-gf)"/>
        <path d="M 200 135 C 185 135 172 148 172 163 C 172 181 200 215 200 215 C 200 215 228 181 228 163 C 228 148 215 135 200 135 Z"
          fill="url(#ws-pin-g)" stroke="rgba(252,165,165,0.5)" strokeWidth="1.5" filter="url(#ws-gf)"/>
        <circle cx="200" cy="163" r="8" fill="rgba(255,255,255,0.9)"/>
        <circle cx="200" cy="163" r="4" fill="#dc2626"/>
      </g>

      {/* Secondary locations */}
      <circle cx="140" cy="150" r="5" fill="rgba(56,189,248,0.6)"/>
      <circle cx="270" cy="160" r="4" fill="rgba(56,189,248,0.5)"/>
      <circle cx="155" cy="235" r="4" fill="rgba(56,189,248,0.4)"/>

      {/* SOS button */}
      <circle cx="200" cy="320" r="32" fill="rgba(185,28,28,0.3)" stroke="rgba(239,68,68,0.5)" strokeWidth="2"/>
      <circle cx="200" cy="320" r="26" fill="rgba(239,68,68,0.8)" className="ws-sos"/>
      <text x="200" y="325" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="#fff" letterSpacing="2">SOS</text>

      {/* Info strips */}
      <rect x="30" y="345" width="120" height="22" rx="2" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
      <text x="90" y="360" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(56,189,248,0.8)" letterSpacing="1">GPS ACTIVE ●</text>

      <rect x="160" y="345" width="80" height="22" rx="2" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
      <text x="200" y="360" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(252,165,165,0.8)" letterSpacing="1">FIREBASE</text>

      <rect x="250" y="345" width="120" height="22" rx="2" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.3)" strokeWidth="1"/>
      <text x="310" y="360" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(74,222,128,0.8)" letterSpacing="1">ALERT SENT ✓</text>

      <text x="200" y="390" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(239,68,68,0.4)" letterSpacing="2.5">ANDROID · JAVA · SAFETY APP</text>
    </svg>
  );
}

const ILLUSTRATIONS = {
  'Stock GPT':                   StockGPT,
  'Token Master':                TokenMaster,
  'AI Code Analyzer':            AICodeAnalyzer,
  'Yellow Stone':                YellowStone,
  'CodeHawks Eggstravaganza 2025': CodeHawks,
  'Women Safety App':            WomenSafety,
};

export default function ProjectIllustration({ title, gradient }) {
  const Component = ILLUSTRATIONS[title];
  if (Component) return <Component />;
  // Fallback: keep the original gradient box
  return <div style={{ width: '100%', height: '100%', background: gradient }} />;
}
