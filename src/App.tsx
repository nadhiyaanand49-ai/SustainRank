import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Building2,
  Trophy,
  BarChart3,
  Sliders,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Code2,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Layers,
  Award,
  Globe,
  Mail,
  MapPin,
  Calendar,
  X,
  Copy,
  Check
} from 'lucide-react';

// Types matching Java Domain Model
export type StartupCategory = 'TechStartup' | 'GreenStartup' | 'HealthStartup' | 'SocialStartup';

export interface StartupItem {
  id: number;
  name: string;
  category: StartupCategory;
  description: string;
  founderName: string;
  location: string;
  yearEstablished: number;
  contactEmail: string;
  environmentalScore: number;
  innovationScore: number;
  socialImpactScore: number;
  financialViabilityScore: number;
  overallScore: number;
  isAssessed: boolean;
  assessmentNotes?: string;
  isDemo: boolean;
  createdAt: string;
  rank?: number;
  // Polymorphic Category Attributes
  primaryTechStack?: string;
  patentCount?: number;
  estimatedCarbonOffsetTons?: number;
  renewableEnergyPercentage?: number;
  clinicalPhase?: string;
  hipaaOrGdprCompliant?: boolean;
  beneficiariesReached?: number;
  unSdgAlignment?: string;
}

const INITIAL_DEMO_STARTUPS: StartupItem[] = [
  {
    id: 1,
    name: 'EcoLoop Packaging',
    category: 'GreenStartup',
    description: 'Biodegradable mycelium packaging solutions replacing single-use styrofoam and plastic film for international e-commerce freight.',
    founderName: 'Dr. Ananya Sharma',
    location: 'Bengaluru, Karnataka',
    yearEstablished: 2022,
    contactEmail: 'contact@ecoloop.in',
    environmentalScore: 94.0,
    innovationScore: 88.0,
    socialImpactScore: 82.0,
    financialViabilityScore: 78.0,
    overallScore: 85.50,
    isAssessed: true,
    assessmentNotes: 'Superior biological lifecycle with 92.5% renewable power in production. High customer retention across logistics hubs.',
    isDemo: true,
    createdAt: '2026-09-15T10:00:00Z',
    estimatedCarbonOffsetTons: 450.0,
    renewableEnergyPercentage: 92.5
  },
  {
    id: 2,
    name: 'NeuroGrid Systems',
    category: 'TechStartup',
    description: 'Decentralized AI algorithms predicting municipal grid peak surges and orchestrating industrial energy storage dispatch in real-time.',
    founderName: 'Vikramaditya Rao',
    location: 'Hyderabad, Telangana',
    yearEstablished: 2021,
    contactEmail: 'hello@neurogrid.ai',
    environmentalScore: 85.0,
    innovationScore: 96.0,
    socialImpactScore: 74.0,
    financialViabilityScore: 89.0,
    overallScore: 86.00,
    isAssessed: true,
    assessmentNotes: 'State-of-the-art grid AI with 3 granted utility patents and live pilot deployments across two state electrical boards.',
    isDemo: true,
    createdAt: '2026-09-18T14:30:00Z',
    primaryTechStack: 'Rust, PyTorch, Apache Kafka, Distributed K8s',
    patentCount: 3
  },
  {
    id: 3,
    name: 'BioPulse Diagnostic Tech',
    category: 'HealthStartup',
    description: 'Point-of-care microfluidic biosensors enabling 15-minute diagnostic panels for underserved rural clinics without cold-chain storage.',
    founderName: 'Dr. Preeti Deshmukh',
    location: 'Pune, Maharashtra',
    yearEstablished: 2023,
    contactEmail: 'info@biopulsehealth.com',
    environmentalScore: 72.0,
    innovationScore: 91.0,
    socialImpactScore: 95.0,
    financialViabilityScore: 70.0,
    overallScore: 82.00,
    isAssessed: true,
    assessmentNotes: 'Profound public health contribution delivering affordable point-of-care diagnostic access across 65 rural clinics.',
    isDemo: true,
    createdAt: '2026-09-20T09:15:00Z',
    clinicalPhase: 'Phase II Validation',
    hipaaOrGdprCompliant: true
  },
  {
    id: 4,
    name: 'JalDharini Solutions',
    category: 'SocialStartup',
    description: 'Community-owned solar atmospheric water generators providing clean potable drinking water to drought-prone agrarian hamlets.',
    founderName: 'Kavita Meena',
    location: 'Jaipur, Rajasthan',
    yearEstablished: 2020,
    contactEmail: 'reach@jaldharini.org',
    environmentalScore: 88.0,
    innovationScore: 80.0,
    socialImpactScore: 96.0,
    financialViabilityScore: 68.0,
    overallScore: 83.00,
    isAssessed: true,
    assessmentNotes: 'Grassroots rural water security impact directly benefiting 38,000 villagers with zero fossil fuel expenditure.',
    isDemo: true,
    createdAt: '2026-09-22T11:45:00Z',
    beneficiariesReached: 38000,
    unSdgAlignment: 'SDG 6 (Clean Water), SDG 7 (Affordable Energy), SDG 5 (Gender Equality)'
  },
  {
    id: 5,
    name: 'AgriSense Vision',
    category: 'TechStartup',
    description: 'Precision agricultural drones and hyperspectral computer vision minimizing chemical runoff and optimizing irrigation water.',
    founderName: 'Rohan Joshi',
    location: 'Chennai, Tamil Nadu',
    yearEstablished: 2024,
    contactEmail: 'founders@agrisense.io',
    environmentalScore: 81.0,
    innovationScore: 85.0,
    socialImpactScore: 80.0,
    financialViabilityScore: 74.0,
    overallScore: 80.00,
    isAssessed: true,
    assessmentNotes: 'Measurable 22% nitrate runoff abatement for smallholder farmer cooperatives across the Cauvery basin.',
    isDemo: true,
    createdAt: '2026-09-25T16:20:00Z',
    primaryTechStack: 'Python, TensorFlow Lite, ROS, Edge OpenCV',
    patentCount: 1
  },
  {
    id: 6,
    name: 'UrbanFlora BioFuels',
    category: 'GreenStartup',
    description: 'Biochemical fermentation transforming organic food residue from metropolitan restaurants into drop-in aviation biofuels and microbial bio-fertilizer.',
    founderName: 'Manoj Nair',
    location: 'Kochi, Kerala',
    yearEstablished: 2025,
    contactEmail: 'contact@urbanflora.bio',
    environmentalScore: 0.0,
    innovationScore: 0.0,
    socialImpactScore: 0.0,
    financialViabilityScore: 0.0,
    overallScore: 0.0,
    isAssessed: false, // Demonstrates pending unassessed state
    isDemo: true,
    createdAt: '2026-09-28T08:00:00Z',
    estimatedCarbonOffsetTons: 820.0,
    renewableEnergyPercentage: 88.0
  }
];

