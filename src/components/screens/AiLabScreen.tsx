import React, { useState, useEffect } from 'react';
import { ScreenId } from '../Header';

interface AiLabScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onToast: (msg: string, icon?: string) => void;
}

interface DocSample {
  id: string;
  title: string;
  discipline: string;
  authority: string;
  status: string;
  date: string;
  filename: string;
  cloudPath: string;
  confidence: string;
  previewHtml: string;
}

const DOC_SAMPLES: Record<string, DocSample> = {
  submittal: {
    id: 'SUB-STR-2026-0442',
    title: 'Architectural Facade Glazing & Structural Framing Submittal',
    discipline: 'Structural & Architectural',
    authority: 'Al-Farooq Façade LLC // Consultant: Dar Al-Handasah',
    status: 'REV 03 // CODE 1 APPROVED',
    date: '2026-10-18',
    filename: 'RT-EDMS_SUB_STR_0442_REV03_APP.pdf',
    cloudPath: '/Google_Cloud/EDMS/2026/Structural/Submittals/Approved/',
    confidence: '99.98%',
    previewHtml: `
      <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
        <span style="color:var(--rt-cyan-bright); font-weight:700;">TRANSMITTAL REF: SUB-STR-2026-0442</span>
        <span style="color:#00FF88;">CODE 1 // NO COMMENTS</span>
      </div>
      <div style="font-size:0.75rem; line-height:1.5;">
        <div><strong>PROJECT:</strong> DUBAI MARINA HIGH-RISE TOWER C</div>
        <div><strong>PACKAGE:</strong> STRUCTURAL FACADE GLAZING & EXTRUSIONS</div>
        <div><strong>DRAWING NO:</strong> DWG-STR-4091-SEC-04 (REV C)</div>
        <div><strong>SPECIFICATION REF:</strong> 08 44 00 - CURTAIN WALL</div>
        <div style="margin-top:6px; color:#8DBFD8; font-style:italic;">
          &gt;&gt; Consultant Review: "Approved as submitted. Contractor authorized to proceed with fabrication."
        </div>
      </div>
    `
  },
  invoice: {
    id: 'INV-DXB-2026-9042',
    title: 'Commercial Tax Invoice & Material Delivery Note',
    discipline: 'Commercial & Procurement',
    authority: 'Emirates Cement & Steel Corporation',
    status: 'ORIGINAL // PO-90118 MATCHED (100%)',
    date: '2026-10-18',
    filename: 'RT-COMM_INV_DXB_9042_PO90118.pdf',
    cloudPath: '/Google_Cloud/Accounts/Invoices/2026/Matched_PO/',
    confidence: '100%',
    previewHtml: `
      <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
        <span style="color:var(--rt-cyan-bright); font-weight:700;">INVOICE: INV-DXB-2026-9042</span>
        <span style="color:#00FF88;">VAT VERIFIED 5%</span>
      </div>
      <div style="font-size:0.75rem; line-height:1.5;">
        <div><strong>SUPPLIER:</strong> EMIRATES CEMENT & STEEL CORP (TRN 10029481900003)</div>
        <div><strong>PURCHASE ORDER:</strong> PO-90118 (LINE ITEM 04 - REBAR 16MM)</div>
        <div><strong>SUBTOTAL:</strong> AED 135,714.28 | <strong>VAT:</strong> AED 6,785.72</div>
        <div><strong>TOTAL DUE:</strong> AED 142,500.00 &bull; 30 DAYS NET</div>
        <div style="margin-top:6px; color:#00FF88; font-weight:600;">
          &gt;&gt; Auto-Match: Goods Received Note GRN-8819 verified by warehouse scanner.
        </div>
      </div>
    `
  },
  hvac: {
    id: 'TS-MEP-HVAC-0881',
    title: 'Technical Submittal: High-Efficiency Variable Air Volume (VAV) Terminal Units',
    discipline: 'MEP / Mechanical',
    authority: 'Apex Thermo-Dynamic Solutions Ltd',
    status: 'REV 02 // CODE 2 APPROVED WITH COMMENTS',
    date: '2026-10-17',
    filename: 'RT-EDMS_TS_MEP_HVAC_0881_REV02_REV.pdf',
    cloudPath: '/Google_Cloud/EDMS/2026/MEP/Technical_Submittals/',
    confidence: '99.94%',
    previewHtml: `
      <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
        <span style="color:var(--rt-cyan-bright); font-weight:700;">SUBMITTAL: TS-MEP-HVAC-0881</span>
        <span style="color:#FFBB00;">CODE 2 // APPROVED W/ COMMENTS</span>
      </div>
      <div style="font-size:0.75rem; line-height:1.5;">
        <div><strong>CAPACITY:</strong> 450 &ndash; 2800 CFM | <strong>ACOUSTIC:</strong> NC 32</div>
        <div><strong>STANDARD:</strong> ASHRAE 90.1-2022 &amp; ESTIDAMA 2-PEARL</div>
        <div><strong>COMMENT:</strong> Resubmit acoustic attenuator baffle details for record.</div>
      </div>
    `
  },
  ncr: {
    id: 'NCR-QAQC-2026-019',
    title: 'Non-Conformance Report & Remedial Corrective Action Protocol',
    discipline: 'QA/QC Quality Assurance',
    authority: 'Ravana QA/QC Directorate // Main Contractor',
    status: 'OPEN // UNDER TECHNICAL REVIEW',
    date: '2026-10-16',
    filename: 'RT-QA_NCR_2026_019_OPEN.pdf',
    cloudPath: '/Google_Cloud/Quality/NCR_Logs/2026/',
    confidence: '100%',
    previewHtml: `
      <div style="border-bottom: 1px solid var(--rt-border); padding-bottom: 6px; margin-bottom: 8px; display:flex; justify-content:space-between;">
        <span style="color:var(--rt-cyan-bright); font-weight:700;">NCR REF: NCR-QAQC-2026-019</span>
        <span style="color:#FF5555;">SEVERITY LEVEL 2</span>
      </div>
      <div style="font-size:0.75rem; line-height:1.5;">
        <div><strong>LOCATION:</strong> PODIUM LEVEL 2 CORE WALL POUR #18</div>
        <div><strong>DEFICIENCY:</strong> Concrete slump deviation during batch delivery.</div>
        <div><strong>REMEDIAL ACTION:</strong> Core compressive re-testing scheduled.</div>
      </div>
    `
  }
};

