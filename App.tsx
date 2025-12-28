
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  BookOpen, TrendingUp, ShieldCheck, Globe, 
  ArrowRight, Info, Award, Check, Filter, MousePointer2
} from 'lucide-react';
import { PAPER_INFO, TARIFF_DATA, WELFARE_MIC_2025, NASH_TARIFFS } from './constants';

// --- Components ---

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-slate-800 tracking-tight hidden sm:inline">美中经济冲突研究</span>
      </div>
      <nav className="flex gap-6 text-sm font-medium text-slate-600">
        <a href="#abstract" className="hover:text-blue-600 transition-colors">摘要</a>
        <a href="#tariffs" className="hover:text-blue-600 transition-colors">关税分析</a>
        <a href="#subsidies" className="hover:text-blue-600 transition-colors">产业政策</a>
        <a href="#nash" className="hover:text-blue-600 transition-colors">博弈论</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-xs bg-slate-100 px-3 py-1.5 rounded-full font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
          English Version
        </button>
      </div>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section id="abstract" className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6">
          <Award className="w-3.5 h-3.5" />
          JOURNAL OF MONETARY ECONOMICS (2024)
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] serif-font mb-6">
          {PAPER_INFO.title}
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          本研究通过扩展 Caliendo 和 Parro (2015) 模型，首次对美中贸易战与产业政策竞争的影响及相互作用进行了定量评估。
          研究核心揭示了规模经济（Economies of Scale）在高科技领域冲突中的决定性作用。
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-10">
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 作者：{PAPER_INFO.authors}</span>
          <span className="flex items-center gap-1 font-mono">DOI: {PAPER_INFO.doi}</span>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" /> 研究摘要核心发现
          </h3>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">01.</span>
              <span>“中国制造2025”的补贴在基准校准下往往能同时改善中美两国的福利。</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">02.</span>
              <span>若中国不报复，美国能从关税中获利；若中国已实施产业补贴，美国获利空间更大。</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">03.</span>
              <span>非合作纳什均衡下，双方均倾向于实施高关税，导致双输局面。</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">04.</span>
              <span>相比进口关税，合理实施的产业补贴产生的扭曲较少。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const CustomTariffTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-2xl rounded-xl border border-slate-100 max-w-sm">
        <p className="font-bold text-slate-900 mb-2 border-b pb-1">{label}</p>
        {payload.map((p: any, index: number) => (
          <div key={index} className="flex justify-between items-center gap-4 mb-1">
            <span className="text-xs text-slate-500" style={{ color: p.color }}>● {p.name}:</span>
            <span className="font-mono font-bold text-slate-700">{p.value}%</span>
          </div>
        ))}
        {data.isMIC2025 && (
          <div className="mt-3 pt-2 border-t border-blue-50 bg-blue-50/50 p-2 rounded-lg">
            <div className="flex items-center gap-1.5 text-blue-700 text-[10px] font-bold uppercase mb-1">
              <ShieldCheck className="w-3 h-3" /> 中国制造2025 重点行业
            </div>
            <p className="text-[10px] text-blue-600 leading-tight">
              该行业被认定为具有强“规模经济”效应的高科技领域，是美国301条款调查及关税升级的核心目标。
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const TariffChartSection: React.FC = () => {
  const [view, setView] = useState<'wave1' | 'wave5'>('wave1');
  const [highlightedIndustries, setHighlightedIndustries] = useState<string[]>([]);
  const [visibleTariffs, setVisibleTariffs] = useState<{us: boolean, cn: boolean}>({us: true, cn: true});

  const toggleIndustry = (industry: string) => {
    setHighlightedIndustries(prev => 
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const isHighlighted = (industry: string) => 
    highlightedIndustries.length === 0 || highlightedIndustries.includes(industry);

  const industries = useMemo(() => TARIFF_DATA.map(d => d.industry), []);

  return (
    <section id="tariffs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 serif-font mb-4">关税升级动态分析</h2>
            <p className="text-slate-600 mb-6">
              特朗普政府的“301条款”调查专门针对“中国制造2025”支持的高科技行业。下方图表展示了各行业的加征关税水平，您可以点击右侧面板或图例进行交互。
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setView('wave1')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'wave1' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  第一阶段 (Wave 1)
                </button>
                <button 
                  onClick={() => setView('wave5')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'wave5' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  最终阶段 (Wave 5)
                </button>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setVisibleTariffs(p => ({...p, us: !p.us}))}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${visibleTariffs.us ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${visibleTariffs.us ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                  美国加征
                </button>
                <button 
                  onClick={() => setVisibleTariffs(p => ({...p, cn: !p.cn}))}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${visibleTariffs.cn ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${visibleTariffs.cn ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                  中国反制
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-80 w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 self-stretch">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Filter className="w-4 h-4" /> 高亮特定行业
              </h4>
              {highlightedIndustries.length > 0 && (
                <button 
                  onClick={() => setHighlightedIndustries([])}
                  className="text-[10px] text-blue-600 font-bold uppercase hover:underline"
                >
                  清除选择
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 border ${
                    highlightedIndustries.includes(industry) 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {highlightedIndustries.includes(industry) && <Check className="w-3 h-3" />}
                  {industry.split(' (')[0]}
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 p-3 bg-white rounded-xl border border-slate-100">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-normal">
                提示：<span className="font-bold">MIC 2025</span> 行业包含化学品、计算机、电气设备、机械和机动车。这些是研究中定义的“战略性补贴”重点。
              </p>
            </div>
          </div>
        </div>

        <div className="h-[550px] w-full bg-slate-50 p-6 rounded-[40px] border border-slate-100 relative group">
          <div className="absolute top-4 right-10 flex items-center gap-2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <MousePointer2 className="w-3 h-3" /> 悬停查看 MIC 2025 详情
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={TARIFF_DATA}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
              <XAxis type="number" unit="%" axisLine={false} tickLine={false} />
              <YAxis 
                type="category" 
                dataKey="industry" 
                width={160} 
                axisLine={false} 
                tickLine={false}
                tick={({ x, y, payload }) => {
                  const data = TARIFF_DATA.find(d => d.industry === payload.value);
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={-10}
                        y={0}
                        dy={4}
                        textAnchor="end"
                        fill={isHighlighted(payload.value) ? "#1e293b" : "#94a3b8"}
                        fontSize={11}
                        fontWeight={data?.isMIC2025 ? 700 : 400}
                        className="transition-colors duration-300"
                      >
                        {payload.value}
                        {data?.isMIC2025 && " *"}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip content={<CustomTariffTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
              
              {visibleTariffs.us && (
                <Bar 
                  name="对华加征关税 (US on CN)" 
                  dataKey={view === 'wave1' ? 'wave1_cn_us' : 'wave5_cn_us'} 
                  radius={[0, 4, 4, 0]} 
                  barSize={14}
                >
                  {TARIFF_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-us-${index}`} 
                      fill="#ef4444" 
                      fillOpacity={isHighlighted(entry.industry) ? 1 : 0.15}
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              )}
              
              {visibleTariffs.cn && (
                <Bar 
                  name="中方反制关税 (CN on US)" 
                  dataKey={view === 'wave1' ? 'wave1_us_cn' : 'wave5_us_cn'} 
                  radius={[0, 4, 4, 0]} 
                  barSize={14}
                >
                  {TARIFF_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-cn-${index}`} 
                      fill="#3b82f6" 
                      fillOpacity={isHighlighted(entry.industry) ? 1 : 0.15}
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-6 text-[10px] text-slate-400 italic text-center">
          * 带星号的行业属于“中国制造2025”重点领域。数据来源：论文 Table 1。通过交互面板可探索不同波次的关税广度与深度。
        </p>
      </div>
    </section>
  );
};

const WelfareRadarSection: React.FC = () => {
  return (
    <section id="subsidies" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold serif-font mb-6 leading-tight">
              产业补贴的全球涟漪效应：<br/>双赢的可能性？
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              研究发现，中国对其高科技行业的补贴（MIC 2025）通过规模经济效应降低了全球中间品价格。
              在这种基准校准下，美国甚至能从中获益（福利增长 0.44%），主要是由于中间产品价格的下降。
            </p>
            <div className="space-y-4">
              {WELFARE_MIC_2025.map((item) => (
                <div key={item.entity} className="group cursor-default">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-semibold">{item.entity}</span>
                    <span className={`font-mono font-bold ${item.welfare > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.welfare > 0 ? '+' : ''}{item.welfare}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 group-hover:opacity-80 ${item.welfare > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.abs(item.welfare) * 20}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-slate-500">
              注：数据基于 MIC 2025 统一补贴率为 -7.96% 的模拟结果。日本是唯一在基准情景下福利受损的主要经济体。
            </p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-[40px] border border-slate-700">
            <h3 className="text-center font-bold mb-8 text-blue-400">福利构成要素解析 (中国)</h3>
            <div className="h-[400px]">
              {/* Radar charts can be added back if needed, focusing on App content logic */}
            </div>
            <p className="text-center text-xs text-slate-500 mt-4 px-4 italic">
              规模经济效应（Scale Economy）是中国在产业补贴中获益的最核心驱动力。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const NashComparison: React.FC = () => (
  <section id="nash" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-slate-900 serif-font mb-4">非合作纳什均衡与“关税陷阱”</h2>
        <p className="text-slate-600">
          在非合作纳什博弈中，无论是为了改善贸易条件还是纠正资源错配，美中两国最终都会落入高关税的陷阱。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {NASH_TARIFFS.map((scenario, idx) => (
          <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-8">
              {scenario.scenario}
            </div>
            
            <div className="flex justify-around w-full mb-10 text-center">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">美国纳什关税</p>
                <p className="text-3xl font-black text-slate-800">{scenario.usTariff}%</p>
              </div>
              <div className="w-px bg-slate-200 h-12 self-center"></div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">中国纳什关税</p>
                <p className="text-3xl font-black text-slate-800">{scenario.cnTariff}%</p>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                <span className="text-sm font-medium text-slate-600">美国福利变动</span>
                <span className="font-mono text-red-500 font-bold">{scenario.usWelfare}%</span>
              </div>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                <span className="text-sm font-medium text-slate-600">中国福利变动</span>
                <span className="font-mono text-red-500 font-bold">{scenario.cnWelfare}%</span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-red-600 font-bold text-sm">
              <Globe className="w-4 h-4" /> 全球福利净损失
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-blue-600 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-4 serif-font">向产业政策竞争的转向</h3>
          <p className="text-blue-100 mb-6">
            论文指出，如果美国通过如《芯片与科学法案》等政策补贴自己的高科技产业，纳什均衡下的最优反应将是显著降低对华关税。
            这种政策组合能将美国福利提升 0.26%，即便是在中国报复的情况下。
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors">
            查看政策细节 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-400/30">
            <div className="text-blue-200 text-xs mb-1 uppercase font-bold">美国补贴率</div>
            <div className="text-2xl font-bold">9.59%</div>
          </div>
          <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-400/30">
            <div className="text-blue-200 text-xs mb-1 uppercase font-bold">美国修正关税</div>
            <div className="text-2xl font-bold">5.57%</div>
          </div>
          <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-400/30 col-span-2">
            <div className="text-blue-200 text-xs mb-1 uppercase font-bold">政策影响分析</div>
            <div className="text-lg leading-snug">补贴相比关税对进口价格的扭曲更小，更能有效解决资源错配。</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-100 py-12 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-slate-800 p-1 rounded-md">
              <TrendingUp className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">美中经济冲突可视化实验室</span>
          </div>
          <p className="text-sm text-slate-500">
            本平台致力于通过严谨的计量经济学模型，直观展示全球贸易与产业政策竞争的复杂动力机制。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">相关链接</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">ScienceDirect 原文</li>
              <li className="hover:text-blue-600 cursor-pointer">OECD ICIO 数据库</li>
              <li className="hover:text-blue-600 cursor-pointer">Caliendo-Parro 模型</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">作者单位</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>清华大学</li>
              <li>香港浸会大学</li>
              <li>香港大学</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-400 font-mono">
        &copy; {new Date().getFullYear()} 基于学术研究成果可视化呈现. 
      </div>
    </div>
  </footer>
);

// --- Main App ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* Statistics Banner */}
        <section className="bg-slate-900 py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-around gap-8 text-center">
            <div>
              <div className="text-blue-400 text-sm font-bold uppercase mb-1">覆盖国家</div>
              <div className="text-3xl font-bold text-white">6个</div>
            </div>
            <div>
              <div className="text-blue-400 text-sm font-bold uppercase mb-1">覆盖行业</div>
              <div className="text-3xl font-bold text-white">44个</div>
            </div>
            <div>
              <div className="text-blue-400 text-sm font-bold uppercase mb-1">基准模型</div>
              <div className="text-3xl font-bold text-white uppercase">C-P 2015</div>
            </div>
            <div>
              <div className="text-blue-400 text-sm font-bold uppercase mb-1">关键变量</div>
              <div className="text-3xl font-bold text-white uppercase">规模经济</div>
            </div>
          </div>
        </section>

        <TariffChartSection />
        <WelfareRadarSection />
        <NashComparison />

        {/* Dynamic Conclusion Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white p-12 rounded-[50px] shadow-2xl shadow-blue-900/10 border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 serif-font mb-10 text-center">结论与启示</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex gap-4">
                  <div className="bg-blue-50 p-3 rounded-2xl h-fit">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">政策理性</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      研究为中美两国的贸易保护和产业补贴提供了一种经济学理性的解释：在具有强规模经济的高科技领域，单边政策具有改变竞争格局的激励。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-50 p-3 rounded-2xl h-fit">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">全球合作</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      全球协调的产业政策能够显著提升所有国家的福利，特别是发展中国家获益更多，这证明了“政策沟通”优于“单边冲突”。
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100 text-center italic text-slate-400 text-sm">
                “与其迫使他国削减补贴，建立自主的补贴架构可能是更有效的战略转向。”
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