export default function App() {
  // App navigation state
  const [activeTab, setActiveTab] = useState<'app' | 'code' | 'viva'>('app');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'startups' | 'rankings' | 'analytics'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Startups database state with localStorage persistence
  const [startups, setStartups] = useState<StartupItem[]>(() => {
    try {
      const stored = localStorage.getItem('sustainrank_startups_db');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_DEMO_STARTUPS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sustainrank_startups_db', JSON.stringify(startups));
  }, [startups]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Modals & Panels
  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);
  const [dossierStartup, setDossierStartup] = useState<StartupItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<StartupItem | null>(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentTarget, setAssessmentTarget] = useState<StartupItem | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Assessment Form State
  const [evalEnv, setEvalEnv] = useState<number>(50);
  const [evalInnov, setEvalInnov] = useState<number>(50);
  const [evalSoc, setEvalSoc] = useState<number>(50);
  const [evalFin, setEvalFin] = useState<number>(50);
  const [evalNotes, setEvalNotes] = useState<string>('');

  // Calculation Engine (Equal 25% weights)
  const computedOverallScore = useMemo(() => {
    const val = (evalEnv * 0.25) + (evalInnov * 0.25) + (evalSoc * 0.25) + (evalFin * 0.25);
    return Math.round(val * 100) / 100;
  }, [evalEnv, evalInnov, evalSoc, evalFin]);

  // Java Deterministic Ranking Comparator
  const rankedStartups = useMemo(() => {
    // Filter first
    const filtered = startups.filter(s => {
      const matchesName = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.founderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = !selectedCategory || s.category === selectedCategory;
      return matchesName && matchesCat;
    });

    const assessed = filtered.filter(s => s.isAssessed).sort((a, b) => {
      // 1. Overall Score DESC
      if (b.overallScore !== a.overallScore) return b.overallScore - a.overallScore;
      // 2. Environmental Score DESC (Tie-breaker 1)
      if (b.environmentalScore !== a.environmentalScore) return b.environmentalScore - a.environmentalScore;
      // 3. Innovation Score DESC (Tie-breaker 2)
      if (b.innovationScore !== a.innovationScore) return b.innovationScore - a.innovationScore;
      // 4. Social Impact Score DESC (Tie-breaker 3)
      if (b.socialImpactScore !== a.socialImpactScore) return b.socialImpactScore - a.socialImpactScore;
      // 5. Financial Viability Score DESC (Tie-breaker 4)
      if (b.financialViabilityScore !== a.financialViabilityScore) return b.financialViabilityScore - a.financialViabilityScore;
      // 6. Name ASC
      return a.name.localeCompare(b.name);
    });

    // Assign rank numbers
    const rankedWithRank = assessed.map((s, idx) => ({ ...s, rank: idx + 1 }));

    // Unassessed appended without rank
    const unassessed = filtered
      .filter(s => !s.isAssessed)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(s => ({ ...s, rank: undefined }));

    return [...rankedWithRank, ...unassessed];
  }, [startups, searchQuery, selectedCategory]);

  // Dashboard Aggregates
  const stats = useMemo(() => {
    const total = startups.length;
    const assessed = startups.filter(s => s.isAssessed);
    const assessedCount = assessed.length;
    const pendingCount = total - assessedCount;

    const avgOverall = assessedCount > 0
      ? Math.round((assessed.reduce((acc, s) => acc + s.overallScore, 0) / assessedCount) * 10) / 10
      : 0;

    const avgEnv = assessedCount > 0
      ? Math.round((assessed.reduce((acc, s) => acc + s.environmentalScore, 0) / assessedCount) * 10) / 10
      : 0;
    const avgInnov = assessedCount > 0
      ? Math.round((assessed.reduce((acc, s) => acc + s.innovationScore, 0) / assessedCount) * 10) / 10
      : 0;
    const avgSoc = assessedCount > 0
      ? Math.round((assessed.reduce((acc, s) => acc + s.socialImpactScore, 0) / assessedCount) * 10) / 10
      : 0;
    const avgFin = assessedCount > 0
      ? Math.round((assessed.reduce((acc, s) => acc + s.financialViabilityScore, 0) / assessedCount) * 10) / 10
      : 0;

    const topRanked = rankedStartups.find(s => s.isAssessed && s.rank === 1);

    const categoryCounts: Record<StartupCategory, number> = {
      TechStartup: startups.filter(s => s.category === 'TechStartup').length,
      GreenStartup: startups.filter(s => s.category === 'GreenStartup').length,
      HealthStartup: startups.filter(s => s.category === 'HealthStartup').length,
      SocialStartup: startups.filter(s => s.category === 'SocialStartup').length
    };

    return {
      total,
      assessedCount,
      pendingCount,
      avgOverall,
      avgEnv,
      avgInnov,
      avgSoc,
      avgFin,
      topRanked,
      categoryCounts
    };
  }, [startups, rankedStartups]);

  // Actions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Logged in successfully as Administrator.');
    } else {
      setLoginError('Invalid credentials. Use demo account: admin / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('Signed out of SustainRank dashboard.');
  };

  const openAssessment = (startup: StartupItem) => {
    setAssessmentTarget(startup);
    setEvalEnv(startup.isAssessed ? startup.environmentalScore : 50);
    setEvalInnov(startup.isAssessed ? startup.innovationScore : 50);
    setEvalSoc(startup.isAssessed ? startup.socialImpactScore : 50);
    setEvalFin(startup.isAssessed ? startup.financialViabilityScore : 50);
    setEvalNotes(startup.assessmentNotes || '');
    setIsAssessmentOpen(true);
  };

  const saveAssessment = () => {
    if (!assessmentTarget) return;

    setStartups(prev => prev.map(s => {
      if (s.id === assessmentTarget.id) {
        return {
          ...s,
          environmentalScore: evalEnv,
          innovationScore: evalInnov,
          socialImpactScore: evalSoc,
          financialViabilityScore: evalFin,
          overallScore: computedOverallScore,
          isAssessed: true,
          assessmentNotes: evalNotes
        };
      }
      return s;
    }));

    setIsAssessmentOpen(false);
    showToast(`Assessment recorded for "${assessmentTarget.name}". Calculated overall score: ${computedOverallScore.toFixed(2)} / 100.`);
  };

  const deleteStartup = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete startup "${name}"? This action permanently removes the record from the database.`)) {
      setStartups(prev => prev.filter(s => s.id !== id));
      showToast(`Startup "${name}" was successfully removed.`);
      if (dossierStartup?.id === id) setDossierStartup(null);
    }
  };

  const resetDemoData = () => {
    if (window.confirm('Reset all demo startups back to original state?')) {
      setStartups(INITIAL_DEMO_STARTUPS);
      showToast('Demonstration dataset reset to initial 6 ventures.');
    }
  };

  const clearDemoData = () => {
    if (window.confirm('Purge all sample demonstration records from database?')) {
      setStartups(prev => prev.filter(s => !s.isDemo));
      showToast('Purged demonstration records.');
    }
  };

  const exportCSV = () => {
    const headers = ['Rank', 'Startup Name', 'Category', 'Status', 'Overall Score (100)', 'Environmental (25%)', 'Innovation (25%)', 'Social (25%)', 'Financial (25%)', 'Founder', 'Location', 'Year', 'Email', 'Notes'];
    const rows = rankedStartups.map(s => [
      s.rank ? s.rank.toString() : 'Pending',
      `"${s.name.replace(/"/g, '""')}"`,
      s.category,
      s.isAssessed ? 'Assessed' : 'Pending Assessment',
      s.isAssessed ? s.overallScore.toFixed(2) : 'N/A',
      s.isAssessed ? s.environmentalScore.toFixed(1) : 'N/A',
      s.isAssessed ? s.innovationScore.toFixed(1) : 'N/A',
      s.isAssessed ? s.socialImpactScore.toFixed(1) : 'N/A',
      s.isAssessed ? s.financialViabilityScore.toFixed(1) : 'N/A',
      `"${s.founderName.replace(/"/g, '""')}"`,
      `"${s.location.replace(/"/g, '""')}"`,
      s.yearEstablished,
      s.contactEmail,
      `"${(s.assessmentNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sustainrank_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported RFC-4180 CSV file.');
  };

  // Add/Edit Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<StartupCategory>('TechStartup');
  const [formDesc, setFormDesc] = useState('');
  const [formFounder, setFormFounder] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formYear, setFormYear] = useState<number>(2023);
  const [formEmail, setFormEmail] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formPatents, setFormPatents] = useState<number>(0);
  const [formCarbonOffset, setFormCarbonOffset] = useState<number>(0);
  const [formRenewable, setFormRenewable] = useState<number>(0);
  const [formClinical, setFormClinical] = useState('');
  const [formBeneficiaries, setFormBeneficiaries] = useState<number>(0);
  const [formSdg, setFormSdg] = useState('');
  const [formError, setFormError] = useState('');

  const openNewForm = () => {
    setEditingStartup(null);
    setFormName('');
    setFormCategory('TechStartup');
    setFormDesc('');
    setFormFounder('');
    setFormLocation('');
    setFormYear(2023);
    setFormEmail('');
    setFormTechStack('');
    setFormPatents(0);
    setFormCarbonOffset(0);
    setFormRenewable(0);
    setFormClinical('');
    setFormBeneficiaries(0);
    setFormSdg('');
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (startup: StartupItem) => {
    setEditingStartup(startup);
    setFormName(startup.name);
    setFormCategory(startup.category);
    setFormDesc(startup.description);
    setFormFounder(startup.founderName);
    setFormLocation(startup.location);
    setFormYear(startup.yearEstablished);
    setFormEmail(startup.contactEmail);
    setFormTechStack(startup.primaryTechStack || '');
    setFormPatents(startup.patentCount || 0);
    setFormCarbonOffset(startup.estimatedCarbonOffsetTons || 0);
    setFormRenewable(startup.renewableEnergyPercentage || 0);
    setFormClinical(startup.clinicalPhase || '');
    setFormBeneficiaries(startup.beneficiariesReached || 0);
    setFormSdg(startup.unSdgAlignment || '');
    setFormError('');
    setIsFormOpen(true);
  };

  const saveStartupForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formFounder.trim() || !formDesc.trim() || !formLocation.trim() || !formEmail.trim()) {
      setFormError('Please fill in all mandatory fields.');
      return;
    }
    if (!formEmail.includes('@') || !formEmail.includes('.')) {
      setFormError('Please provide a valid contact email.');
      return;
    }

    if (editingStartup) {
      setStartups(prev => prev.map(s => {
        if (s.id === editingStartup.id) {
          return {
            ...s,
            name: formName,
            category: formCategory,
            description: formDesc,
            founderName: formFounder,
            location: formLocation,
            yearEstablished: Number(formYear),
            contactEmail: formEmail,
            primaryTechStack: formTechStack,
            patentCount: Number(formPatents),
            estimatedCarbonOffsetTons: Number(formCarbonOffset),
            renewableEnergyPercentage: Number(formRenewable),
            clinicalPhase: formClinical,
            beneficiariesReached: Number(formBeneficiaries),
            unSdgAlignment: formSdg
          };
        }
        return s;
      }));
      showToast(`Startup "${formName}" updated successfully.`);
    } else {
      const newId = startups.length > 0 ? Math.max(...startups.map(s => s.id)) + 1 : 1;
      const newEntry: StartupItem = {
        id: newId,
        name: formName,
        category: formCategory,
        description: formDesc,
        founderName: formFounder,
        location: formLocation,
        yearEstablished: Number(formYear),
        contactEmail: formEmail,
        environmentalScore: 0,
        innovationScore: 0,
        socialImpactScore: 0,
        financialViabilityScore: 0,
        overallScore: 0,
        isAssessed: false,
        isDemo: false,
        createdAt: new Date().toISOString(),
        primaryTechStack: formTechStack,
        patentCount: Number(formPatents),
        estimatedCarbonOffsetTons: Number(formCarbonOffset),
        renewableEnergyPercentage: Number(formRenewable),
        clinicalPhase: formClinical,
        beneficiariesReached: Number(formBeneficiaries),
        unSdgAlignment: formSdg
      };
      setStartups(prev => [newEntry, ...prev]);
      showToast(`Startup "${formName}" registered successfully! You can now evaluate its scores.`);
    }
    setIsFormOpen(false);
  };

  const getCategoryBadgeClass = (cat: StartupCategory) => {
    switch (cat) {
      case 'TechStartup': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'GreenStartup': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'HealthStartup': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'SocialStartup': return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getCategoryName = (cat: StartupCategory) => {
    switch (cat) {
      case 'TechStartup': return 'Tech Startup';
      case 'GreenStartup': return 'Green Startup';
      case 'HealthStartup': return 'Health Startup';
      case 'SocialStartup': return 'Social Startup';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Academic Banner */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-lg flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Sustain<span className="text-emerald-400">Rank</span></span>
              <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Java Spring Boot PBL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Team: <strong>Harshini V</strong> &amp; <strong>Nadhiya A</strong> &bull; B.Tech IT Sec C, 2nd Yr, 3rd Sem
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('app')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'app' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Live Application
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'code' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Java PBL Codebase
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'viva' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Faculty Viva Voce Guide
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-emerald-500/40 flex items-center gap-2 text-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================
            TAB 1: LIVE APPLICATION (Interactive Spring Boot & Thymeleaf Platform)
            ======================================================== */}
        {activeTab === 'app' && (
          <div className="flex-1 flex w-full">
            {/* If not authenticated, render Login Page */}
            {!isAuthenticated ? (
              <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 bg-emerald-600 text-white rounded-xl shadow-lg mb-3">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Sustain<span className="text-emerald-600">Rank</span></h2>
                    <p className="text-xs text-slate-500 mt-1">Startup Sustainability Assessment Platform</p>
                  </div>

                  {loginError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={loginUsername}
                        onChange={e => setLoginUsername(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-md transition"
                    >
                      Sign In to Dashboard
                    </button>
                  </form>

                  <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                    <div className="flex items-center justify-between font-semibold text-slate-700 mb-1">
                      <span>Default Demo Account:</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Spring Security 6</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Username: <strong className="text-emerald-700 font-mono">admin</strong></span>
                      <span>Password: <strong className="text-emerald-700 font-mono">admin123</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Authenticated Dashboard Layout with Dark Navy Sidebar
              <div className="flex-1 flex overflow-hidden">
                {/* Dark Navy Sidebar */}
                <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
                  <div className="p-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-white font-bold text-base">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Sustain<span className="text-emerald-400">Rank</span></span>
                    </div>
                    <span className="text-[11px] text-slate-400">Academic Decision Support</span>
                  </div>

                  <nav className="p-3 space-y-1 flex-1">
                    <button
                      onClick={() => setCurrentPage('dashboard')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentPage === 'dashboard' ? 'bg-emerald-600 text-white font-semibold shadow' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" /> Executive Dashboard
                    </button>
                    <button
                      onClick={() => setCurrentPage('startups')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentPage === 'startups' ? 'bg-emerald-600 text-white font-semibold shadow' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Building2 className="w-4 h-4" /> Startups Registry
                    </button>
                    <button
                      onClick={() => setCurrentPage('rankings')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentPage === 'rankings' ? 'bg-emerald-600 text-white font-semibold shadow' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Trophy className="w-4 h-4" /> Rankings &amp; ESG Scores
                    </button>
                    <button
                      onClick={() => setCurrentPage('analytics')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentPage === 'analytics' ? 'bg-emerald-600 text-white font-semibold shadow' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" /> Portfolio Analytics
                    </button>

                    <div className="pt-4 border-t border-slate-800 my-2">
                      <button
                        onClick={openNewForm}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-800 transition"
                      >
                        <Plus className="w-4 h-4" /> Register New Startup
                      </button>
                    </div>
                  </nav>

                  {/* Sidebar User & Logout */}
                  <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        A
                      </div>
                      <div>
                        <div className="font-semibold text-white leading-tight">Admin User</div>
                        <div className="text-[10px] text-slate-400">admin@sustainrank</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
                  {/* Top Bar with Quick Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-800 text-sm">
                        {currentPage === 'dashboard' && 'Executive Sustainability Dashboard'}
                        {currentPage === 'startups' && 'Startups Management & Registry'}
                        {currentPage === 'rankings' && 'Leaderboard & Multi-Criteria Rankings'}
                        {currentPage === 'analytics' && 'Portfolio Analytics & Benchmarks'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={exportCSV}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg border border-slate-300 flex items-center gap-1.5 transition"
                      >
                        <Download className="w-3.5 h-3.5" /> Export CSV
                      </button>
                      <button
                        onClick={resetDemoData}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg border border-slate-300 flex items-center gap-1 transition"
                        title="Restore 6 demo records"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reset Demo
                      </button>
                      <button
                        onClick={clearDemoData}
                        className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 flex items-center gap-1 transition"
                        title="Purge sample data"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear Demo
                      </button>
                      <button
                        onClick={openNewForm}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Startup
                      </button>
                    </div>
                  </div>

                  {/* ========================================================
                      PAGE 1: DASHBOARD
                      ======================================================== */}
                  {currentPage === 'dashboard' && (
                    <div className="space-y-6">
                      {/* 4 Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>TOTAL REGISTERED</span>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                              <Building2 className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-3xl font-extrabold text-slate-900">{stats.total}</span>
                            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                              <span><strong>{stats.assessedCount}</strong> Assessed</span>
                              <span><strong>{stats.pendingCount}</strong> Pending</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>DOMAINS / CATEGORIES</span>
                            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                              <Layers className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-3xl font-extrabold text-slate-900">4 of 4</span>
                            <div className="mt-1 text-xs text-slate-500">
                              Tech, Green, Health, Social
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>AVERAGE ESG SCORE</span>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                              <Award className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-3xl font-extrabold text-emerald-600">{stats.avgOverall.toFixed(1)}</span>
                            <span className="text-xs text-slate-500 ml-1">/ 100</span>
                            <div className="mt-1 text-xs text-slate-500">
                              Equal 25% weights across 4 pillars
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>HIGHEST-RANKED VENTURE</span>
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                              <Trophy className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="mt-2">
                            {stats.topRanked ? (
                              <>
                                <div className="text-base font-bold text-slate-900 truncate">{stats.topRanked.name}</div>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                    {stats.topRanked.overallScore.toFixed(2)} pts
                                  </span>
                                  <span className="text-[11px] text-slate-500 truncate">{getCategoryName(stats.topRanked.category)}</span>
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-slate-400">No assessed startups yet</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Criteria Benchmark Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 4 Pillars Macro Averages */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                          <h3 className="font-bold text-slate-900 text-sm mb-1">Pillar Benchmarks (Portfolio Averages)</h3>
                          <p className="text-xs text-slate-500 mb-4">Calculated dynamically across all {stats.assessedCount} assessed ventures</p>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5" /> Environmental Sustainability (25%)
                                </span>
                                <span className="text-slate-900 font-bold">{stats.avgEnv} / 100</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.avgEnv}%` }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-blue-700 flex items-center gap-1">
                                  <Code2 className="w-3.5 h-3.5" /> Innovation &amp; Tech Moat (25%)
                                </span>
                                <span className="text-slate-900 font-bold">{stats.avgInnov} / 100</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${stats.avgInnov}%` }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-amber-700 flex items-center gap-1">
                                  <Globe className="w-3.5 h-3.5" /> Social Impact &amp; Inclusion (25%)
                                </span>
                                <span className="text-slate-900 font-bold">{stats.avgSoc} / 100</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.avgSoc}%` }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-teal-700 flex items-center gap-1">
                                  <TrendingUp className="w-3.5 h-3.5" /> Financial Viability (25%)
                                </span>
                                <span className="text-slate-900 font-bold">{stats.avgFin} / 100</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.avgFin}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Category Distribution Breakdown */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm mb-1">Venture Distribution by Domain</h3>
                            <p className="text-xs text-slate-500 mb-4">Total portfolio representation across the 4 specialized sectors</p>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100">
                                <span className="text-xs font-semibold text-blue-800">Tech Startups</span>
                                <div className="text-2xl font-extrabold text-blue-900 mt-1">{stats.categoryCounts.TechStartup}</div>
                                <span className="text-[11px] text-blue-600">Enterprise AI &amp; Cloud</span>
                              </div>
                              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100">
                                <span className="text-xs font-semibold text-emerald-800">Green Startups</span>
                                <div className="text-2xl font-extrabold text-emerald-900 mt-1">{stats.categoryCounts.GreenStartup}</div>
                                <span className="text-[11px] text-emerald-600">Circular &amp; CleanTech</span>
                              </div>
                              <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-100">
                                <span className="text-xs font-semibold text-teal-800">Health Startups</span>
                                <div className="text-2xl font-extrabold text-teal-900 mt-1">{stats.categoryCounts.HealthStartup}</div>
                                <span className="text-[11px] text-teal-600">Diagnostics &amp; MedTech</span>
                              </div>
                              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-100">
                                <span className="text-xs font-semibold text-amber-800">Social Startups</span>
                                <div className="text-2xl font-extrabold text-amber-900 mt-1">{stats.categoryCounts.SocialStartup}</div>
                                <span className="text-[11px] text-amber-600">Agritech &amp; Rural Access</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                            <span>Need to assess unassessed ventures?</span>
                            <button
                              onClick={() => setCurrentPage('startups')}
                              className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
                            >
                              Go to Startups <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Recent Additions Table */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">Recently Registered Ventures</h3>
                            <p className="text-xs text-slate-500">Quick view of latest startup additions</p>
                          </div>
                          <button
                            onClick={() => setCurrentPage('startups')}
                            className="text-xs text-emerald-600 font-semibold hover:underline"
                          >
                            View All ({startups.length}) &rarr;
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 uppercase border-y border-slate-200">
                              <tr>
                                <th className="py-2.5 px-3">Startup Name</th>
                                <th className="py-2.5 px-3">Category</th>
                                <th className="py-2.5 px-3">Founder</th>
                                <th className="py-2.5 px-3">Status</th>
                                <th className="py-2.5 px-3">Overall Score</th>
                                <th className="py-2.5 px-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {startups.slice(0, 5).map(s => (
                                <tr key={s.id} className="hover:bg-slate-50/70 transition">
                                  <td className="py-3 px-3">
                                    <div className="font-bold text-slate-900">{s.name}</div>
                                    <span className="text-[11px] text-slate-500">Founded {s.yearEstablished} &bull; {s.location}</span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryBadgeClass(s.category)}`}>
                                      {getCategoryName(s.category)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-slate-700">{s.founderName}</td>
                                  <td className="py-3 px-3">
                                    {s.isAssessed ? (
                                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Assessed
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-medium">
                                        <Clock className="w-3 h-3 text-amber-600" /> Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3">
                                    {s.isAssessed ? (
                                      <span className="font-extrabold text-emerald-700 text-sm">
                                        {s.overallScore.toFixed(2)} / 100
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 italic text-[11px]">Unassessed</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        onClick={() => setDossierStartup(s)}
                                        className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                                        title="View Dossier"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => openAssessment(s)}
                                        className="p-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded"
                                        title="Evaluate Scores"
                                      >
                                        <Sliders className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      PAGE 2: STARTUPS DIRECTORY (Full CRUD & Search)
                      ======================================================== */}
                  {currentPage === 'startups' && (
                    <div className="space-y-4">
                      {/* Search & Filter Toolbar */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 flex-1">
                          <div className="relative min-w-[240px]">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search by name, founder, or city..."
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                          >
                            <option value="">All Categories</option>
                            <option value="TechStartup">Tech Startups</option>
                            <option value="GreenStartup">Green Startups</option>
                            <option value="HealthStartup">Health Startups</option>
                            <option value="SocialStartup">Social Startups</option>
                          </select>

                          {(searchQuery || selectedCategory) && (
                            <button
                              onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                              className="text-xs text-slate-500 hover:text-slate-800 underline"
                            >
                              Reset Filters
                            </button>
                          )}
                        </div>

                        <div className="text-xs text-slate-500">
                          Showing <strong>{rankedStartups.length}</strong> of {startups.length} ventures
                        </div>
                      </div>

                      {/* Startups Table */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                              <tr>
                                <th className="py-3 px-4">Startup</th>
                                <th className="py-3 px-3">Category</th>
                                <th className="py-3 px-3">Founder &amp; Location</th>
                                <th className="py-3 px-3">Criteria (E | I | S | F)</th>
                                <th className="py-3 px-3">Overall Score</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {rankedStartups.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                                  <td className="py-3.5 px-4">
                                    <div
                                      onClick={() => setDossierStartup(s)}
                                      className="font-bold text-slate-900 cursor-pointer hover:text-emerald-600 transition"
                                    >
                                      {s.name}
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">{s.description}</div>
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getCategoryBadgeClass(s.category)}`}>
                                      {getCategoryName(s.category)}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <div className="font-medium text-slate-800">{s.founderName}</div>
                                    <div className="text-[11px] text-slate-500">{s.location}</div>
                                  </td>
                                  <td className="py-3.5 px-3">
                                    {s.isAssessed ? (
                                      <div className="flex items-center gap-1 text-[11px]">
                                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono" title="Environmental">
                                          E:{s.environmentalScore.toFixed(0)}
                                        </span>
                                        <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono" title="Innovation">
                                          I:{s.innovationScore.toFixed(0)}
                                        </span>
                                        <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono" title="Social">
                                          S:{s.socialImpactScore.toFixed(0)}
                                        </span>
                                        <span className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-mono" title="Financial">
                                          F:{s.financialViabilityScore.toFixed(0)}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-[11px] text-slate-400 italic">Scores Pending</span>
                                    )}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    {s.isAssessed ? (
                                      <span className="font-extrabold text-emerald-700 text-sm">
                                        {s.overallScore.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">&ndash;</span>
                                    )}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    {s.isAssessed ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase">
                                        Assessed
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-semibold uppercase">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3.5 px-4 text-right">
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        onClick={() => setDossierStartup(s)}
                                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                                        title="View Profile Dossier"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => openAssessment(s)}
                                        className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded"
                                        title="Sustainability Assessment"
                                      >
                                        <Sliders className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => openEditForm(s)}
                                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                        title="Edit Details"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => deleteStartup(s.id, s.name)}
                                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                        title="Delete Startup"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}

                              {rankedStartups.length === 0 && (
                                <tr>
                                  <td colSpan={7} className="py-8 text-center text-slate-400">
                                    No startups matched the search query. Try resetting filters.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      PAGE 3: RANKINGS & LEADERBOARD
                      ======================================================== */}
                  {currentPage === 'rankings' && (
                    <div className="space-y-6">
                      {/* Tie-breaking logic callout */}
                      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-md">
                        <div className="flex items-start gap-3">
                          <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <h4 className="font-bold text-white text-sm mb-1">
                              Deterministic Multi-Criteria Ranking Algorithm (Java Comparator)
                            </h4>
                            <p className="text-slate-300 leading-relaxed">
                              Ventures are sorted primarily by <strong>Overall Score (Descending)</strong>. Ties are deterministically broken in sequence:
                              <span className="text-emerald-400 font-semibold"> 1. Environmental Score</span> &rarr;
                              <span className="text-blue-400 font-semibold"> 2. Innovation Score</span> &rarr;
                              <span className="text-amber-400 font-semibold"> 3. Social Impact Score</span> &rarr;
                              <span className="text-teal-400 font-semibold"> 4. Financial Viability</span> &rarr;
                              <span className="text-white font-semibold"> 5. Alphabetical Name</span>.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Top 3 Podium Highlights */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {rankedStartups.filter(s => s.isAssessed).slice(0, 3).map((podium, index) => {
                          const medalStyles = [
                            { border: 'border-amber-400 bg-amber-50/50', badge: 'bg-amber-400 text-slate-950', title: '1st Place Leader' },
                            { border: 'border-slate-300 bg-slate-50', badge: 'bg-slate-400 text-white', title: '2nd Place' },
                            { border: 'border-amber-600/40 bg-amber-50/20', badge: 'bg-amber-600 text-white', title: '3rd Place' }
                          ][index];

                          return (
                            <div key={podium.id} className={`p-4 rounded-xl border-2 ${medalStyles.border} shadow-sm relative flex flex-col justify-between`}>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`w-7 h-7 rounded-full ${medalStyles.badge} flex items-center justify-center font-bold text-xs`}>
                                    #{index + 1}
                                  </span>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getCategoryBadgeClass(podium.category)}`}>
                                    {getCategoryName(podium.category)}
                                  </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-base">{podium.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{podium.founderName} &bull; {podium.location}</p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                                <span className="text-xs text-slate-500 font-medium">Composite Score:</span>
                                <span className="text-xl font-extrabold text-emerald-700">
                                  {podium.overallScore.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 100</span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Full Rankings Table */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                              <tr>
                                <th className="py-3 px-3 text-center w-14">Rank</th>
                                <th className="py-3 px-3">Startup Name</th>
                                <th className="py-3 px-3">Domain</th>
                                <th className="py-3 px-3 text-center">Environmental (25%)</th>
                                <th className="py-3 px-3 text-center">Innovation (25%)</th>
                                <th className="py-3 px-3 text-center">Social Impact (25%)</th>
                                <th className="py-3 px-3 text-center">Financial (25%)</th>
                                <th className="py-3 px-3 text-center font-bold text-slate-800">Overall Score</th>
                                <th className="py-3 px-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {rankedStartups.map(s => (
                                <tr key={s.id} className={`hover:bg-slate-50/80 transition ${s.rank === 1 ? 'bg-amber-50/20' : ''}`}>
                                  <td className="py-3 px-3 text-center">
                                    {s.rank ? (
                                      <span className={`inline-flex items-center justify-center font-bold rounded-full w-6 h-6 text-xs ${
                                        s.rank === 1 ? 'bg-amber-400 text-slate-900' :
                                        s.rank === 2 ? 'bg-slate-300 text-slate-900' :
                                        s.rank === 3 ? 'bg-amber-700 text-white' :
                                        'text-slate-600'
                                      }`}>
                                        {s.rank}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 font-semibold text-slate-900">
                                    <span
                                      onClick={() => setDossierStartup(s)}
                                      className="cursor-pointer hover:text-emerald-600 transition"
                                    >
                                      {s.name}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryBadgeClass(s.category)}`}>
                                      {getCategoryName(s.category)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono">
                                    {s.isAssessed ? s.environmentalScore.toFixed(1) : '&ndash;'}
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono">
                                    {s.isAssessed ? s.innovationScore.toFixed(1) : '&ndash;'}
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono">
                                    {s.isAssessed ? s.socialImpactScore.toFixed(1) : '&ndash;'}
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono">
                                    {s.isAssessed ? s.financialViabilityScore.toFixed(1) : '&ndash;'}
                                  </td>
                                  <td className="py-3 px-3 text-center">
                                    {s.isAssessed ? (
                                      <span className={`inline-block px-2.5 py-1 rounded-full font-bold text-xs ${
                                        s.overallScore >= 85 ? 'bg-emerald-100 text-emerald-800' :
                                        s.overallScore >= 70 ? 'bg-blue-100 text-blue-800' :
                                        s.overallScore >= 50 ? 'bg-amber-100 text-amber-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {s.overallScore.toFixed(2)}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 italic text-[11px]">Unassessed</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        onClick={() => setDossierStartup(s)}
                                        className="p-1 text-slate-500 hover:text-slate-900 rounded"
                                        title="View Dossier"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => openAssessment(s)}
                                        className="p-1 text-emerald-600 hover:text-emerald-800 rounded"
                                        title="Evaluate"
                                      >
                                        <Sliders className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      PAGE 4: ANALYTICS & REPORTS
                      ======================================================== */}
                  {currentPage === 'analytics' && (
                    <div className="space-y-6">
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 text-base mb-1">Portfolio ESG Performance Benchmarks</h3>
                        <p className="text-xs text-slate-500 mb-6">Cross-criteria comparative analysis across all four sustainability evaluation dimensions.</p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                            <span className="text-xs text-emerald-800 font-semibold">Average Environmental</span>
                            <div className="text-2xl font-black text-emerald-900 mt-1">{stats.avgEnv} / 100</div>
                            <span className="text-[11px] text-emerald-700">Carbon &amp; Renewable Energy</span>
                          </div>
                          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                            <span className="text-xs text-blue-800 font-semibold">Average Innovation</span>
                            <div className="text-2xl font-black text-blue-900 mt-1">{stats.avgInnov} / 100</div>
                            <span className="text-[11px] text-blue-700">Patents &amp; Technical Moat</span>
                          </div>
                          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
                            <span className="text-xs text-amber-800 font-semibold">Average Social Impact</span>
                            <div className="text-2xl font-black text-amber-900 mt-1">{stats.avgSoc} / 100</div>
                            <span className="text-[11px] text-amber-700">Beneficiaries &amp; UN SDGs</span>
                          </div>
                          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                            <span className="text-xs text-teal-800 font-semibold">Average Financial</span>
                            <div className="text-2xl font-black text-teal-900 mt-1">{stats.avgFin} / 100</div>
                            <span className="text-[11px] text-teal-700">Traction &amp; Capital Efficiency</span>
                          </div>
                        </div>

                        {/* Top Performers Comparison Bar */}
                        <h4 className="font-bold text-slate-900 text-xs uppercase text-slate-500 mb-3">
                          Top 5 Ranked Ventures Comparison
                        </h4>
                        <div className="space-y-3">
                          {rankedStartups.filter(s => s.isAssessed).slice(0, 5).map(item => (
                            <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                <span className="text-slate-900">#{item.rank} {item.name} ({getCategoryName(item.category)})</span>
                                <span className="text-emerald-700 font-bold">{item.overallScore.toFixed(2)} pts</span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-slate-900 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${item.overallScore}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </main>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: JAVA PBL CODEBASE EXPLORER
            ======================================================== */}
        {activeTab === 'code' && (
          <JavaCodebaseExplorer />
        )}

        {/* ========================================================
            TAB 3: VIVA VOCE & EVALUATION GUIDE
            ======================================================== */}
        {activeTab === 'viva' && (
          <VivaVoceGuide />
        )}
      </div>

      {/* ========================================================
          MODAL: SUSTAINABILITY ASSESSMENT FORM
          ======================================================== */}
      {isAssessmentOpen && assessmentTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">Sustainability Assessment Engine</h3>
                <p className="text-xs text-slate-400">
                  Evaluating <strong>{assessmentTarget.name}</strong> ({getCategoryName(assessmentTarget.category)})
                </p>
              </div>
              <button
                onClick={() => setIsAssessmentOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <strong>Standard Equal Weighting (25% Each):</strong> Overall Score = (Environmental + Innovation + Social + Financial) / 4
              </div>

              {/* Slider 1: Environmental */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> A. Environmental Sustainability (25%)
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalEnv}
                      onChange={e => setEvalEnv(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold border border-slate-300 rounded"
                    />
                    <span className="text-slate-500">/ 100</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={evalEnv}
                  onChange={e => setEvalEnv(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">Carbon offset, lifecycle circularity, renewable energy adoption, and clean manufacturing.</p>
              </div>

              {/* Slider 2: Innovation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-800 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" /> B. Innovation &amp; Technology Moat (25%)
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalInnov}
                      onChange={e => setEvalInnov(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold border border-slate-300 rounded"
                    />
                    <span className="text-slate-500">/ 100</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={evalInnov}
                  onChange={e => setEvalInnov(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">Patents filed/granted, R&amp;D originality, software architecture, and technical scalability.</p>
              </div>

              {/* Slider 3: Social Impact */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-600" /> C. Social Impact &amp; Inclusion (25%)
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalSoc}
                      onChange={e => setEvalSoc(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold border border-slate-300 rounded"
                    />
                    <span className="text-slate-500">/ 100</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={evalSoc}
                  onChange={e => setEvalSoc(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">Beneficiaries reached, UN SDG alignment, community health upliftment, and ethical governance.</p>
              </div>

              {/* Slider 4: Financial Viability */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-teal-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-600" /> D. Financial Viability &amp; Traction (25%)
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalFin}
                      onChange={e => setEvalFin(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold border border-slate-300 rounded"
                    />
                    <span className="text-slate-500">/ 100</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={evalFin}
                  onChange={e => setEvalFin(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">Runway longevity, commercial traction, unit margins, and capital efficiency.</p>
              </div>

              {/* Live Composite Computation Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Live Computed Overall Score</span>
                <div className="text-3xl font-extrabold text-emerald-700 my-1">
                  {computedOverallScore.toFixed(2)} <span className="text-base font-normal text-emerald-900">/ 100</span>
                </div>
                <span className="text-xs text-emerald-800">
                  {computedOverallScore >= 85 ? 'Tier 1: ESG Leader / Exceptional' :
                   computedOverallScore >= 70 ? 'Tier 2: Strong Sustainability' :
                   computedOverallScore >= 50 ? 'Tier 3: Moderate / Developing' : 'Tier 4: High ESG Risk'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualitative Evaluator Notes</label>
                <textarea
                  rows={2}
                  value={evalNotes}
                  onChange={e => setEvalNotes(e.target.value)}
                  placeholder="Record qualitative audit evidence, certifications, patents, or clinical milestones..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setIsAssessmentOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={saveAssessment}
                className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
              >
                Save &amp; Update Rankings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT STARTUP
          ======================================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  {editingStartup ? 'Edit Startup Details' : 'Register New Startup'}
                </h3>
                <p className="text-xs text-slate-400">
                  Stores organizational parameters and polymorphic category attributes
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveStartupForm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Startup Name *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. EcoLoop Packaging"
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category Domain *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as StartupCategory)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none"
                  >
                    <option value="TechStartup">Tech Startup</option>
                    <option value="GreenStartup">Green Startup</option>
                    <option value="HealthStartup">Health Startup</option>
                    <option value="SocialStartup">Social Startup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venture Description &amp; Mission *</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Overview of technology, solutions, and environmental/social value proposition..."
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Founder / Leader *</label>
                  <input
                    type="text"
                    value={formFounder}
                    onChange={e => setFormFounder(e.target.value)}
                    placeholder="Dr. Ananya Sharma"
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / HQ *</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    placeholder="Bengaluru, Karnataka"
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year Founded *</label>
                  <input
                    type="number"
                    value={formYear}
                    onChange={e => setFormYear(Number(e.target.value))}
                    min={1990}
                    max={2030}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  placeholder="contact@startup.com"
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              {/* Polymorphic Category Attributes */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Domain Polymorphic Attributes ({getCategoryName(formCategory)})
                </span>

                {formCategory === 'TechStartup' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Primary Tech Stack</label>
                      <input
                        type="text"
                        value={formTechStack}
                        onChange={e => setFormTechStack(e.target.value)}
                        placeholder="Rust, PyTorch, Distributed Cloud"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Patents Granted / Filed</label>
                      <input
                        type="number"
                        value={formPatents}
                        onChange={e => setFormPatents(Number(e.target.value))}
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                )}

                {formCategory === 'GreenStartup' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Annual CO2 Offset (Tons)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formCarbonOffset}
                        onChange={e => setFormCarbonOffset(Number(e.target.value))}
                        placeholder="450"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Renewable Energy Used (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formRenewable}
                        onChange={e => setFormRenewable(Number(e.target.value))}
                        placeholder="90"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                )}

                {formCategory === 'HealthStartup' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Clinical Phase</label>
                      <input
                        type="text"
                        value={formClinical}
                        onChange={e => setFormClinical(e.target.value)}
                        placeholder="Phase II Validation"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <input type="checkbox" id="hipaa" defaultChecked className="accent-emerald-600" />
                      <label htmlFor="hipaa" className="text-[11px] text-slate-700">HIPAA / CDSCO Compliant</label>
                    </div>
                  </div>
                )}

                {formCategory === 'SocialStartup' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Beneficiaries Impacted</label>
                      <input
                        type="number"
                        value={formBeneficiaries}
                        onChange={e => setFormBeneficiaries(Number(e.target.value))}
                        placeholder="25000"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">UN SDG Alignment</label>
                      <input
                        type="text"
                        value={formSdg}
                        onChange={e => setFormSdg(e.target.value)}
                        placeholder="SDG 6, SDG 7"
                        className="w-full p-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
                >
                  {editingStartup ? 'Update Startup' : 'Save to Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: STARTUP PROFILE DOSSIER
          ======================================================== */}
      {dossierStartup && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getCategoryBadgeClass(dossierStartup.category)}`}>
                    {getCategoryName(dossierStartup.category)}
                  </span>
                  {dossierStartup.rank && (
                    <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded">
                      Rank #{dossierStartup.rank}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-white">{dossierStartup.name}</h3>
                <p className="text-xs text-slate-400">
                  {dossierStartup.founderName} &bull; Founded {dossierStartup.yearEstablished} &bull; {dossierStartup.location}
                </p>
              </div>
              <button
                onClick={() => setDossierStartup(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Executive Summary</h4>
                <p className="text-slate-600 leading-relaxed">{dossierStartup.description}</p>
              </div>

              {/* ESG Score Breakdown */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 text-sm">Overall Sustainability Score</span>
                  <span className="text-2xl font-black text-emerald-700">
                    {dossierStartup.isAssessed ? dossierStartup.overallScore.toFixed(2) : '0.00'}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ 100</span>
                  </span>
                </div>

                {dossierStartup.isAssessed ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-medium">Environmental (25%)</span>
                      <div className="text-base font-extrabold text-emerald-700">{dossierStartup.environmentalScore.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-medium">Innovation (25%)</span>
                      <div className="text-base font-extrabold text-blue-700">{dossierStartup.innovationScore.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-medium">Social (25%)</span>
                      <div className="text-base font-extrabold text-amber-700">{dossierStartup.socialImpactScore.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-medium">Financial (25%)</span>
                      <div className="text-base font-extrabold text-teal-700">{dossierStartup.financialViabilityScore.toFixed(1)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-center">
                    This startup has not been formally evaluated yet.
                  </div>
                )}
              </div>

              {/* Assessment Notes */}
              {dossierStartup.assessmentNotes && (
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Evaluator Notes</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 italic">
                    "{dossierStartup.assessmentNotes}"
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-4 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${dossierStartup.contactEmail}`} className="text-emerald-600 hover:underline">
                    {dossierStartup.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dossierStartup.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => deleteStartup(dossierStartup.id, dossierStartup.name)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold"
              >
                Delete Record
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const target = dossierStartup;
                    setDossierStartup(null);
                    openAssessment(target);
                  }}
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  <Sliders className="w-3 h-3 inline mr-1" /> Evaluate Scores
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: JAVA CODEBASE EXPLORER
// ========================================================
function JavaCodebaseExplorer() {
  const [selectedFile, setSelectedFile] = useState<string>('Startup.java');
  const [copied, setCopied] = useState(false);

  const filesMap: Record<string, { path: string; category: string; content: string }> = {
    'pom.xml': {
      path: '/pom.xml',
      category: 'Maven Build & Dependencies',
      content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>
    <groupId>com.sustainrank</groupId>
    <artifactId>sustainrank</artifactId>
    <version>1.0.0</version>
    <name>SustainRank</name>
    <description>Startup Sustainability Assessment and Ranking Platform - Harshini V & Nadhiya A</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web MVC & Thymeleaf UI -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <!-- Spring Data JPA & Persistent H2 Database -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Security 6 with BCrypt -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- JSR-380 Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Apache Commons CSV for RFC-4180 compliant export -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-csv</artifactId>
            <version>1.10.0</version>
        </dependency>
    </dependencies>
</project>`
    },
    'Startup.java': {
      path: '/src/main/java/com/sustainrank/model/Startup.java',
      category: 'OOP Inheritance & Encapsulation',
      content: `package com.sustainrank.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

/**
 * Base Entity representing a Startup in the SustainRank ecosystem.
 *
 * Demonstrates:
 * - Encapsulation (private fields, controlled getters/setters)
 * - Object-Oriented Inheritance (Single-table JPA inheritance for subclasses)
 * - Data Integrity & Bean Validation (JSR-380)
 */
@Entity
@Table(name = "startups")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "startup_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("GENERAL")
public class Startup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Startup name is required")
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Category must be selected")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StartupCategory category;

    @NotBlank(message = "Description is required")
    @Column(length = 1000, nullable = false)
    private String description;

    @NotBlank(message = "Founder name is required")
    private String founderName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Year established is required")
    @Min(1900) @Max(2030)
    private Integer yearEstablished;

    @NotBlank(message = "Contact email is required")
    @Email
    private String contactEmail;

    // Four core sustainability criteria (0.0 to 100.0)
    private Double environmentalScore = 0.0;
    private Double innovationScore = 0.0;
    private Double socialImpactScore = 0.0;
    private Double financialViabilityScore = 0.0;

    // Derived overall score: (Env + Innov + Social + Financial) / 4.0
    @Column(nullable = false)
    private Double overallScore = 0.0;

    @Column(nullable = false)
    private Boolean isAssessed = false;

    private String assessmentNotes;
    private Boolean isDemo = false;

    // Polymorphic method demonstrating OOP Abstraction and Polymorphism
    public String getCategorySpecialization() {
        return "General Startup";
    }

    // Getters, Setters, and JPA Lifecycle Hooks...
}`
    },
    'GreenStartup.java': {
      path: '/src/main/java/com/sustainrank/model/GreenStartup.java',
      category: 'OOP Subclass Polymorphism',
      content: `package com.sustainrank.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Subclass representing environmental and clean-tech ventures.
 * Demonstrates OOP Inheritance and Polymorphic method overriding.
 */
@Entity
@DiscriminatorValue("GREEN")
public class GreenStartup extends Startup {

    private Double estimatedCarbonOffsetTons = 0.0;
    private Double renewableEnergyPercentage = 0.0;

    public GreenStartup() {
        super();
        setCategory(StartupCategory.GreenStartup);
    }

    @Override
    public String getCategorySpecialization() {
        return "Green Impact: " + estimatedCarbonOffsetTons +
               " tons CO2 offset / yr (" + renewableEnergyPercentage + "% renewable)";
    }

    public Double getEstimatedCarbonOffsetTons() { return estimatedCarbonOffsetTons; }
    public void setEstimatedCarbonOffsetTons(Double val) { this.estimatedCarbonOffsetTons = val; }

    public Double getRenewableEnergyPercentage() { return renewableEnergyPercentage; }
    public void setRenewableEnergyPercentage(Double val) { this.renewableEnergyPercentage = val; }
}`
    },
    'SustainabilityScorer.java': {
      path: '/src/main/java/com/sustainrank/service/SustainabilityScorer.java',
      category: 'Interface & Strategy Pattern',
      content: `package com.sustainrank.service;

/**
 * Strategy interface defining calculation rules for composite sustainability scores.
 * Demonstrates OOP Abstraction and Interface Segregation.
 */
public interface SustainabilityScorer {

    /**
     * Calculates the overall composite score from the four criteria.
     * Equal weight of 25% each: (Env + Innov + Social + Financial) / 4.0
     */
    double calculateOverallScore(double environmental, double innovation, double social, double financial);

    void validateScores(double environmental, double innovation, double social, double financial);

    String getFormulaExplanation();
}`
    },
    'StartupServiceImpl.java': {
      path: '/src/main/java/com/sustainrank/service/impl/StartupServiceImpl.java',
      category: 'Business Logic & Tie-Breaking',
      content: `package com.sustainrank.service.impl;

import com.sustainrank.model.*;
import com.sustainrank.repository.StartupRepository;
import com.sustainrank.service.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@Transactional
public class StartupServiceImpl implements StartupService {

    private final StartupRepository startupRepository;
    private final SustainabilityScorer sustainabilityScorer;

    /**
     * Deterministic Ranking Comparator:
     * 1. Overall Score (Descending)
     * 2. Environmental Score (Descending) - Tie Breaker #1
     * 3. Innovation Score (Descending) - Tie Breaker #2
     * 4. Social Impact Score (Descending) - Tie Breaker #3
     * 5. Financial Viability Score (Descending) - Tie Breaker #4
     * 6. Startup Name (Ascending alphabetical) - Deterministic final tie breaker
     */
    public static final Comparator<Startup> RANKING_COMPARATOR = (s1, s2) -> {
        int cmp = Double.compare(s2.getOverallScore(), s1.getOverallScore());
        if (cmp != 0) return cmp;

        cmp = Double.compare(s2.getEnvironmentalScore(), s1.getEnvironmentalScore());
        if (cmp != 0) return cmp;

        cmp = Double.compare(s2.getInnovationScore(), s1.getInnovationScore());
        if (cmp != 0) return cmp;

        cmp = Double.compare(s2.getSocialImpactScore(), s1.getSocialImpactScore());
        if (cmp != 0) return cmp;

        cmp = Double.compare(s2.getFinancialViabilityScore(), s1.getFinancialViabilityScore());
        if (cmp != 0) return cmp;

        return s1.getName().compareToIgnoreCase(s2.getName());
    };

    @Override
    public Startup recordAssessment(AssessmentFormDto assessmentDto) {
        Startup startup = getStartupById(assessmentDto.getStartupId());
        double overall = sustainabilityScorer.calculateOverallScore(
                assessmentDto.getEnvironmentalScore(),
                assessmentDto.getInnovationScore(),
                assessmentDto.getSocialImpactScore(),
                assessmentDto.getFinancialViabilityScore());

        startup.setEnvironmentalScore(assessmentDto.getEnvironmentalScore());
        startup.setInnovationScore(assessmentDto.getInnovationScore());
        startup.setSocialImpactScore(assessmentDto.getSocialImpactScore());
        startup.setFinancialViabilityScore(assessmentDto.getFinancialViabilityScore());
        startup.setOverallScore(overall);
        startup.setIsAssessed(true);
        startup.setAssessmentNotes(assessmentDto.getAssessmentNotes());

        return startupRepository.save(startup);
    }
}`
    },
    'SecurityConfig.java': {
      path: '/src/main/java/com/sustainrank/config/SecurityConfig.java',
      category: 'Spring Security & Cryptography',
      content: `package com.sustainrank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder hashes with cost factor 10 - NEVER plaintext
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/css/**", "/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout=true")
                .invalidateHttpSession(true)
            );
        return http.build();
    }
}`
    },
    'application.properties': {
      path: '/src/main/resources/application.properties',
      category: 'H2 Persistent File Configuration',
      content: `# Application Name & Port
spring.application.name=SustainRank
server.port=8080

# Persistent File H2 Database (Saved to disk in ./data/sustainrank.mv.db)
spring.datasource.url=jdbc:h2:file:./data/sustainrank;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;AUTO_SERVER=TRUE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password

# Hibernate Auto Schema Update
spring.jpa.hibernate.ddl-auto=update

# H2 Web Console URL
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Demo Credentials for Spring Security
sustainrank.security.demo-username=admin
sustainrank.security.demo-password=admin123`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(filesMap[selectedFile].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-900 text-slate-200">
      {/* File Tree Sidebar */}
      <aside className="w-72 bg-slate-950 border-r border-slate-800 p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Java Maven File Tree</span>
        </div>
        <div className="space-y-1 overflow-y-auto flex-1 text-xs">
          {Object.entries(filesMap).map(([filename, meta]) => (
            <button
              key={filename}
              onClick={() => setSelectedFile(filename)}
              className={`w-full text-left p-2 rounded-lg transition ${
                selectedFile === filename ? 'bg-emerald-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="font-mono text-xs">{filename}</div>
              <div className="text-[10px] opacity-75">{meta.category}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
          <div className="font-semibold text-white mb-1">To run in IntelliJ or VS Code:</div>
          <code className="text-emerald-400 block bg-slate-950 p-1.5 rounded font-mono text-[10px]">
            mvn spring-boot:run
          </code>
        </div>
      </aside>

      {/* Code Viewer */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
        <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400 font-semibold">{filesMap[selectedFile].path}</span>
            <span className="text-slate-400">({filesMap[selectedFile].category})</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center gap-1.5 transition text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="flex-1 p-4 font-mono text-xs overflow-auto text-slate-300 bg-slate-900/90 leading-relaxed selection:bg-emerald-800">
          {filesMap[selectedFile].content}
        </pre>
      </main>
    </div>
  );
}

// ========================================================
// SUB-COMPONENT: VIVA VOCE & FACULTY DEFENSE GUIDE
// ========================================================
function VivaVoceGuide() {
  const qaList = [
    {
      q: "Q1. How does SustainRank satisfy the Java Object-Oriented Programming (OOP) requirements?",
      a: "Encapsulation is enforced via private entity fields and JSR-380 bean validations. Inheritance is demonstrated through the base class Startup and subclasses TechStartup, GreenStartup, HealthStartup, and SocialStartup using JPA Single-Table inheritance. Polymorphism is implemented via getCategorySpecialization() overridden in subclasses. Abstraction is maintained using service and scorer interfaces (StartupService, SustainabilityScorer)."
    },
    {
      q: "Q2. How is data persisted when the application shuts down or restarts?",
      a: "We configured an embedded H2 database in persistent file mode via jdbc:h2:file:./data/sustainrank;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE. Instead of volatile in-memory storage, tables and records are committed to ./data/sustainrank.mv.db on the local file system."
    },
    {
      q: "Q3. What is the mathematical scoring formula used?",
      a: "All four criteria carry an equal weight of 25% (0.25): Overall Score = (Environmental + Innovation + Social Impact + Financial Viability) / 4.0. The computation is handled on the server side using DefaultSustainabilityScorer and rounded to 2 decimal places using BigDecimal."
    },
    {
      q: "Q4. How does the deterministic tie-breaking logic work in Java?",
      a: "In StartupServiceImpl.java, a custom Comparator<Startup> evaluates scores sequentially: 1. Overall Score DESC, 2. Environmental Score DESC (sustainability priority), 3. Innovation Score DESC, 4. Social Impact Score DESC, 5. Financial Viability DESC, and 6. Case-insensitive alphabetical name ASC."
    },
    {
      q: "Q5. How does Spring Security protect credentials?",
      a: "Passwords are never stored or compared in plaintext. BCryptPasswordEncoder hashes user passwords with a salt and cost factor of 10. Spring Security filters inspect sessions and enforce authorization on protected endpoints."
    },
    {
      q: "Q6. How are unassessed startups handled in rankings?",
      a: "Unassessed ventures are designated with status 'Pending Assessment' and assigned a rank of null. They are sorted at the bottom of the leaderboard to prevent misleading rank inflation before official verification."
    },
    {
      q: "Q7. What design pattern is used in the sustainability assessment service?",
      a: "The Strategy Design Pattern: the SustainabilityScorer interface defines the algorithm contract, and DefaultSustainabilityScorer provides the concrete equal-weight implementation. If weighted scoring rules are added in the future, new strategies can be injected without altering consumer services."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" /> B.Tech IT 2nd Year, 3rd Semester PBL Review
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Faculty Viva Voce &amp; Project Defense Guide</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Prepared for <strong>Harshini V</strong> and <strong>Nadhiya A</strong> to confidently address technical inquiries from examiners regarding architecture, OOP tenets, database persistence, and scoring models.
          </p>
        </div>

        <div className="space-y-4">
          {qaList.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-2 text-emerald-900">{item.q}</h3>
              <p className="text-xs text-slate-700 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
