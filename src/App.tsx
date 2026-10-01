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
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Layers,
  Award,
  Globe,
  Mail,
  MapPin,
  Calendar,
  X,
  ChevronRight,
  ArrowUpRight,
  FileSpreadsheet,
  Check,
  Compass,
  Briefcase,
  Zap,
  Activity,
  HeartHandshake
} from 'lucide-react';

// Domain model definitions
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
  // Category-specific domain fields
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
    description: 'Biodegradable mycelium packaging solutions replacing single-use expanded polystyrene and synthetic cushioning in cross-border e-commerce freight logistics.',
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
    assessmentNotes: 'Superior biological cradle-to-cradle lifecycle with 92.5% renewable power in production. High enterprise customer retention across major logistics hubs.',
    isDemo: true,
    createdAt: '2026-09-15T10:00:00Z',
    estimatedCarbonOffsetTons: 450.0,
    renewableEnergyPercentage: 92.5
  },
  {
    id: 2,
    name: 'NeuroGrid Systems',
    category: 'TechStartup',
    description: 'Decentralized artificial intelligence algorithms predicting municipal grid peak load fluctuations and orchestrating utility-scale battery energy storage dispatch.',
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
    assessmentNotes: 'State-of-the-art grid optimization software with three granted utility patents and commercial pilot contracts across two state electrical distribution boards.',
    isDemo: true,
    createdAt: '2026-09-18T14:30:00Z',
    primaryTechStack: 'Rust, PyTorch, Apache Kafka, Distributed Kubernetes',
    patentCount: 3
  },
  {
    id: 3,
    name: 'BioPulse Diagnostic Tech',
    category: 'HealthStartup',
    description: 'Point-of-care microfluidic biosensors enabling rapid fifteen-minute multi-pathogen screening for underserved rural clinics without requiring cold-chain refrigeration.',
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
    assessmentNotes: 'Substantial public health impact delivering affordable diagnostic access to over 65 rural community healthcare centers.',
    isDemo: true,
    createdAt: '2026-09-20T09:15:00Z',
    clinicalPhase: 'Phase II Validation',
    hipaaOrGdprCompliant: true
  },
  {
    id: 4,
    name: 'JalDharini Solutions',
    category: 'SocialStartup',
    description: 'Community-owned solar-powered atmospheric water generators supplying certified potable drinking water to drought-vulnerable agricultural communities.',
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
    assessmentNotes: 'Direct grassroots impact benefiting 38,000 rural residents with zero groundwater depletion or fossil-fuel power requirements.',
    isDemo: true,
    createdAt: '2026-09-22T11:45:00Z',
    beneficiariesReached: 38000,
    unSdgAlignment: 'SDG 6 (Clean Water), SDG 7 (Affordable Energy), SDG 5 (Gender Equality)'
  },
  {
    id: 5,
    name: 'AgriSense Vision',
    category: 'TechStartup',
    description: 'Multispectral drone imaging and edge-AI soil telemetry minimizing synthetic nitrogen fertilizer leaching and optimizing precision micro-irrigation.',
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
    assessmentNotes: 'Proven 22% nitrate runoff abatement for smallholder agricultural cooperatives across the Cauvery irrigation basin.',
    isDemo: true,
    createdAt: '2026-09-25T16:20:00Z',
    primaryTechStack: 'Python, TensorFlow Lite, ROS, Edge OpenCV',
    patentCount: 1
  },
  {
    id: 6,
    name: 'UrbanFlora BioFuels',
    category: 'GreenStartup',
    description: 'Enzymatic bioprocess converting post-consumer food residue from metropolitan hospitality centers into drop-in aviation biofuels and microbial organic fertilizers.',
    founderName: 'Manoj Nair',
    location: 'Kochi, Kerala',
    yearEstablished: 2025,
    contactEmail: 'contact@urbanflora.bio',
    environmentalScore: 0.0,
    innovationScore: 0.0,
    socialImpactScore: 0.0,
    financialViabilityScore: 0.0,
    overallScore: 0.0,
    isAssessed: false, // Initial unassessed state
    isDemo: true,
    createdAt: '2026-09-28T08:00:00Z',
    estimatedCarbonOffsetTons: 820.0,
    renewableEnergyPercentage: 88.0
  }
];