const SAMPLE_RAW_DATA = [
  { id: 'REC-001', entity: 'Apex Construction LLC', phone: '+971 4 398 2210', date: '2026-10-18', vat: 'TRN-10029381', status: 'CLEAN' },
  { id: 'REC-002', entity: 'Gulf Marine Services', phone: '+971 2 644 1900', date: '2026-10-18', vat: 'TRN-10098471', status: 'DEDUPLICATED' },
  { id: 'REC-003', entity: 'Dubai Silicon Logistics', phone: '+971 4 883 4511', date: '2026-10-17', vat: 'TRN-10077432', status: 'CLEAN' },
  { id: 'REC-004', entity: 'Ceylon Electrics Colombo', phone: '+94 11 258 7741', date: '2026-10-17', vat: 'VAT-99201940', status: 'CLEAN' },
  { id: 'REC-005', entity: 'Emaar Hospitality Group', phone: '+971 4 367 3333', date: '2026-10-16', vat: 'TRN-10011294', status: 'CLEAN' },
  { id: 'REC-006', entity: 'Red Sea Petrochemical Ltd', phone: '+966 12 654 3210', date: '2026-10-16', vat: 'KSA-30048192', status: 'STANDARDIZED' },
  { id: 'REC-007', entity: 'Colombo Port Dredging Co', phone: '+94 11 445 9000', date: '2026-10-15', vat: 'VAT-88492011', status: 'CLEAN' },
  { id: 'REC-008', entity: 'Al Naboodah MEP Contracting', phone: '+971 4 294 8888', date: '2026-10-15', vat: 'TRN-10088921', status: 'CLEAN' },
  { id: 'REC-009', entity: 'Doka Formwork Systems UAE', phone: '+971 4 870 8700', date: '2026-10-14', vat: 'TRN-10044591', status: 'DEDUPLICATED' },
  { id: 'REC-010', entity: 'Ravana Tech Infrastructure', phone: '+94 78 847 0610', date: '2026-10-14', vat: 'SL-2026-9901', status: 'CLEAN' }
];

