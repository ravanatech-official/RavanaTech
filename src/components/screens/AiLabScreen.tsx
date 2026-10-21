import React, { useState } from 'react';
import type { UserCvProfile, MdrRecord } from '../../types.ts';

interface AiLabScreenProps {
  isActive: boolean;
  onNavigate: (screenId: string) => void;
  onOpenCvEditor: () => void;
  userProfile: UserCvProfile;
}

export const AiLabScreen: React.FC<AiLabScreenProps> = ({
  isActive,
  onNavigate,
  onOpenCvEditor,
  userProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'doc' | 'pipe' | 'swarm' | 'radar' | 'cv'>('doc');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // TAB 1: DOC SAMPLES STATE
  const docSamples: Record<string, {
    id: string;
    title: string;
    discipline: string;
    authority: string;
    status: string;
    date: string;
    filename: string;
    cloudPath: string;
    confidence: string;
    preview: { project: string; pkg: string; dwg: string; spec: string; consultant: string };
  }> = {
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
      preview: {
        project: 'DUBAI MARINA HIGH-RISE TOWER C',
        pkg: 'STRUCTURAL FACADE GLAZING & EXTRUSIONS',
        dwg: 'DWG-STR-4091-SEC-04 (REV C)',
        spec: '08 44 00 - CURTAIN WALL',
        consultant: '"Approved as submitted. Contractor authorized to proceed with fabrication."',
      },
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
      confidence: '100.00%',
      preview: {
        project: 'EMIRATES CEMENT & STEEL CORP',
        pkg: 'PO-90118 (MATERIAL SUPPLY)',
        dwg: 'SUBTOTAL: AED 135,714.28 | VAT (5%): AED 6,785.72',
        spec: 'TOTAL DUE: AED 142,500.00 (NET 30 DAYS)',
        consultant: '3-Way Match Verification: PO #90118 vs GRN #5529 vs Inv #9042 [MATCH CONFIRMED]',
      },
    },
    hvac: {
      id: 'TS-MEP-HVAC-0881',
      title: 'Technical Submittal: Variable Air Volume (VAV) Terminal Units',
      discipline: 'MEP / Mechanical HVAC',
      authority: 'Apex Thermo-Dynamic Solutions Ltd',
      status: 'REV 02 // CODE 2 APPROVED AS NOTED',
      date: '2026-10-17',
      filename: 'RT-EDMS_TS_MEP_HVAC_0881_REV02_REV.pdf',
      cloudPath: '/Google_Cloud/EDMS/2026/MEP/Technical_Submittals/',
      confidence: '99.94%',
      preview: {
        project: 'MECHANICAL VENTILATION & COOLING',
        pkg: 'DDC PRESSURE-INDEPENDENT VAV UNITS',
        dwg: 'DWG-MEP-VAV-LEVEL14',
        spec: 'ASHRAE 90.1-2022 / AHRI 880 CERTIFIED',
        consultant: 'Consultant Note: "Verify acoustic attenuator schedule on Level 14 plant room."',
      },
    },
    ncr: {
      id: 'NCR-QAQC-2026-019',
      title: 'Non-Conformance Report & Corrective Action Protocol',
      discipline: 'QA/QC Quality Assurance',
      authority: 'Ravana QA/QC Directorate // Lead Inspector',
      status: 'REV 01 // CLOSURE AUDIT PENDING',
      date: '2026-10-16',
      filename: 'RT-QA_NCR_2026_019_OPEN.pdf',
      cloudPath: '/Google_Cloud/Quality/NCR_Logs/2026/',
      confidence: '100.00%',
      preview: {
        project: 'BASEMENT B2 PARKING SLAB GRID 4-G',
        pkg: 'Aggregate slump deviation during pour #44',
        dwg: 'CORE COMPRESSIVE RE-TESTING REQUIRED',
        spec: 'ISO 9001:2015 SECTION 8.7',
        consultant: 'Remedial Action Plan submitted by Contractor. Awaiting 28-day cylinder crush lab report.',
      },
    },
  };

  const [activeSampleKey, setActiveSampleKey] = useState<string>('submittal');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStatusText, setScanStatusText] = useState<string>('READY FOR COGNITIVE INGESTION');

  // MDR Register Table State
  const [mdrRows, setMdrRows] = useState<MdrRecord[]>([
    {
      id: 'SUB-STR-2026-0442',
      title: 'Architectural Facade Glazing & Structural Framing',
      discipline: 'Structural',
      revision: 'R03',
      status: 'CODE 1 - APPROVED',
      loggedAt: 'Today, 04:12',
      verifiedBy: 'AI EDMS Core',
    },
    {
      id: 'INV-DXB-2026-9042',
      title: 'Commercial Tax Invoice & Material Delivery Note',
      discipline: 'Commercial',
      revision: 'FINAL',
      status: 'VERIFIED & PO MATCHED',
      loggedAt: 'Today, 03:45',
      verifiedBy: 'AI EDMS Core',
    },
    {
      id: 'TS-MEP-HVAC-0881',
      title: 'Technical Submittal: Variable Air Volume Units',
      discipline: 'MEP Mechanical',
      revision: 'R02',
      status: 'CODE 2 - COMMENTS',
      loggedAt: 'Yesterday',
      verifiedBy: 'AI EDMS Core',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyText = (txt: string, label: string) => {
    navigator.clipboard?.writeText(txt);
    showToast(`Copied ${label} to clipboard!`);
  };

  const triggerScan = (key: string) => {
    setIsScanning(true);
    setScanStatusText('EXTRACTING COGNITIVE METADATA VIA OCR...');
    setTimeout(() => {
      setScanStatusText('VALIDATING ISO 9001 EDMS SCHEMA...');
    }, 600);
    setTimeout(() => {
      setIsScanning(false);
      setScanStatusText('VERIFIED & SYNCHRONIZED');
      showToast(`Document ${docSamples[key]?.id} parsed & schema-verified!`);
    }, 1200);
  };

  const handleSelectPreset = (key: string) => {
    setActiveSampleKey(key);
    triggerScan(key);
  };

  const handleAddToMdr = () => {
    const s = docSamples[activeSampleKey];
    if (!s) return;
    const newRecord: MdrRecord = {
      id: s.id,
      title: s.title,
      discipline: s.discipline.split('&')[0].trim(),
      revision: s.status.includes('REV') ? s.status.split('//')[0].trim() : 'REV 01',
      status: s.status.includes('//') ? s.status.split('//')[1].trim() : s.status,
      loggedAt: 'Just Now',
      verifiedBy: 'Shanthapriya (AI Controller)',
    };
    setMdrRows([newRecord, ...mdrRows]);
    showToast(`Logged ${s.id} into Master Document Register!`);
  };

  const handleExportCsv = () => {
    let csv = 'Doc Number,Title,Discipline,Revision,Status,Logged At,Verified By\n';
    mdrRows.forEach((r) => {
      csv += `"${r.id}","${r.title}","${r.discipline}","${r.revision}","${r.status}","${r.loggedAt}","${r.verifiedBy}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RAVANA_TECH_MDR_EXPORT_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('MDR Register exported to CSV!');
  };

  // TAB 2: PIPELINE STATE
  const [pipelineFilter, setPipelineFilter] = useState('');
  const [pipelineProcessing, setPipelineProcessing] = useState(false);
  const rawData = [
    { id: 'REC-001', entity: 'Apex Construction LLC', phone: '+971 4 398 2210', date: '2026-10-18', vat: 'TRN-10029381', status: 'CLEAN' },
    { id: 'REC-002', entity: 'Gulf Marine Services', phone: '+971 2 644 1900', date: '2026-10-18', vat: 'TRN-10098471', status: 'DEDUPLICATED' },
    { id: 'REC-003', entity: 'Dubai Silicon Logistics', phone: '+971 4 883 4511', date: '2026-10-17', vat: 'TRN-10077432', status: 'CLEAN' },
    { id: 'REC-004', entity: 'Ceylon Electrics Colombo', phone: '+94 11 258 7741', date: '2026-10-17', vat: 'VAT-99201940', status: 'CLEAN' },
    { id: 'REC-005', entity: 'Emaar Hospitality Group', phone: '+971 4 367 3333', date: '2026-10-16', vat: 'TRN-10011294', status: 'CLEAN' },
    { id: 'REC-006', entity: 'Red Sea Petrochemical Ltd', phone: '+966 12 654 3210', date: '2026-10-16', vat: 'KSA-30048192', status: 'STANDARDIZED' },
  ];
  const filteredRawData = rawData.filter(
    (r) =>
      r.id.toLowerCase().includes(pipelineFilter.toLowerCase()) ||
      r.entity.toLowerCase().includes(pipelineFilter.toLowerCase()) ||
      r.vat.toLowerCase().includes(pipelineFilter.toLowerCase())
  );

  // TAB 3: AGENT SWARM STATE
  const [swarmRunning, setSwarmRunning] = useState(false);
  const [swarmLogs, setSwarmLogs] = useState<Array<{ time: string; agent: string; msg: string; color: string }>>([
    { time: '[04:12:01]', agent: 'SYSTEM', msg: 'Swarm initialized. Autonomous monitoring online.', color: '#00FF88' },
    { time: '[04:12:03]', agent: 'SENTINEL', msg: 'Listening on Google Cloud EDMS Webhooks & S3 Transmittal Buckets.', color: 'var(--rt-cyan-bright)' },
  ]);

  const dispatchSwarm = () => {
    setSwarmRunning(true);
    const now = () => {
      const d = new Date();
      return `[${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}]`;
    };

    setSwarmLogs((prev) => [
      ...prev,
      { time: now(), agent: 'SENTINEL', msg: 'New drawing transmittal received via Subcontractor Cloud Portal. Handing payload to Cognitive Parser.', color: 'var(--rt-cyan-bright)' },
    ]);

    setTimeout(() => {
      setSwarmLogs((prev) => [
        ...prev,
        { time: now(), agent: 'COGNITIVE', msg: 'Gemini OCR executed in 280ms. Extracted: DWG-STR-4091 Rev C (14 cross-section drawings).', color: '#00FF88' },
      ]);
    }, 800);

    setTimeout(() => {
      setSwarmLogs((prev) => [
        ...prev,
        { time: now(), agent: 'AUDITOR', msg: 'Cross-referenced against Project Spec SEC-084400. Zero clash detected. Assigned: CODE 1 APPROVED.', color: '#FFBB00' },
      ]);
    }, 1800);

    setTimeout(() => {
      setSwarmLogs((prev) => [
        ...prev,
        { time: now(), agent: 'DISPATCHER', msg: 'Normalized: RT-EDMS_SUB_STR_0442_REV03_APP.pdf. Synced to Google Cloud & WhatsApp alert dispatched.', color: '#18C8FF' },
        { time: now(), agent: 'SYSTEM', msg: 'MISSION ACCOMPLISHED: Total Autonomous Swarm Runtime: 2.8 seconds.', color: '#00FF88' },
      ]);
      setSwarmRunning(false);
      showToast('Agent Swarm Mission executed flawlessly in 2.8s!');
    }, 2800);
  };

  // TAB 4: RADAR
  const [radarCategory, setRadarCategory] = useState<'all' | 'models' | 'cloud' | 'devtools'>('all');
  const [selectedRadarItem, setSelectedRadarItem] = useState<string>('gemini');

  const radarItems = [
    { id: 'gemini', name: 'Google AI Studio & Gemini', category: 'models', catLabel: 'CORE COGNITIVE LLM', icon: 'bx-brain', short: 'Multimodal vision, rapid prompt iteration & JSON schema output.', desc: 'Primary cognitive intelligence engine. Enables instant extraction of high-complexity engineering drawings, multi-page submittals, and invoice OCR with zero hallucinations and strict schema enforcement.', stats: { speed: '<300ms latency', usage: 'Document extraction & OCR', roi: '95% faster processing' } },
    { id: 'claude', name: 'Claude 3.5 Sonnet & Claude Code', category: 'models', catLabel: 'HIGH REASONING LLM', icon: 'bx-code-alt', short: 'Deep architectural logic, code generation & document comparison.', desc: 'Leveraged for deep semantic comparison between revised engineering drawings and contract specifications. Excellent for generating custom automation scripts and regulatory compliance checklists.', stats: { speed: 'High precision', usage: 'Revision delta analysis', roi: 'Zero revision collisions' } },
    { id: 'chatgpt', name: 'ChatGPT & OpenAI Codex', category: 'models', catLabel: 'ADVANCED AUTOMATION', icon: 'bx-bot', short: 'Rapid pipeline scripting, regex structuring & synthetic data test sets.', desc: 'Used for formulating mathematical validation formulas, regex cleaning expressions, and transforming messy non-standard customer inquiries into clean database records.', stats: { speed: 'Instantaneous', usage: 'Regex & logic pipelines', roi: '100% data cleaning' } },
    { id: 'firebase', name: 'Firebase Firestore & Cloud Storage', category: 'cloud', catLabel: 'REAL-TIME CLOUD DATABASE', icon: 'bx-data', short: 'Sub-millisecond persistent document registers & inquiries.', desc: 'Production database hosting live transmittal records, customer inquiries, and system state with automatic failover, security rules, and real-time synchronization.', stats: { speed: '<50ms reads/writes', usage: 'Lead & MDR persistence', roi: '100% uptime SLA' } },
    { id: 'gas', name: 'Google App Scripts (GAS)', category: 'cloud', catLabel: 'OFFICE & WORKFLOW MACROS', icon: 'bx-spreadsheet', short: 'Automating Google Sheets, Drive directories & email alerts.', desc: 'Connects spreadsheets directly to AI endpoints. Automatically formats incoming entries, generates PDF transmittals, and dispatches automated status updates without manual intervention.', stats: { speed: 'Serverless', usage: 'Sheets & Drive macros', roi: '4+ hours saved daily' } },
    { id: 'nodejs', name: 'Node.js & Express REST APIs', category: 'devtools', catLabel: 'HIGH-THROUGHPUT BACKEND', icon: 'bxl-nodejs', short: 'Sub-second API endpoints, compression & telemetry.', desc: 'Underlying server architecture serving Ravana Tech applications. Built for industrial speeds (<0.20s load time) with Gzip compression and zero bloat.', stats: { speed: '<0.20s speed', usage: 'API gateway & routing', roi: 'Sub-second latency' } },
  ];

  const filteredRadarItems = radarCategory === 'all' ? radarItems : radarItems.filter((i) => i.category === radarCategory);
  const activeRadarData = radarItems.find((i) => i.id === selectedRadarItem) || radarItems[0];

  // TAB 5: CV STATION
  const [cvViewKey, setCvViewKey] = useState<'doc' | 'data' | 'letter' | 'linkedin'>('doc');

  const activeDoc = docSamples[activeSampleKey] || docSamples.submittal;

  return (
    <section
      className={`ai-lab section deck-screen ${isActive ? 'deck-screen-active' : ''}`}
      id="ai-lab"
      data-screen-index="5"
      data-screen-id="ai-lab"
      data-route="/ai-lab"
      data-title="AI & AUTOMATION LAB // RAVANA TECH | Shanthapriya Silva"
    >
      <div className="ai-lab__container bd-grid">
        {/* Lab Top Banner */}
        <div className="lab-header hud-panel">
          <div className="lab-header__title-group">
            <div className="lab-badge">
              <i className="bx bx-brain" />
              <span>COGNITIVE ENGINEERING LAB</span>
            </div>
            <h2 className="lab-title">SHANTHAPRIYA SILVA // AUTOMATION SPECIALIST</h2>
            <p className="lab-sub">
              ISO 9001 EDMS Document Control • Multimodal AI OCR • Zero-Error Batch Pipelines • Autonomous Swarms
            </p>
          </div>

          <div className="lab-header__actions">
            <button
              type="button"
              className="button button-outline"
              id="btn-lab-back-portfolio"
              onClick={() => onNavigate('contact')}
            >
              <i className="bx bx-arrow-back" />
              RETURN TO PORTFOLIO
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="lab-tabs-bar">
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'doc' ? 'active' : ''}`}
            onClick={() => setActiveTab('doc')}
          >
            <i className="bx bx-scan" />
            <span>01 // AI DOCUMENT CONTROLLER</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'pipe' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipe')}
          >
            <i className="bx bx-data" />
            <span>02 // 0-ERROR PIPELINE</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'swarm' ? 'active' : ''}`}
            onClick={() => setActiveTab('swarm')}
          >
            <i className="bx bx-bot" />
            <span>03 // AGENT SWARM</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'radar' ? 'active' : ''}`}
            onClick={() => setActiveTab('radar')}
          >
            <i className="bx bx-radar" />
            <span>04 // TECH RADAR</span>
          </button>
          <button
            type="button"
            className={`lab-tab-btn ${activeTab === 'cv' ? 'active' : ''}`}
            onClick={() => setActiveTab('cv')}
          >
            <i className="bx bx-file" />
            <span>05 // REAL CV &amp; PLAYBOOK</span>
          </button>
        </div>

        {/* TAB 1: AI DOCUMENT CONTROLLER SIMULATOR */}
        {activeTab === 'doc' && (
          <div className="lab-panel active" id="lab-panel-doc">
            <div className="doc-controller-grid">
              {/* Left Column: Live Document Scanner */}
              <div className="doc-scanner-box hud-panel">
                <span className="hud-corner hud-corner-tl" />
                <span className="hud-corner hud-corner-tr" />
                <span className="hud-corner hud-corner-bl" />
                <span className="hud-corner hud-corner-br" />

                <div className="scanner-header">
                  <div className="scanner-status">
                    <span className={`status-indicator ${isScanning ? 'warning' : 'active'}`} />
                    <span>{scanStatusText}</span>
                  </div>
                  <div className="doc-presets-row">
                    {Object.keys(docSamples).map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={`doc-preset-btn ${activeSampleKey === key ? 'active' : ''}`}
                        onClick={() => handleSelectPreset(key)}
                      >
                        {key.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="scanner-viewport">
                  {isScanning && <div className="scanner-laser-beam scanning" />}
                  <div className="doc-preview-paper" id="doc-preview-content">
                    <div style={{ borderBottom: '1px solid var(--rt-border)', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--rt-cyan-bright)', fontWeight: 700 }}>TRANSMITTAL REF: {activeDoc.id}</span>
                      <span style={{ color: '#00FF88' }}>{activeDoc.status.split('//')[1] || activeDoc.status}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                      <div><strong>PROJECT / ORG:</strong> {activeDoc.preview.project}</div>
                      <div><strong>PACKAGE / REF:</strong> {activeDoc.preview.pkg}</div>
                      <div><strong>RECORD / DRAWING:</strong> {activeDoc.preview.dwg}</div>
                      <div><strong>SPECIFICATION REF:</strong> {activeDoc.preview.spec}</div>
                      <div style={{ marginTop: '8px', color: '#8DBFD8', fontStyle: 'italic' }}>
                        &gt;&gt; Consultant Review: {activeDoc.preview.consultant}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="scanner-actions">
                  <button
                    type="button"
                    className="button"
                    id="btn-run-doc-scan"
                    onClick={() => triggerScan(activeSampleKey)}
                  >
                    <i className="bx bx-scan" />
                    RE-SCAN METADATA
                  </button>
                  <button
                    type="button"
                    className="button button-outline"
                    id="btn-add-to-mdr"
                    onClick={handleAddToMdr}
                  >
                    <i className="bx bx-plus-circle" />
                    LOG TO MDR REGISTER
                  </button>
                </div>
              </div>

              {/* Right Column: Extracted Metadata HUD */}
              <div className="doc-metadata-hud hud-panel">
                <span className="hud-corner hud-corner-tl" />
                <span className="hud-corner hud-corner-tr" />
                <span className="hud-corner hud-corner-bl" />
                <span className="hud-corner hud-corner-br" />

                <div className="meta-hud-header">
                  <h3>COGNITIVE METADATA EXTRACTION</h3>
                  <span className="meta-confidence-badge" id="meta-confidence">
                    CONFIDENCE: {activeDoc.confidence}
                  </span>
                </div>

                <div className="meta-fields-list">
                  <div className="meta-field-row">
                    <span className="meta-label">DOCUMENT NUMBER:</span>
                    <span className="meta-val cyan-text" id="val-doc-id">{activeDoc.id}</span>
                    <button type="button" className="meta-copy-icon" onClick={() => copyText(activeDoc.id, 'Doc Number')}>
                      <i className="bx bx-copy" />
                    </button>
                  </div>

                  <div className="meta-field-row">
                    <span className="meta-label">STATUS &amp; CODE:</span>
                    <span className="meta-val" id="val-doc-status">{activeDoc.status}</span>
                  </div>

                  <div className="meta-field-row">
                    <span className="meta-label">DISCIPLINE:</span>
                    <span className="meta-val" id="val-doc-discipline">{activeDoc.discipline} &amp; {activeDoc.authority}</span>
                  </div>

                  <div className="meta-field-row">
                    <span className="meta-label">TRANSMITTAL DATE:</span>
                    <span className="meta-val" id="val-doc-date">{activeDoc.date}</span>
                  </div>

                  <div className="meta-field-row">
                    <span className="meta-label">STANDARDIZED FILENAME:</span>
                    <span className="meta-val font-mono" id="val-doc-filename">{activeDoc.filename}</span>
                    <button type="button" className="meta-copy-icon" onClick={() => copyText(activeDoc.filename, 'Filename')}>
                      <i className="bx bx-copy" />
                    </button>
                  </div>

                  <div className="meta-field-row">
                    <span className="meta-label">CLOUD ARCHIVE DESTINATION:</span>
                    <span className="meta-val font-mono" id="val-doc-cloudpath">{activeDoc.cloudPath}</span>
                    <button type="button" className="meta-copy-icon" onClick={() => copyText(activeDoc.cloudPath, 'Cloud Path')}>
                      <i className="bx bx-copy" />
                    </button>
                  </div>
                </div>

                <div className="meta-stats-footer">
                  <div>OCR SPEED: <span className="cyan-text">&lt;280ms</span></div>
                  <div>SCHEMA AUDIT: <span style={{ color: '#00FF88' }}>ISO 9001 VERIFIED</span></div>
                </div>
              </div>
            </div>

            {/* Master Document Register (MDR) Table */}
            <div className="mdr-table-box hud-panel" style={{ marginTop: '1.5rem' }}>
              <div className="mdr-table-header">
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#fff' }}>MASTER DOCUMENT REGISTER (MDR) // LIVE LOG</h3>
                  <span className="mdr-counter-tag" id="mdr-counter">{mdrRows.length} ACTIVE LOGS</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" className="button button-outline" id="btn-export-mdr-csv" onClick={handleExportCsv} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    <i className="bx bx-download" /> EXPORT CSV
                  </button>
                </div>
              </div>

              <div className="mdr-table-wrap">
                <table className="mdr-table">
                  <thead>
                    <tr>
                      <th>DOC NUMBER</th>
                      <th>TITLE</th>
                      <th>DISCIPLINE</th>
                      <th>REV</th>
                      <th>STATUS</th>
                      <th>LOGGED</th>
                      <th>VERIFIER</th>
                    </tr>
                  </thead>
                  <tbody id="mdr-tbody">
                    {mdrRows.map((r, i) => (
                      <tr key={i}>
                        <td><code className="cyan-text">{r.id}</code></td>
                        <td>{r.title}</td>
                        <td>{r.discipline}</td>
                        <td><span className="rev-pill">{r.revision}</span></td>
                        <td>
                          <span className={`status-chip ${r.status.includes('APPROV') || r.status.includes('MATCH') ? 'status-approved' : 'status-review'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>{r.loggedAt}</td>
                        <td><span className="author-tag">{r.verifiedBy}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 0-ERROR BATCH DATA PIPELINE */}
        {activeTab === 'pipe' && (
          <div className="lab-panel active" id="lab-panel-pipeline">
            <div className="hud-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>0-ERROR BATCH DATA PIPELINE &amp; REGEX SANITIZER</h3>
                  <p style={{ color: 'var(--rt-text-soft)', fontSize: '0.85rem' }}>
                    Automated duplicate merging, international phone normalization, and VAT number validation.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Search records by ID, company or VAT..."
                    className="gallery-search-input"
                    style={{ width: '280px', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    value={pipelineFilter}
                    onChange={(e) => setPipelineFilter(e.target.value)}
                  />
                  <button
                    type="button"
                    className="button"
                    disabled={pipelineProcessing}
                    onClick={() => {
                      setPipelineProcessing(true);
                      setTimeout(() => {
                        setPipelineProcessing(false);
                        showToast('Batch Pipeline: 50 records cleaned & synced with 0 errors!');
                      }, 900);
                    }}
                  >
                    {pipelineProcessing ? <i className="bx bx-loader-alt bx-spin" /> : <i className="bx bx-check-double" />}
                    EXECUTE BATCH PIPELINE
                  </button>
                </div>
              </div>

              <div className="mdr-table-wrap">
                <table className="mdr-table">
                  <thead>
                    <tr>
                      <th>RECORD ID</th>
                      <th>ORGANIZATION / ENTITY</th>
                      <th>PHONE (E.164 SANITIZED)</th>
                      <th>INGESTION DATE</th>
                      <th>TAX / VAT REGISTRATION</th>
                      <th>PIPELINE STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRawData.map((rec) => (
                      <tr key={rec.id}>
                        <td><code className="cyan-text">{rec.id}</code></td>
                        <td><strong>{rec.entity}</strong></td>
                        <td><span style={{ fontFamily: 'var(--font-mono)', color: '#8DBFD8' }}>{rec.phone}</span></td>
                        <td>{rec.date}</td>
                        <td><code style={{ fontSize: '0.75rem' }}>{rec.vat}</code></td>
                        <td><span className="status-chip status-approved">{rec.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AGENT SWARM */}
        {activeTab === 'swarm' && (
          <div className="lab-panel active" id="lab-panel-swarm">
            <div className="hud-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>AUTONOMOUS AI AGENT SWARM // EVENT BUS TERMINAL</h3>
                  <p style={{ color: 'var(--rt-text-soft)', fontSize: '0.85rem' }}>
                    Multi-agent orchestrator: Sentinel (Ingest) &rarr; Cognitive (Parse) &rarr; Auditor (Verify) &rarr; Dispatcher (Commit).
                  </p>
                </div>
                <button
                  type="button"
                  className="button"
                  disabled={swarmRunning}
                  onClick={dispatchSwarm}
                >
                  {swarmRunning ? <i className="bx bx-loader-alt bx-spin" /> : <i className="bx bx-rocket" />}
                  DISPATCH AUTONOMOUS MISSION
                </button>
              </div>

              <div className="swarm-term-box" id="swarm-term-console" style={{ background: '#020B14', border: '1px solid var(--rt-border)', borderRadius: '6px', padding: '1.25rem', height: '280px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                {swarmLogs.map((log, i) => (
                  <div key={i} className="term-line" style={{ marginBottom: '6px', lineHeight: 1.5 }}>
                    <span className="term-time" style={{ color: '#4B7894' }}>{log.time}</span>{' '}
                    <span className="term-agent" style={{ color: log.color, fontWeight: 700 }}>[{log.agent}]</span>{' '}
                    <span style={{ color: '#D9F5FF' }}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TECH RADAR */}
        {activeTab === 'radar' && (
          <div className="lab-panel active" id="lab-panel-radar">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {(['all', 'models', 'cloud', 'devtools'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`gallery-filter-btn ${radarCategory === cat ? 'active' : ''}`}
                  onClick={() => setRadarCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {filteredRadarItems.map((item) => (
                <div
                  key={item.id}
                  className={`radar-card hud-panel ${selectedRadarItem === item.id ? 'active' : ''}`}
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    border: selectedRadarItem === item.id ? '1px solid var(--rt-cyan-bright)' : '1px solid var(--rt-border-subtle)',
                  }}
                  onClick={() => setSelectedRadarItem(item.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <i className={`bx ${item.icon}`} style={{ fontSize: '1.6rem', color: 'var(--rt-cyan-bright)' }} />
                    <span className="rcard-cat" style={{ fontSize: '0.72rem', color: 'var(--rt-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {item.catLabel}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--rt-text-soft)' }}>{item.short}</p>
                </div>
              ))}
            </div>

            {/* Selected Radar Detail View */}
            <div className="hud-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <i className={`bx ${activeRadarData.icon}`} style={{ fontSize: '2.5rem', color: 'var(--rt-cyan-bright)' }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{activeRadarData.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--rt-cyan)', fontFamily: 'var(--font-mono)' }}>{activeRadarData.catLabel}</span>
                </div>
              </div>
              <p style={{ color: 'var(--rt-text)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{activeRadarData.desc}</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="hud-stat-chip">
                  <span className="hud-stat-chip__val">{activeRadarData.stats.speed}</span>
                  <span className="hud-stat-chip__lbl">SPEED METRIC</span>
                </div>
                <div className="hud-stat-chip">
                  <span className="hud-stat-chip__val">{activeRadarData.stats.usage}</span>
                  <span className="hud-stat-chip__lbl">PRODUCTION USE</span>
                </div>
                <div className="hud-stat-chip">
                  <span className="hud-stat-chip__val">{activeRadarData.stats.roi}</span>
                  <span className="hud-stat-chip__lbl">BUSINESS ROI</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CV STATION */}
        {activeTab === 'cv' && (
          <div className="lab-panel active" id="lab-panel-cv">
            <div className="hud-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>VERIFIED CURRICULUM VITAE // SHANTHAPRIYA SILVA</h3>
                  <p style={{ color: 'var(--rt-text-soft)', fontSize: '0.85rem' }}>
                    Document Controller &amp; Data Entry Specialist • Open to UAE / Gulf Relocation &amp; Worldwide Remote.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="button"
                    id="btn-trigger-edit-cv"
                    onClick={onOpenCvEditor}
                  >
                    <i className="bx bx-edit" />
                    CUSTOMIZE REAL CV
                  </button>
                  <button
                    type="button"
                    className="button button-outline"
                    id="btn-my-cv"
                    onClick={() => {
                      const plainText = `${userProfile.name}\n${userProfile.title}\nPhone: ${userProfile.phone} | Email: ${userProfile.email}\nLocation: ${userProfile.location}\n\nPROFILE:\n${userProfile.profile}\n\nSKILLS:\n${userProfile.skills.join('\n')}`;
                      copyText(plainText, 'Full CV');
                    }}
                  >
                    <i className="bx bx-copy" />
                    COPY CV TEXT
                  </button>
                </div>
              </div>

              {/* Subtabs for CV variants */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--rt-border-subtle)', paddingBottom: '0.75rem' }}>
                <button
                  type="button"
                  className={`gallery-filter-btn ${cvViewKey === 'doc' ? 'active' : ''}`}
                  onClick={() => setCvViewKey('doc')}
                >
                  DOCUMENT CONTROLLER CV
                </button>
                <button
                  type="button"
                  className={`gallery-filter-btn ${cvViewKey === 'data' ? 'active' : ''}`}
                  onClick={() => setCvViewKey('data')}
                >
                  DATA ENTRY CV
                </button>
                <button
                  type="button"
                  className={`gallery-filter-btn ${cvViewKey === 'letter' ? 'active' : ''}`}
                  onClick={() => setCvViewKey('letter')}
                >
                  COVER LETTER
                </button>
                <button
                  type="button"
                  className={`gallery-filter-btn ${cvViewKey === 'linkedin' ? 'active' : ''}`}
                  onClick={() => setCvViewKey('linkedin')}
                >
                  LINKEDIN PLAYBOOK
                </button>
              </div>

              {/* CV Document Box */}
              <div className="cv-reader-box" id="cv-reader-box">
                <div className="cv-paper">
                  <h1>{userProfile.name}</h1>
                  <div className="cv-title-tag">{userProfile.title}</div>
                  <div className="cv-contact-row">
                    <span><i className="bx bx-envelope" /> {userProfile.email}</span>
                    <span><i className="bx bxl-whatsapp" /> {userProfile.phone}</span>
                    <span><i className="bx bx-globe" /> <a href={userProfile.portfolioUrl} target="_blank" rel="noreferrer">ravanatec.web.app/ai-lab</a></span>
                    <span><i className="bx bx-map" /> {userProfile.location}</span>
                  </div>

                  {userProfile.rawCv ? (
                    <div className="cv-section" style={{ marginTop: '1.5rem' }}>
                      <div className="cv-section-title">REAL CURRICULUM VITAE // VERIFIED PROFILE</div>
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', color: '#D0E8F5', lineHeight: 1.6, fontSize: '0.88rem', background: 'rgba(0, 191, 255, 0.04)', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--rt-border)' }}>
                        {userProfile.rawCv}
                      </pre>
                    </div>
                  ) : (
                    <>
                      <div className="cv-section">
                        <div className="cv-section-title">EXECUTIVE PROFILE</div>
                        <p style={{ color: '#D0E8F5', lineHeight: 1.6 }}>{userProfile.profile}</p>
                      </div>

                      <div className="cv-section">
                        <div className="cv-section-title">CORE SKILLS &amp; TECHNICAL EXPERTISE</div>
                        <ul className="cv-bullet-list">
                          {userProfile.skills.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="cv-section">
                        <div className="cv-section-title">PROFESSIONAL EXPERIENCE</div>
                        {Array.isArray(userProfile.experience) ? (
                          userProfile.experience.map((exp, idx) => (
                            <div key={idx} className="cv-item" style={{ marginBottom: '1.25rem' }}>
                              <div className="cv-item-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <span className="cv-item-role" style={{ color: 'var(--rt-cyan-bright)', fontWeight: 700 }}>{exp.role}</span>
                                <span className="cv-item-company" style={{ color: '#fff' }}>{exp.company}</span>
                                <span className="cv-item-date" style={{ color: '#8DBFD8', fontFamily: 'var(--font-mono)' }}>{exp.dates}</span>
                              </div>
                              <ul className="cv-bullet-list">
                                {exp.bullets.map((b, bIdx) => (
                                  <li key={bIdx}>{b}</li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{userProfile.experience}</pre>
                        )}
                      </div>

                      <div className="cv-section">
                        <div className="cv-section-title">EDUCATION &amp; CERTIFICATIONS</div>
                        <ul className="cv-bullet-list">
                          {userProfile.education.map((e, idx) => (
                            <li key={idx}>{e}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HUD Toast */}
        {toastMessage && (
          <div className="lab-toast" style={{ position: 'fixed', bottom: '5rem', right: '2rem', zIndex: 9999, background: 'var(--rt-bg-card)', border: '1px solid var(--rt-cyan-bright)', padding: '0.75rem 1.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', boxShadow: '0 0 20px rgba(0,191,255,0.4)' }}>
            <i className="bx bx-check-circle" style={{ color: 'var(--rt-cyan-bright)' }} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
};