export default function App() {
  // Navigation & Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentNav, setCurrentNav] = useState<'dashboard' | 'startups' | 'assessments' | 'rankings' | 'analytics'>('dashboard');

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Startups database state with persistence
  const [startups, setStartups] = useState<StartupItem[]>(() => {
    try {
      const stored = localStorage.getItem('sustainrank_startups_db');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_STARTUPS;
  });

  useEffect(() => {
    localStorage.setItem('sustainrank_startups_db', JSON.stringify(startups));
  }, [startups]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  // Modals & Drawers
  const [dossierStartup, setDossierStartup] = useState<StartupItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState<StartupItem | null>(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentTarget, setAssessmentTarget] = useState<StartupItem | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Assessment Form State
  const [evalEnv, setEvalEnv] = useState<number>(50);
  const [evalInnov, setEvalInnov] = useState<number>(50);
  const [evalSoc, setEvalSoc] = useState<number>(50);
  const [evalFin, setEvalFin] = useState<number>(50);
  const [evalNotes, setEvalNotes] = useState<string>('');

  // 25% Equal Weights Computation
  const computedOverallScore = useMemo(() => {
    const val = (evalEnv * 0.25) + (evalInnov * 0.25) + (evalSoc * 0.25) + (evalFin * 0.25);
    return Math.round(val * 100) / 100;
  }, [evalEnv, evalInnov, evalSoc, evalFin]);

  // Deterministic Ranking Comparator
  const rankedStartups = useMemo(() => {
    const filtered = startups.filter(s => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.founderName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q);
      const matchesCat = !filterCategory || s.category === filterCategory;
      return matchesSearch && matchesCat;
    });

    const assessed = filtered.filter(s => s.isAssessed).sort((a, b) => {
      if (b.overallScore !== a.overallScore) return b.overallScore - a.overallScore;
      if (b.environmentalScore !== a.environmentalScore) return b.environmentalScore - a.environmentalScore;
      if (b.innovationScore !== a.innovationScore) return b.innovationScore - a.innovationScore;
      if (b.socialImpactScore !== a.socialImpactScore) return b.socialImpactScore - a.socialImpactScore;
      if (b.financialViabilityScore !== a.financialViabilityScore) return b.financialViabilityScore - a.financialViabilityScore;
      return a.name.localeCompare(b.name);
    });

    const rankedWithOrdinal = assessed.map((s, idx) => ({ ...s, rank: idx + 1 }));

    const unassessed = filtered
      .filter(s => !s.isAssessed)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(s => ({ ...s, rank: undefined }));

    return [...rankedWithOrdinal, ...unassessed];
  }, [startups, searchQuery, filterCategory]);

  // Aggregate Key Performance Metrics
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

  // Authentication Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'admin' && passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setCurrentNav('dashboard');
      setLoginError('');
      showToast('Authenticated as Administrator.');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setLoginError('');
    setCurrentNav('dashboard');
    showToast('Signed out of SustainRank.');
  };

  // Assessment Workflow Handlers
  const openAssessmentModal = (startup: StartupItem) => {
    setAssessmentTarget(startup);
    setEvalEnv(startup.isAssessed ? startup.environmentalScore : 50);
    setEvalInnov(startup.isAssessed ? startup.innovationScore : 50);
    setEvalSoc(startup.isAssessed ? startup.socialImpactScore : 50);
    setEvalFin(startup.isAssessed ? startup.financialViabilityScore : 50);
    setEvalNotes(startup.assessmentNotes || '');
    setIsAssessmentOpen(true);
  };

  const handleSaveAssessment = () => {
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
    showToast(`Assessment recorded for "${assessmentTarget.name}". Score: ${computedOverallScore.toFixed(2)} / 100.`);
  };

  // Startup CRUD Handlers
  const handleDeleteStartup = (id: number, name: string) => {
    if (window.confirm(`Permanently delete "${name}" from the database?`)) {
      setStartups(prev => prev.filter(s => s.id !== id));
      showToast(`Removed "${name}".`);
      if (dossierStartup?.id === id) setDossierStartup(null);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset dataset to default curated demonstration startups?')) {
      setStartups(INITIAL_DEMO_STARTUPS);
      showToast('Demonstration dataset restored.');
    }
  };

  const handleClearDemo = () => {
    if (window.confirm('Purge sample demonstration records from database?')) {
      setStartups(prev => prev.filter(s => !s.isDemo));
      showToast('Sample records removed.');
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Rank', 'Startup Name', 'Category', 'Assessment Status', 'Overall Score',
      'Environmental (25%)', 'Innovation (25%)', 'Social Impact (25%)', 'Financial Viability (25%)',
      'Founder', 'Location', 'Year Established', 'Contact Email', 'Notes'
    ];
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
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `sustainrank_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported dataset to CSV.');
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
  const [formValidationError, setFormValidationError] = useState('');

  const openCreateForm = () => {
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
    setFormValidationError('');
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
    setFormValidationError('');
    setIsFormOpen(true);
  };

  const handleSaveStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formFounder.trim() || !formDesc.trim() || !formLocation.trim() || !formEmail.trim()) {
      setFormValidationError('Please complete all required fields.');
      return;
    }
    if (!formEmail.includes('@') || !formEmail.includes('.')) {
      setFormValidationError('Please enter a valid email address.');
      return;
    }

    if (editingStartup) {
      setStartups(prev => prev.map(s => {
        if (s.id === editingStartup.id) {
          return {
            ...s,
            name: formName.trim(),
            category: formCategory,
            description: formDesc.trim(),
            founderName: formFounder.trim(),
            location: formLocation.trim(),
            yearEstablished: Number(formYear),
            contactEmail: formEmail.trim(),
            primaryTechStack: formTechStack.trim(),
            patentCount: Number(formPatents),
            estimatedCarbonOffsetTons: Number(formCarbonOffset),
            renewableEnergyPercentage: Number(formRenewable),
            clinicalPhase: formClinical.trim(),
            beneficiariesReached: Number(formBeneficiaries),
            unSdgAlignment: formSdg.trim()
          };
        }
        return s;
      }));
      showToast(`Updated "${formName.trim()}".`);
    } else {
      const nextId = startups.length > 0 ? Math.max(...startups.map(s => s.id)) + 1 : 1;
      const createdItem: StartupItem = {
        id: nextId,
        name: formName.trim(),
        category: formCategory,
        description: formDesc.trim(),
        founderName: formFounder.trim(),
        location: formLocation.trim(),
        yearEstablished: Number(formYear),
        contactEmail: formEmail.trim(),
        environmentalScore: 0,
        innovationScore: 0,
        socialImpactScore: 0,
        financialViabilityScore: 0,
        overallScore: 0,
        isAssessed: false,
        isDemo: false,
        createdAt: new Date().toISOString(),
        primaryTechStack: formTechStack.trim(),
        patentCount: Number(formPatents),
        estimatedCarbonOffsetTons: Number(formCarbonOffset),
        renewableEnergyPercentage: Number(formRenewable),
        clinicalPhase: formClinical.trim(),
        beneficiariesReached: Number(formBeneficiaries),
        unSdgAlignment: formSdg.trim()
      };
      setStartups(prev => [createdItem, ...prev]);
      showToast(`Registered "${formName.trim()}".`);
    }
    setIsFormOpen(false);
  };

  const getCategoryBadge = (cat: StartupCategory) => {
    switch (cat) {
      case 'TechStartup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Zap className="w-3 h-3 text-blue-600" /> Tech Startup
          </span>
        );
      case 'GreenStartup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Green Startup
          </span>
        );
      case 'HealthStartup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
            <Activity className="w-3 h-3 text-teal-600" /> Health Startup
          </span>
        );
      case 'SocialStartup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <HeartHandshake className="w-3 h-3 text-amber-600" /> Social Startup
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: StartupCategory) => {
    switch (cat) {
      case 'TechStartup': return 'Tech Startup';
      case 'GreenStartup': return 'Green Startup';
      case 'HealthStartup': return 'Health Startup';
      case 'SocialStartup': return 'Social Startup';
    }
  };

  // =========================================================================
  // VIEW: AUTHENTICATION / LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Sustain<span className="text-emerald-400">Rank</span></h1>
            <p className="text-sm text-slate-400 mt-1">Startup Sustainability Assessment Platform</p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-7 shadow-2xl backdrop-blur-sm">
            <h2 className="text-base font-semibold text-white mb-1">Sign in to your account</h2>
            <p className="text-xs text-slate-400 mb-6">Enter your credentials to access the sustainability evaluation platform.</p>

            {loginError && (
              <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setUsernameInput('admin');
                      setPasswordInput('admin123');
                      setLoginError('');
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                  >
                    Use demo credentials
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Demo Login:</span>
              <span className="font-mono text-slate-300">admin / admin123</span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            &copy; 2026 SustainRank. Enterprise Sustainability Assessment Platform.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN ENTERPRISE APPLICATION LAYOUT
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Modern Left Sidebar Navigation */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
          {/* Brand header */}
          <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight">Sustain<span className="text-emerald-400">Rank</span></div>
              <div className="text-[11px] text-slate-400">Sustainability Platform</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 flex-1">
            <button
              onClick={() => setCurrentNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentNav === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setCurrentNav('startups');
                setSearchQuery('');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentNav === 'startups'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>View Startups</span>
            </button>

            <button
              onClick={openCreateForm}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Startup</span>
            </button>

            <button
              onClick={() => {
                setCurrentNav('startups');
                // Focus on search by navigating to startups view
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Startup</span>
            </button>

            <button
              onClick={() => setCurrentNav('assessments')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentNav === 'assessments'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => setCurrentNav('rankings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentNav === 'rankings'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Ranking</span>
            </button>
          </nav>

          {/* Quick utility actions */}
          <div className="px-3 py-2 border-t border-slate-800 space-y-1">
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* User profile & Logout */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                A
              </div>
              <div className="min-w-0 truncate">
                <div className="font-medium text-white truncate leading-tight">Administrator</div>
                <div className="text-[11px] text-slate-400 truncate">admin@sustainrank.org</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-100/60 overflow-y-auto">
          {/* Top Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-bold text-slate-900 capitalize">
                {currentNav === 'dashboard' && 'Executive Dashboard'}
                {currentNav === 'startups' && 'Startups Directory'}
                {currentNav === 'assessments' && 'Sustainability Assessment'}
                {currentNav === 'rankings' && 'Performance Rankings'}
                {currentNav === 'analytics' && 'Portfolio Analytics'}
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={openCreateForm}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Startup</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium rounded-lg transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* Page Content Body */}
          <div className="p-6 max-w-7xl w-full mx-auto space-y-6">

            {/* =============================================================
                SECTION 1: EXECUTIVE DASHBOARD
                ============================================================= */}
            {currentNav === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Metric KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Startups */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>Total Startups</span>
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Building2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">{stats.total}</div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                        <span className="text-emerald-600 font-medium">{stats.assessedCount} assessed</span>
                        <span>&bull;</span>
                        <span>{stats.pendingCount} pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Domains */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>Active Domains</span>
                      <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-bold text-slate-900 tracking-tight">4 Sectors</div>
                      <div className="mt-1 text-xs text-slate-500 truncate">
                        Tech, Green, Health, Social
                      </div>
                    </div>
                  </div>

                  {/* Average Sustainability Score */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>Portfolio ESG Average</span>
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-emerald-600 tracking-tight">{stats.avgOverall.toFixed(1)}</span>
                        <span className="text-xs text-slate-400">/ 100</span>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        Equal 25% weights across 4 criteria
                      </div>
                    </div>
                  </div>

                  {/* Highest-Ranked Startup */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>Top-Ranked Venture</span>
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Trophy className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      {stats.topRanked ? (
                        <>
                          <div className="text-base font-bold text-slate-900 truncate">{stats.topRanked.name}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              {stats.topRanked.overallScore.toFixed(2)} pts
                            </span>
                            <span className="text-xs text-slate-500 truncate">{getCategoryLabel(stats.topRanked.category)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-slate-400">No assessed startups recorded</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Criteria Benchmarks & Category Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 4 Pillars Benchmark */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">ESG Criteria Portfolio Averages</h2>
                        <p className="text-xs text-slate-500">Benchmark across {stats.assessedCount} assessed ventures</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-700">Environmental Sustainability (25%)</span>
                          <span className="font-semibold text-emerald-600">{stats.avgEnv} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${stats.avgEnv}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-700">Innovation &amp; Technology (25%)</span>
                          <span className="font-semibold text-blue-600">{stats.avgInnov} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${stats.avgInnov}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-700">Social Impact &amp; Inclusion (25%)</span>
                          <span className="font-semibold text-amber-600">{stats.avgSoc} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${stats.avgSoc}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-700">Financial Viability (25%)</span>
                          <span className="font-semibold text-teal-600">{stats.avgFin} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full transition-all" style={{ width: `${stats.avgFin}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Domain Category Distribution */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900 mb-1">Portfolio Domain Representation</h2>
                      <p className="text-xs text-slate-500 mb-4">Distribution of early-stage ventures across recognized sectors</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-100">
                          <div className="text-xs font-medium text-blue-700">Tech Startups</div>
                          <div className="text-xl font-bold text-blue-900 mt-1">{stats.categoryCounts.TechStartup}</div>
                          <div className="text-[11px] text-blue-600/80 mt-0.5">Software &amp; Hardware</div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                          <div className="text-xs font-medium text-emerald-700">Green Startups</div>
                          <div className="text-xl font-bold text-emerald-900 mt-1">{stats.categoryCounts.GreenStartup}</div>
                          <div className="text-[11px] text-emerald-600/80 mt-0.5">CleanTech &amp; Circular</div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-teal-50/60 border border-teal-100">
                          <div className="text-xs font-medium text-teal-700">Health Startups</div>
                          <div className="text-xl font-bold text-teal-900 mt-1">{stats.categoryCounts.HealthStartup}</div>
                          <div className="text-[11px] text-teal-600/80 mt-0.5">MedTech &amp; Biotech</div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-100">
                          <div className="text-xs font-medium text-amber-700">Social Startups</div>
                          <div className="text-xl font-bold text-amber-900 mt-1">{stats.categoryCounts.SocialStartup}</div>
                          <div className="text-[11px] text-amber-600/80 mt-0.5">Community &amp; SDGs</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Database maintenance:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleResetDemo}
                          className="text-slate-600 hover:text-slate-900 transition underline cursor-pointer"
                        >
                          Reset demo data
                        </button>
                        <span>&bull;</span>
                        <button
                          onClick={handleClearDemo}
                          className="text-rose-600 hover:text-rose-700 transition underline cursor-pointer"
                        >
                          Clear sample records
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Additions Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">Recently Registered Startups</h2>
                      <p className="text-xs text-slate-500">Latest additions to the registry</p>
                    </div>
                    <button
                      onClick={() => setCurrentNav('startups')}
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({startups.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200/80 font-medium">
                        <tr>
                          <th className="py-3 px-4">Startup</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Founder</th>
                          <th className="py-3 px-3">Location</th>
                          <th className="py-3 px-3">Overall Score</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {startups.slice(0, 5).map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => setDossierStartup(s)}
                                className="font-semibold text-slate-900 hover:text-emerald-600 transition text-left cursor-pointer"
                              >
                                {s.name}
                              </button>
                              <div className="text-[11px] text-slate-400">Founded {s.yearEstablished}</div>
                            </td>
                            <td className="py-3.5 px-3">
                              {getCategoryBadge(s.category)}
                            </td>
                            <td className="py-3.5 px-3 text-slate-700 font-medium">{s.founderName}</td>
                            <td className="py-3.5 px-3 text-slate-500">{s.location}</td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="font-bold text-slate-900 text-sm">
                                  {s.overallScore.toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic">Unassessed</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Assessed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => setDossierStartup(s)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => openAssessmentModal(s)}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
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

            {/* =============================================================
                SECTION 2: STARTUPS DIRECTORY (Full List & Search)
                ============================================================= */}
            {currentNav === 'startups' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by startup name, founder, or location..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                      />
                    </div>

                    <select
                      value={filterCategory}
                      onChange={e => setFilterCategory(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      <option value="TechStartup">Tech Startups</option>
                      <option value="GreenStartup">Green Startups</option>
                      <option value="HealthStartup">Health Startups</option>
                      <option value="SocialStartup">Social Startups</option>
                    </select>

                    {(searchQuery || filterCategory) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterCategory('');
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 underline transition cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-slate-500">
                    Showing <span className="font-semibold text-slate-800">{rankedStartups.length}</span> of {startups.length} records
                  </div>
                </div>

                {/* Startups Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200/80 font-medium">
                        <tr>
                          <th className="py-3 px-4">Startup</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Founder &amp; Location</th>
                          <th className="py-3 px-3">Scores (E | I | S | F)</th>
                          <th className="py-3 px-3">Overall Score</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rankedStartups.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => setDossierStartup(s)}
                                className="font-semibold text-slate-900 hover:text-emerald-600 transition text-left cursor-pointer"
                              >
                                {s.name}
                              </button>
                              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-xs">{s.description}</div>
                            </td>
                            <td className="py-3.5 px-3">
                              {getCategoryBadge(s.category)}
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-medium text-slate-800">{s.founderName}</div>
                              <div className="text-[11px] text-slate-500">{s.location}</div>
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <div className="flex items-center gap-1 font-mono text-[11px]">
                                  <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200/60" title="Environmental">
                                    E:{s.environmentalScore.toFixed(0)}
                                  </span>
                                  <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200/60" title="Innovation">
                                    I:{s.innovationScore.toFixed(0)}
                                  </span>
                                  <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200/60" title="Social">
                                    S:{s.socialImpactScore.toFixed(0)}
                                  </span>
                                  <span className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200/60" title="Financial">
                                    F:{s.financialViabilityScore.toFixed(0)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">Not evaluated</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="font-bold text-slate-900 text-sm">
                                  {s.overallScore.toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-slate-400">&ndash;</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Assessed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => setDossierStartup(s)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => openAssessmentModal(s)}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                  title="Evaluate Assessment"
                                >
                                  <Sliders className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => openEditForm(s)}
                                  className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                  title="Edit Details"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStartup(s.id, s.name)}
                                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {rankedStartups.length === 0 && (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-slate-400">
                              No startups matched the search criteria. Try adjusting filters or search terms.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================
                SECTION 3: ASSESSMENT WORKFLOW (Overview & Evaluation Hub)
                ============================================================= */}
            {currentNav === 'assessments' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">Sustainability Assessment Matrix</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standardized ESG scoring framework applying equal 25% weights across Environmental, Innovation, Social, and Financial dimensions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      Formula: <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono text-[11px]">(E + I + S + F) / 4</code>
                    </span>
                  </div>
                </div>

                {/* Startups Assessment Queue Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200/80 font-medium">
                        <tr>
                          <th className="py-3 px-4">Startup</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Current Score</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {startups.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              {s.name}
                            </td>
                            <td className="py-3.5 px-3">
                              {getCategoryBadge(s.category)}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="font-bold text-slate-900">{s.overallScore.toFixed(2)} / 100</span>
                              ) : (
                                <span className="text-slate-400 italic">Pending evaluation</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.isAssessed ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Assessed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                  Pending Review
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => openAssessmentModal(s)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition cursor-pointer"
                              >
                                <Sliders className="w-3.5 h-3.5" />
                                <span>{s.isAssessed ? 'Re-Evaluate' : 'Evaluate'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================
                SECTION 4: RANKINGS & LEADERBOARD
                ============================================================= */}
            {currentNav === 'rankings' && (
              <div className="space-y-6">
                {/* Ranking Methodology Banner */}
                <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <h2 className="text-sm font-semibold text-slate-900">Deterministic Multi-Criteria Ranking Algorithm</h2>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Ventures are ordered primarily by <strong>Overall Score (Descending)</strong>. Ties are resolved deterministically in sequential order:
                      <span className="font-semibold text-emerald-700"> 1. Environmental Score</span> &rarr;
                      <span className="font-semibold text-blue-700"> 2. Innovation Score</span> &rarr;
                      <span className="font-semibold text-amber-700"> 3. Social Impact Score</span> &rarr;
                      <span className="font-semibold text-teal-700"> 4. Financial Viability</span> &rarr;
                      <span className="font-semibold text-slate-800"> 5. Alphabetical Name</span>.
                      Unassessed startups are sorted at the bottom with pending status.
                    </p>
                  </div>
                </div>

                {/* Top 3 Podium Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rankedStartups.filter(s => s.isAssessed).slice(0, 3).map((item, idx) => {
                    const badgeStyles = [
                      { rank: '#1', border: 'border-amber-300 bg-amber-50/30', badge: 'bg-amber-400 text-slate-900', label: '1st Rank Leader' },
                      { rank: '#2', border: 'border-slate-300 bg-slate-50/40', badge: 'bg-slate-400 text-white', label: '2nd Place' },
                      { rank: '#3', border: 'border-amber-600/30 bg-amber-50/20', badge: 'bg-amber-700 text-white', label: '3rd Place' }
                    ][idx];

                    return (
                      <div key={item.id} className={`p-5 rounded-xl border ${badgeStyles.border} bg-white shadow-sm flex flex-col justify-between`}>
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`w-7 h-7 rounded-full ${badgeStyles.badge} flex items-center justify-center font-bold text-xs`}>
                              {badgeStyles.rank}
                            </span>
                            {getCategoryBadge(item.category)}
                          </div>
                          <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{item.founderName} &bull; {item.location}</p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                          <span className="text-xs text-slate-500">Composite Score</span>
                          <span className="text-xl font-extrabold text-emerald-700">
                            {item.overallScore.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 100</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Full Rankings Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200/80 font-medium">
                        <tr>
                          <th className="py-3 px-4 text-center w-14">Rank</th>
                          <th className="py-3 px-3">Startup Name</th>
                          <th className="py-3 px-3">Sector</th>
                          <th className="py-3 px-3 text-center">Environmental (25%)</th>
                          <th className="py-3 px-3 text-center">Innovation (25%)</th>
                          <th className="py-3 px-3 text-center">Social (25%)</th>
                          <th className="py-3 px-3 text-center">Financial (25%)</th>
                          <th className="py-3 px-3 text-center font-bold text-slate-900">Overall Score</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rankedStartups.map(s => (
                          <tr key={s.id} className={`hover:bg-slate-50/70 transition ${s.rank === 1 ? 'bg-amber-50/20' : ''}`}>
                            <td className="py-3.5 px-4 text-center">
                              {s.rank ? (
                                <span className={`inline-flex items-center justify-center font-bold rounded-full w-6 h-6 text-xs ${
                                  s.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                                  s.rank === 2 ? 'bg-slate-200 text-slate-800' :
                                  s.rank === 3 ? 'bg-amber-100 text-amber-900' :
                                  'text-slate-600'
                                }`}>
                                  {s.rank}
                                </span>
                              ) : (
                                <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-slate-900">
                              <button
                                onClick={() => setDossierStartup(s)}
                                className="hover:text-emerald-600 transition cursor-pointer text-left"
                              >
                                {s.name}
                              </button>
                            </td>
                            <td className="py-3.5 px-3">
                              {getCategoryBadge(s.category)}
                            </td>
                            <td className="py-3.5 px-3 text-center font-mono">
                              {s.isAssessed ? s.environmentalScore.toFixed(1) : '&ndash;'}
                            </td>
                            <td className="py-3.5 px-3 text-center font-mono">
                              {s.isAssessed ? s.innovationScore.toFixed(1) : '&ndash;'}
                            </td>
                            <td className="py-3.5 px-3 text-center font-mono">
                              {s.isAssessed ? s.socialImpactScore.toFixed(1) : '&ndash;'}
                            </td>
                            <td className="py-3.5 px-3 text-center font-mono">
                              {s.isAssessed ? s.financialViabilityScore.toFixed(1) : '&ndash;'}
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              {s.isAssessed ? (
                                <span className="inline-block px-2.5 py-1 rounded-full font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {s.overallScore.toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic">Unassessed</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => setDossierStartup(s)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => openAssessmentModal(s)}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
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

          </div>
        </main>
      </div>

      {/* =====================================================================
          MODAL: SUSTAINABILITY ASSESSMENT ENGINE
          ===================================================================== */}
      {isAssessmentOpen && assessmentTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">Sustainability Assessment</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evaluating <strong>{assessmentTarget.name}</strong> ({getCategoryLabel(assessmentTarget.category)})
                </p>
              </div>
              <button
                onClick={() => setIsAssessmentOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                <span>Standard Equal Weighting (25% per pillar)</span>
                <code className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-semibold">
                  (E + I + S + F) / 4
                </code>
              </div>

              {/* Pillar 1: Environmental */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Environmental Sustainability (25%)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalEnv}
                      onChange={e => setEvalEnv(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="text-slate-400">/ 100</span>
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
                <p className="text-[11px] text-slate-500">Carbon offset, circular lifecycle, renewable energy adoption, and waste minimization.</p>
              </div>

              {/* Pillar 2: Innovation */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-blue-800 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-600" /> Innovation &amp; Technology Moat (25%)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalInnov}
                      onChange={e => setEvalInnov(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-slate-400">/ 100</span>
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
                <p className="text-[11px] text-slate-500">Patents filed/granted, R&amp;D depth, algorithm defensibility, and technological scalability.</p>
              </div>

              {/* Pillar 3: Social Impact */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-600" /> Social Impact &amp; Inclusion (25%)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalSoc}
                      onChange={e => setEvalSoc(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <span className="text-slate-400">/ 100</span>
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
                <p className="text-[11px] text-slate-500">Beneficiaries reached, UN SDG alignment, community upliftment, and ethical governance.</p>
              </div>

              {/* Pillar 4: Financial Viability */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-teal-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-600" /> Financial Viability &amp; Traction (25%)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={evalFin}
                      onChange={e => setEvalFin(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="w-16 px-2 py-1 text-xs text-right font-mono font-bold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-slate-400">/ 100</span>
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
                <p className="text-[11px] text-slate-500">Runway stability, commercial contract traction, unit margins, and capital efficiency.</p>
              </div>

              {/* Real-time Computed Score Card */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">Live Computed Overall Score</div>
                <div className="text-3xl font-extrabold text-emerald-700 my-1">
                  {computedOverallScore.toFixed(2)} <span className="text-sm font-normal text-emerald-900">/ 100</span>
                </div>
                <span className="text-xs font-medium text-emerald-800">
                  {computedOverallScore >= 85 ? 'Tier 1: ESG Leader / Exceptional Performance' :
                   computedOverallScore >= 70 ? 'Tier 2: Strong Sustainability Compliance' :
                   computedOverallScore >= 50 ? 'Tier 3: Moderate / Developing Transition' :
                   'Tier 4: Elevated ESG Risk Factor'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assessment Observations &amp; Notes</label>
                <textarea
                  rows={2}
                  value={evalNotes}
                  onChange={e => setEvalNotes(e.target.value)}
                  placeholder="Record qualitative audit evidence, certifications, patents, or clinical milestones..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
              <button
                onClick={() => setIsAssessmentOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssessment}
                className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition cursor-pointer"
              >
                Save &amp; Update Rankings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADD / EDIT STARTUP
          ===================================================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  {editingStartup ? 'Edit Startup Details' : 'Register New Startup'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Record venture parameters and industry category domain metrics
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStartup} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formValidationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formValidationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Startup Name *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. EcoLoop Packaging"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category Domain *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as StartupCategory)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition cursor-pointer"
                  >
                    <option value="TechStartup">Tech Startup</option>
                    <option value="GreenStartup">Green Startup</option>
                    <option value="HealthStartup">Health Startup</option>
                    <option value="SocialStartup">Social Startup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Venture Description &amp; Mission *</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Overview of core technology, products, and environmental/social value proposition..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Founder / Leader *</label>
                  <input
                    type="text"
                    value={formFounder}
                    onChange={e => setFormFounder(e.target.value)}
                    placeholder="e.g. Dr. Ananya Sharma"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Location / HQ *</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Year Founded *</label>
                  <input
                    type="number"
                    value={formYear}
                    onChange={e => setFormYear(Number(e.target.value))}
                    min={1990}
                    max={2030}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  placeholder="contact@startup.com"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition"
                  required
                />
              </div>

              {/* Category-Specific Domain Fields */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                  Domain Attributes ({getCategoryLabel(formCategory)})
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
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">Granted / Filed Patents</label>
                      <input
                        type="number"
                        value={formPatents}
                        onChange={e => setFormPatents(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
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
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
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
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
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
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <input type="checkbox" id="hipaa" defaultChecked className="accent-emerald-600 cursor-pointer" />
                      <label htmlFor="hipaa" className="text-[11px] text-slate-700 cursor-pointer">HIPAA / CDSCO Compliant</label>
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
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">UN SDG Alignment</label>
                      <input
                        type="text"
                        value={formSdg}
                        onChange={e => setFormSdg(e.target.value)}
                        placeholder="SDG 6, SDG 7"
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition cursor-pointer"
                >
                  {editingStartup ? 'Save Changes' : 'Register Startup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: STARTUP PROFILE DOSSIER (View Details)
          ===================================================================== */}
      {dossierStartup && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {getCategoryBadge(dossierStartup.category)}
                  {dossierStartup.rank && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
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
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <h4 className="font-semibold text-slate-800 uppercase text-[11px] mb-1">Company Overview</h4>
                <p className="text-slate-600 leading-relaxed">{dossierStartup.description}</p>
              </div>

              {/* ESG Score Breakdown */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-baseline justify-between border-b border-slate-200/80 pb-2.5">
                  <span className="font-semibold text-slate-800">Overall Sustainability Score</span>
                  <span className="text-2xl font-black text-emerald-700">
                    {dossierStartup.isAssessed ? dossierStartup.overallScore.toFixed(2) : '0.00'}
                    <span className="text-xs font-normal text-slate-400 ml-1">/ 100</span>
                  </span>
                </div>

                {dossierStartup.isAssessed ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-500">Environmental (25%)</span>
                      <div className="text-base font-bold text-emerald-700 mt-0.5">{dossierStartup.environmentalScore.toFixed(1)}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-500">Innovation (25%)</span>
                      <div className="text-base font-bold text-blue-700 mt-0.5">{dossierStartup.innovationScore.toFixed(1)}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-500">Social Impact (25%)</span>
                      <div className="text-base font-bold text-amber-700 mt-0.5">{dossierStartup.socialImpactScore.toFixed(1)}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-[10px] text-slate-500">Financial (25%)</span>
                      <div className="text-base font-bold text-teal-700 mt-0.5">{dossierStartup.financialViabilityScore.toFixed(1)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-center">
                    This startup has not received a formal sustainability assessment yet.
                  </div>
                )}
              </div>

              {/* Assessment Notes */}
              {dossierStartup.assessmentNotes && (
                <div>
                  <h4 className="font-semibold text-slate-800 uppercase text-[11px] mb-1">Evaluator Observations</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 italic">
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
                onClick={() => handleDeleteStartup(dossierStartup.id, dossierStartup.name)}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Delete Startup
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const target = dossierStartup;
                    setDossierStartup(null);
                    openAssessmentModal(target);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition cursor-pointer"
                >
                  <Sliders className="w-3 h-3 inline mr-1" /> Evaluate Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