const TECH_ITEMS = [
  {
    id: 'gemini',
    name: 'Google AI Studio & Gemini',
    category: 'models',
    catLabel: 'CORE COGNITIVE LLM',
    icon: 'bx-brain',
    short: 'Multimodal vision, rapid prompt iteration & JSON schema output.',
    desc: 'Utilized as the primary cognitive intelligence engine. Enables instant extraction of high-complexity engineering drawings, multi-page submittals, and invoice OCR with zero hallucinations and strict schema enforcement.',
    stats: { speed: '<300ms latency', usage: 'Document extraction & OCR', roi: '95% faster processing' }
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet & Claude Code',
    category: 'models',
    catLabel: 'HIGH REASONING LLM',
    icon: 'bx-code-alt',
    short: 'Deep architectural logic, code generation & document comparison.',
    desc: 'Leveraged for deep semantic comparison between revised engineering drawings and contract specifications. Excellent for generating custom automation scripts and regulatory compliance checklists.',
    stats: { speed: 'High precision', usage: 'Revision delta analysis', roi: 'Zero revision collisions' }
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT & OpenAI Codex',
    category: 'models',
    catLabel: 'ADVANCED AUTOMATION',
    icon: 'bx-bot',
    short: 'Rapid pipeline scripting, regex structuring & synthetic data test sets.',
    desc: 'Used for formulating mathematical validation formulas, regex cleaning expressions, and transforming messy non-standard customer inquiries into clean database records.',
    stats: { speed: 'Instant synthesis', usage: 'Regex & data cleaning', roi: '100% format accuracy' }
  },
  {
    id: 'firebase',
    name: 'Firebase & Cloud Run',
    category: 'cloud',
    catLabel: 'SERVERLESS INFRASTRUCTURE',
    icon: 'bx-server',
    short: 'Global low-latency Firestore database, Auth and continuous deployment.',
    desc: 'Powers real-time lead capture, telemetry tracking, and zero-downtime static hosting for high-throughput commercial applications.',
    stats: { speed: '<20ms roundtrip', usage: 'Database & Auth', roi: '99.99% uptime' }
  },
  {
    id: 'react-vite',
    name: 'React 19 & Vite Engine',
    category: 'frameworks',
    catLabel: 'SUPERCHARGED FRONTEND',
    icon: 'bx-bolt-circle',
    short: 'Ultra-fast HMR, tiny production bundles, and instant component mounting.',
    desc: 'The foundational UI runtime for the Ravana Tech Command Deck. Guarantees sub-millisecond tab switching and zero UI lag.',
    stats: { speed: '0.4ms render time', usage: 'Client Deck Runtime', roi: '100/100 Core Web Vitals' }
  }
];

const DEFAULT_PROFILE = {
  name: 'SHANTHAPRIYA SILVA',
  title: 'DOCUMENT CONTROLLER & AUTOMATION SPECIALIST',
  phone: '+94 78 847 0610',
  email: 'hello.ravanatech@gmail.com',
  location: 'Open to UAE / Gulf Relocation & Global Remote',
  portfolioUrl: 'https://ravanatec.web.app/ai-lab',
  profile: 'Meticulous and tech-empowered Document Controller & Data Management Specialist with a distinctive competitive edge in AI Workflow Automation and Electronic Document Management Systems (EDMS). Combines strict ISO 9001:2015 document control governance with modern cognitive AI tooling (Google AI Studio, Gemini, Google App Scripts, Cloud Databases) to eliminate manual logging bottlenecks, achieving 100% revision accuracy and accelerating transmittal turnaround by over 80%.',
  experience: [
    {
      role: 'Lead Document Controller & Automation Architect',
      company: 'Ravana Tech',
      dates: '2024 - Present',
      bullets: [
        'Architected and managed cloud EDMS workflows handling 5,000+ digital engineering drawings, technical specifications, and vendor invoices with zero filing collisions or lost revisions.',
        'Automated transmittal ingestion pipelines using AI OCR and Google App Scripts, reducing daily manual logging time from 4.5 hours to under 15 minutes.',
        'Maintained 100% audit-readiness under ISO 9001 document retention protocols, standardizing naming conventions across Civil, MEP, and Architectural packages.',
        'Engineered 0-error batch data extraction pipelines for commercial documents, auto-verifying VAT numbers, line totals, and purchase order cross-references.'
      ]
    },
    {
      role: 'Data Entry & Document Control Specialist',
      company: 'Independent Contracting & Business Services',
      dates: '2022 - 2024',
      bullets: [
        'Triaged and digitized thousands of legacy paper records, vendor submittals, and customer inventories into structured cloud databases with 99.98% verified accuracy.',
        'Formulated standardized data entry templates and automated regex validation scripts that eliminated typographical errors and duplicate records.',
        'Coordinated transmittal distributions between project managers, engineers, and subcontractors, ensuring 24-hour turnaround on urgent RFIs and shop drawings.'
      ]
    }
  ],
  education: [
    'Specialized Training: Electronic Document Management Systems (EDMS), ISO Quality Documentation Standards.',
    'Applied AI & Automation: Google AI Studio, Gemini Flash OCR, Cloud Database Architecture, Prompt Engineering.',
    'Languages: English (Professional Working Proficiency), Sinhala (Native).'
  ],
  skills: [
    'Document Control & EDMS: Master Document Register (MDR), Submittal & Transmittal Ingestion, RFI & NCR Logs, Drawing Revision Control, ISO 9001:2015 Quality Standards.',
    'Data Entry & Validation: High-Speed Touch Typing (75+ WPM / 10,000+ KPH), 100% Zero-Error Schema Validation, 3-Way PO & Invoice Matching, Batch Record Cleansing.',
    'AI & Automation Superpowers: Google AI Studio, Gemini Flash Multimodal OCR, Claude 3.5, Google App Scripts (GAS) macro automation, Firebase Firestore, GitHub, GCP Cloud Storage.',
    'Productivity Suites: Advanced Microsoft Excel (Pivot Tables, Advanced Formulas, VLOOKUP), Google Workspace Cloud Architecture.'
  ],
  rawCv: ''
};

export const AiLabScreen: React.FC<AiLabScreenProps> = ({ onNavigate, onToast }) => {
  const [activeTab, setActiveTab] = useState<'doc-controller' | 'data-pipeline' | 'agent-swarm' | 'tech-radar' | 'ats-cv'>('doc-controller');

  // Tab 1 state
  const [selectedDocKey, setSelectedDocKey] = useState<string>('submittal');
  const [isScanning, setIsScanning] = useState(false);

  // Tab 2 state
  const [pipeSearch, setPipeSearch] = useState('');
  const [isProcessingPipe, setIsProcessingPipe] = useState(false);
  const [pipeMetrics, setPipeMetrics] = useState({ time: '0.42s', dupes: '0 DETECTED', sync: '50 / 50' });

  // Tab 3 state
  const [swarmLogs, setSwarmLogs] = useState<{ time: string; agent: string; text: string; color: string }[]>([
    { time: '[13:00:00]', agent: 'SYSTEM', text: 'Autonomous Swarm Standby. Telemetry online.', color: 'var(--rt-cyan-bright)' }
  ]);
  const [swarmMissionActive, setSwarmMissionActive] = useState(false);

  // Tab 4 state
  const [radarFilter, setRadarFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState(TECH_ITEMS[0]);

  // Tab 5 state
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ravana_user_real_cv');
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch (e) {}
    return DEFAULT_PROFILE;
  });
  const [cvFormat, setCvFormat] = useState<'doc-cv' | 'data-cv' | 'plain-text'>('doc-cv');
  const [isEditingCv, setIsEditingCv] = useState(false);

  const activeDoc = DOC_SAMPLES[selectedDocKey] || DOC_SAMPLES.submittal;

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onToast(`Gemini OCR Extraction Complete (${activeDoc.confidence} Confidence)`, 'bx-check-double');
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      onToast(`Copied ${label}: ${text.slice(0, 30)}...`, 'bx-copy');
    }).catch(() => {
      onToast('Copied to clipboard!', 'bx-check');
    });
  };

  const handleRunPipeline = () => {
    setIsProcessingPipe(true);
    setTimeout(() => {
      setIsProcessingPipe(false);
      setPipeMetrics({ time: '1.18s', dupes: '8 FIXED', sync: '50 / 50' });
      onToast('Batch Pipeline: 50 records cleaned & synced with 0 errors!', 'bx-check-double');
    }, 1000);
  };

  const handleDispatchSwarm = () => {
    if (swarmMissionActive) return;
    setSwarmMissionActive(true);

    const now = () => {
      const d = new Date();
      return `[${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}]`;
    };

    setSwarmLogs(prev => [
      ...prev,
      { time: now(), agent: 'SENTINEL', text: 'New drawing transmittal received via Subcontractor Cloud Portal. Handing payload to Agent Beta.', color: '#00BFFF' }
    ]);

    setTimeout(() => {
      setSwarmLogs(prev => [
        ...prev,
        { time: now(), agent: 'COGNITIVE', text: 'Gemini 2.5 Flash OCR executed in 280ms. Extracted: DWG-STR-4091 Rev C (14 cross-section drawings).', color: '#00FF88' }
      ]);
    }, 800);

    setTimeout(() => {
      setSwarmLogs(prev => [
        ...prev,
        { time: now(), agent: 'AUDITOR', text: 'Cross-referenced against Project Spec SEC-084400. Zero clash detected. Assigned: CODE 1 APPROVED.', color: '#FFBB00' }
      ]);
    }, 1600);

    setTimeout(() => {
      setSwarmLogs(prev => [
        ...prev,
        { time: now(), agent: 'DISPATCHER', text: 'Normalized: RT-EDMS_SUB_STR_0442_REV03_APP.pdf. Synced to Google Cloud & WhatsApp alert dispatched.', color: '#18C8FF' },
        { time: now(), agent: 'SYSTEM', text: 'MISSION ACCOMPLISHED: Total Autonomous Swarm Runtime: 2.4 seconds.', color: '#00FF88' }
      ]);
      setSwarmMissionActive(false);
      onToast('Agent Swarm Mission executed flawlessly in 2.4s!', 'bx-rocket');
    }, 2400);
  };

  const handleSaveProfile = (updated: typeof profile) => {
    setProfile(updated);
    try {
      localStorage.setItem('ravana_user_real_cv', JSON.stringify(updated));
    } catch (e) {}
    setIsEditingCv(false);
    onToast('Verified profile updated live!', 'bx-check-double');
  };

  const filteredRawData = SAMPLE_RAW_DATA.filter(r =>
    !pipeSearch.trim() ||
    r.id.toLowerCase().includes(pipeSearch.toLowerCase()) ||
    r.entity.toLowerCase().includes(pipeSearch.toLowerCase()) ||
    r.vat.toLowerCase().includes(pipeSearch.toLowerCase())
  );

  const filteredTech = TECH_ITEMS.filter(t => radarFilter === 'all' || t.category === radarFilter);

  return (
    <section className="ai-lab section deck-screen deck-screen-active" id="ai-lab">
      <div className="bd-grid">
        <div className="lab-header-banner">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
              AI &amp; AUTOMATION LAB // LIVE SIMULATION SUITE
            </h2>
            <div className="lab-subtitle cyan-text">
              Lead Architect Cognitive Pipelines, Autonomous Agent Telemetry &amp; Verified Systems
            </div>
          </div>
          <button
            type="button"
            className="button button-outline button-small"
            id="btn-lab-back-portfolio"
            onClick={() => onNavigate('home')}
          >
            <i className="bx bx-left-arrow-alt"></i>
            <span>RETURN TO PORTFOLIO</span>
          </button>
        </div>

        {/* Lab Navigation Tabs */}
        <div className="lab-tabs-nav" role="tablist">
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'doc-controller' ? 'active' : ''}`}
            onClick={() => setActiveTab('doc-controller')}
          >
            <i className="bx bx-scan"></i>
            <span>DOCUMENT CONTROLLER SIMULATOR</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'data-pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('data-pipeline')}
          >
            <i className="bx bx-table"></i>
            <span>COGNITIVE DATA PIPELINE</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'agent-swarm' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent-swarm')}
          >
            <i className="bx bx-bot"></i>
            <span>AUTONOMOUS AGENT SWARM</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'tech-radar' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech-radar')}
          >
            <i className="bx bx-radar"></i>
            <span>TECH RADAR MATRIX</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn lab-tab-btn--highlight ${activeTab === 'ats-cv' ? 'active' : ''}`}
            onClick={() => setActiveTab('ats-cv')}
          >
            <i className="bx bx-id-card"></i>
            <span>ATS CV &amp; ARCHITECT PROFILE</span>
          </button>
        </div>
      </div>

      <div className="bd-grid" style={{ marginTop: '1.25rem' }}>
        {/* TAB 1: DOCUMENT CONTROLLER SIMULATOR */}
        {activeTab === 'doc-controller' && (
          <div className="lab-panel active">
            <div className="doc-controller-grid">
              {/* Controls Column */}
              <div className="hud-panel doc-controller-controls">
                <span className="hud-corner hud-corner-tl"></span>
                <span className="hud-corner hud-corner-tr"></span>
                <span className="hud-corner hud-corner-bl"></span>
                <span className="hud-corner hud-corner-br"></span>

                <div className="panel-subhead">SELECT ENGINEERING ARTIFACT</div>
                <div className="doc-sample-buttons">
                  {Object.keys(DOC_SAMPLES).map((key) => {
                    const sample = DOC_SAMPLES[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`doc-sample-btn ${selectedDocKey === key ? 'active' : ''}`}
                        onClick={() => setSelectedDocKey(key)}
                      >
                        <i className="bx bx-file"></i>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: 600 }}>{sample.id}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--rt-text-soft)' }}>
                            {sample.discipline}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="button button-primary"
                  style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                  onClick={handleTriggerScan}
                  disabled={isScanning}
                >
                  <i className={`bx ${isScanning ? 'bx-loader-alt bx-spin' : 'bx-scan'}`}></i>
                  <span>{isScanning ? 'EXTRACTING WITH GEMINI...' : 'EXECUTE COGNITIVE SCAN'}</span>
                </button>

                <div className="doc-meta-extracted" style={{ marginTop: '1.25rem' }}>
                  <div className="meta-row">
                    <span className="meta-label">DISCIPLINE:</span>
                    <span className="meta-val">{activeDoc.discipline}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">CONFIDENCE:</span>
                    <span className="meta-val cyan-text">{activeDoc.confidence}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">STATUS:</span>
                    <span className="meta-val" style={{ color: '#00FF88' }}>{activeDoc.status}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">NORMALIZED FILE:</span>
                    <span className="meta-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      {activeDoc.filename}
                    </span>
                    <button
                      type="button"
                      className="meta-copy-icon"
                      onClick={() => copyToClipboard(activeDoc.filename, 'Filename')}
                      title="Copy filename"
                    >
                      <i className="bx bx-copy"></i>
                    </button>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">CLOUD PATH:</span>
                    <span className="meta-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      {activeDoc.cloudPath}
                    </span>
                    <button
                      type="button"
                      className="meta-copy-icon"
                      onClick={() => copyToClipboard(activeDoc.cloudPath, 'Path')}
                      title="Copy path"
                    >
                      <i className="bx bx-copy"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Column */}
              <div className="hud-panel doc-controller-preview" style={{ position: 'relative', overflow: 'hidden' }}>
                <span className="hud-corner hud-corner-tl"></span>
                <span className="hud-corner hud-corner-tr"></span>
                <span className="hud-corner hud-corner-bl"></span>
                <span className="hud-corner hud-corner-br"></span>

                {isScanning && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'var(--rt-cyan-bright)',
                      boxShadow: '0 0 15px var(--rt-cyan-bright)',
                      animation: 'scanLaser 1.2s infinite ease-in-out'
                    }}
                  />
                )}

                <div className="preview-top-bar">
                  <span className="doc-tag cyan-text">{activeDoc.id}</span>
                  <span className="doc-authority">{activeDoc.authority}</span>
                </div>

                <div
                  className="doc-rendered-html"
                  dangerouslySetInnerHTML={{ __html: activeDoc.previewHtml }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COGNITIVE DATA PIPELINE */}
        {activeTab === 'data-pipeline' && (
          <div className="lab-panel active">
            <div className="hud-panel" style={{ padding: '1.25rem' }}>
              <span className="hud-corner hud-corner-tl"></span>
              <span className="hud-corner hud-corner-tr"></span>
              <span className="hud-corner hud-corner-bl"></span>
              <span className="hud-corner hud-corner-br"></span>

              <div className="pipeline-telemetry-banner">
                <div className="telemetry-box">
                  <span className="t-val cyan-text" id="pipe-time-val">{pipeMetrics.time}</span>
                  <span className="t-label">EXECUTION TIME</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-val" id="pipe-dupes-val" style={{ color: '#00FF88' }}>{pipeMetrics.dupes}</span>
                  <span className="t-label">ANOMALIES RESOLVED</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-val" id="pipe-sync-val">{pipeMetrics.sync}</span>
                  <span className="t-label">VERIFIED RECORDS</span>
                </div>
              </div>

              <div className="pipeline-controls-row" style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <input
                  type="text"
                  className="contact__input"
                  placeholder="FILTER RAW DATA INGESTION STREAM..."
                  value={pipeSearch}
                  onChange={(e) => setPipeSearch(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="button button-primary"
                  onClick={handleRunPipeline}
                  disabled={isProcessingPipe}
                >
                  <i className={`bx ${isProcessingPipe ? 'bx-loader-alt bx-spin' : 'bx-play'}`}></i>
                  <span>{isProcessingPipe ? 'EXECUTING BATCH...' : 'RUN PIPELINE VALIDATION'}</span>
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="lab-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>RECORD ID</th>
                      <th>ENTITY / VENDOR</th>
                      <th>PHONE CONTACT</th>
                      <th>INGEST DATE</th>
                      <th>TAX / VAT REG</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRawData.map((rec) => (
                      <tr key={rec.id}>
                        <td><code className="cyan-text">{rec.id}</code></td>
                        <td><strong>{rec.entity}</strong></td>
                        <td style={{ fontFamily: 'var(--font-mono)', color: '#8DBFD8' }}>{rec.phone}</td>
                        <td>{rec.date}</td>
                        <td><code>{rec.vat}</code></td>
                        <td><span className="status-chip status-approved">{rec.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTONOMOUS AGENT SWARM */}
        {activeTab === 'agent-swarm' && (
          <div className="lab-panel active">
            <div className="agent-swarm-grid">
              {/* Agent Nodes */}
              <div className="agent-nodes-col">
                <div className="agent-card hud-panel">
                  <div className="agent-header">
                    <span className="agent-name cyan-text">AGENT ALPHA // SENTINEL</span>
                    <span className="agent-status-badge status-active">LISTENING</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>
                    Monitors cloud inboxes and subcontractor portals for incoming transmittals.
                  </p>
                </div>

                <div className="agent-card hud-panel">
                  <div className="agent-header">
                    <span className="agent-name cyan-text">AGENT BETA // COGNITIVE PARSER</span>
                    <span className="agent-status-badge">READY</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>
                    Runs multimodal OCR extraction, validates drawing numbers, and cleans tables.
                  </p>
                </div>

                <div className="agent-card hud-panel">
                  <div className="agent-header">
                    <span className="agent-name cyan-text">AGENT GAMMA // AUDITOR</span>
                    <span className="agent-status-badge">READY</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>
                    Cross-references against specification master and code retention policies.
                  </p>
                </div>

                <div className="agent-card hud-panel">
                  <div className="agent-header">
                    <span className="agent-name cyan-text">AGENT DELTA // DISPATCHER</span>
                    <span className="agent-status-badge">READY</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>
                    Commits clean payloads to Google Cloud Storage and sends WhatsApp/email notifications.
                  </p>
                </div>

                <button
                  type="button"
                  className="button button-primary"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                  onClick={handleDispatchSwarm}
                  disabled={swarmMissionActive}
                >
                  <i className={`bx ${swarmMissionActive ? 'bx-loader-alt bx-spin' : 'bx-rocket'}`}></i>
                  <span>{swarmMissionActive ? 'MISSION IN PROGRESS...' : 'DISPATCH AUTONOMOUS MISSION'}</span>
                </button>
              </div>

              {/* Swarm Console */}
              <div className="hud-panel swarm-console-col">
                <span className="hud-corner hud-corner-tl"></span>
                <span className="hud-corner hud-corner-tr"></span>
                <span className="hud-corner hud-corner-bl"></span>
                <span className="hud-corner hud-corner-br"></span>

                <div className="console-header">
                  <span className="status-chip status-active">LIVE SWARM TELEMETRY</span>
                  <button
                    type="button"
                    className="button button-outline button-small"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    onClick={() => setSwarmLogs([])}
                  >
                    CLEAR LOGS
                  </button>
                </div>

                <div className="swarm-term-console" id="swarm-term-console">
                  {swarmLogs.map((log, idx) => (
                    <div key={idx} className="term-line">
                      <span className="term-time">{log.time}</span>{' '}
                      <span className="term-agent" style={{ color: log.color }}>
                        [{log.agent}]
                      </span>{' '}
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TECH RADAR MATRIX */}
        {activeTab === 'tech-radar' && (
          <div className="lab-panel active">
            <div className="radar-layout">
              <div className="radar-cards-col">
                <div className="radar-filters" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {['all', 'models', 'cloud', 'frameworks'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`gallery-filter-btn ${radarFilter === f ? 'active' : ''}`}
                      onClick={() => setRadarFilter(f)}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="radar-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredTech.map((t) => (
                    <div
                      key={t.id}
                      className={`hud-panel ${selectedTech.id === t.id ? 'active-system-card' : ''}`}
                      onClick={() => setSelectedTech(t)}
                      style={{ padding: '0.85rem 1rem', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <i className={`bx ${t.icon} cyan-text`} style={{ fontSize: '1.4rem' }}></i>
                          <div>
                            <strong style={{ fontSize: '0.95rem' }}>{t.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--rt-text-soft)' }}>{t.catLabel}</div>
                          </div>
                        </div>
                        <i className={`bx ${selectedTech.id === t.id ? 'bx-check-double cyan-text' : 'bx-chevron-right'}`}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Inspector */}
              <div className="hud-panel radar-inspector-col" style={{ padding: '1.5rem' }}>
                <span className="hud-corner hud-corner-tl"></span>
                <span className="hud-corner hud-corner-tr"></span>
                <span className="hud-corner hud-corner-bl"></span>
                <span className="hud-corner hud-corner-br"></span>

                <div className="inspector-header">
                  <span className="cyan-text">{selectedTech.catLabel}</span>
                  <span className="status-chip status-approved">{selectedTech.stats.speed}</span>
                </div>

                <h3 style={{ margin: '0.75rem 0 0.5rem' }}>{selectedTech.name}</h3>
                <p style={{ color: 'var(--rt-text-soft)', lineHeight: '1.6' }}>{selectedTech.desc}</p>

                <div className="tech-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <div className="stat-card">
                    <span className="stat-label">LATENCY</span>
                    <span className="stat-value cyan-text" style={{ fontSize: '1rem' }}>{selectedTech.stats.speed}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">PRIMARY USE</span>
                    <span className="stat-value" style={{ fontSize: '0.85rem' }}>{selectedTech.stats.usage}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">ROI IMPACT</span>
                    <span className="stat-value" style={{ fontSize: '0.85rem', color: '#00FF88' }}>{selectedTech.stats.roi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ATS CV & ARCHITECT PROFILE */}
        {activeTab === 'ats-cv' && (
          <div className="lab-panel active">
            <div className="hud-panel" style={{ padding: '1.5rem' }}>
              <span className="hud-corner hud-corner-tl"></span>
              <span className="hud-corner hud-corner-tr"></span>
              <span className="hud-corner hud-corner-bl"></span>
              <span className="hud-corner hud-corner-br"></span>

              <div className="cv-top-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className={`gallery-filter-btn ${cvFormat === 'doc-cv' ? 'active' : ''}`}
                    onClick={() => setCvFormat('doc-cv')}
                  >
                    DOCUMENT CONTROLLER CV
                  </button>
                  <button
                    type="button"
                    className={`gallery-filter-btn ${cvFormat === 'data-cv' ? 'active' : ''}`}
                    onClick={() => setCvFormat('data-cv')}
                  >
                    DATA ENTRY &amp; AI
                  </button>
                  <button
                    type="button"
                    className={`gallery-filter-btn ${cvFormat === 'plain-text' ? 'active' : ''}`}
                    onClick={() => setCvFormat('plain-text')}
                  >
                    PLAIN ATS TEXT
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={() => setIsEditingCv(true)}
                  >
                    <i className="bx bx-edit"></i>
                    <span>EDIT PROFILE</span>
                  </button>

                  <button
                    type="button"
                    className="button button-primary button-small"
                    onClick={() => {
                      const text = `${profile.name}\n${profile.title}\n${profile.email} | ${profile.phone}\n${profile.location}\n\nSUMMARY:\n${profile.profile}\n\nSKILLS:\n${profile.skills.join('\n')}`;
                      copyToClipboard(text, 'Full CV Profile');
                    }}
                  >
                    <i className="bx bx-copy"></i>
                    <span>COPY FORMATTED CV</span>
                  </button>
                </div>
              </div>

              {/* CV Viewer */}
              <div className="cv-paper" style={{ background: 'rgba(2, 15, 24, 0.95)', border: '1px solid var(--rt-border)', padding: '2rem', borderRadius: '4px' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{profile.name}</h1>
                <div className="cv-title-tag cyan-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  {profile.title}
                </div>

                <div className="cv-contact-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--rt-text-soft)', marginBottom: '1.5rem', borderBottom: '1px solid var(--rt-border-subtle)', paddingBottom: '1rem' }}>
                  <span><i className="bx bx-envelope cyan-text"></i> {profile.email}</span>
                  <span><i className="bx bxl-whatsapp cyan-text"></i> {profile.phone}</span>
                  <span><i className="bx bx-map cyan-text"></i> {profile.location}</span>
                  <span><i className="bx bx-globe cyan-text"></i> {profile.portfolioUrl}</span>
                </div>

                <div className="cv-section" style={{ marginBottom: '1.5rem' }}>
                  <div className="cv-section-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--rt-cyan-bright)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    EXECUTIVE SUMMARY
                  </div>
                  <p style={{ color: '#D0E8F5', lineHeight: '1.7' }}>{profile.profile}</p>
                </div>

                <div className="cv-section" style={{ marginBottom: '1.5rem' }}>
                  <div className="cv-section-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--rt-cyan-bright)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    TECHNICAL CORE EXPERTISE
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {profile.skills.map((s: string, idx: number) => (
                      <li key={idx} style={{ color: '#D0E8F5', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span className="cyan-text">&bull;</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cv-section" style={{ marginBottom: '1.5rem' }}>
                  <div className="cv-section-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--rt-cyan-bright)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    PROFESSIONAL EXPERIENCE
                  </div>
                  {profile.experience.map((exp: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <strong style={{ color: 'var(--rt-text)' }}>{exp.role}</strong>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--rt-cyan-bright)', fontSize: '0.85rem' }}>
                          {exp.company} ({exp.dates})
                        </span>
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem' }}>
                        {exp.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx} style={{ color: '#A5C9DE', fontSize: '0.88rem', display: 'flex', gap: '0.5rem' }}>
                            <span className="cyan-text">-</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="cv-section">
                  <div className="cv-section-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--rt-cyan-bright)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    EDUCATION &amp; CREDENTIALS
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {profile.education.map((e: string, idx: number) => (
                      <li key={idx} style={{ color: '#D0E8F5', display: 'flex', gap: '0.5rem' }}>
                        <span className="cyan-text">&bull;</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Editor Modal */}
      {isEditingCv && (
        <div className="gallery-preview-modal is-open" style={{ display: 'flex' }}>
          <div className="modal-backdrop" onClick={() => setIsEditingCv(false)}></div>
          <div className="modal-dialog hud-panel" style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
            <span className="hud-corner hud-corner-tl"></span>
            <span className="hud-corner hud-corner-tr"></span>
            <span className="hud-corner hud-corner-bl"></span>
            <span className="hud-corner hud-corner-br"></span>

            <div className="modal-header-station">
              <h3>EDIT ARCHITECT PROFILE &amp; ATS CV</h3>
              <button type="button" className="modal-close-btn" onClick={() => setIsEditingCv(false)}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>FULL NAME</label>
                <input
                  type="text"
                  className="contact__input"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>TITLE</label>
                <input
                  type="text"
                  className="contact__input"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--rt-text-soft)' }}>EXECUTIVE SUMMARY</label>
                <textarea
                  className="contact__input contact__textarea"
                  rows={4}
                  value={profile.profile}
                  onChange={(e) => setProfile({ ...profile, profile: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="button button-outline button-small"
                  onClick={() => {
                    setProfile(DEFAULT_PROFILE);
                    localStorage.removeItem('ravana_user_real_cv');
                    setIsEditingCv(false);
                    onToast('Profile reset to default templates', 'bx-undo');
                  }}
                >
                  RESET TO DEFAULT
                </button>
                <button
                  type="button"
                  className="button button-primary button-small"
                  onClick={() => handleSaveProfile(profile)}
                >
                  SAVE PROFILE LIVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
