/**
 * Skyfall Ledger — Curated Lucide whitelist
 *
 * Why a whitelist?
 *  - Clear story for what is "in" the design system vs ad-hoc usage.
 *  - Tree-shaking is preserved because each icon is a named re-export, but
 *    we keep the surface area focused so docs and stories stay manageable.
 *  - Adding an icon is a deliberate, reviewable change.
 *
 * Add icons here as the system grows. The first batch covers the icons
 * needed for Wave 1–7 (foundations, money visibility, action-first surfaces,
 * trust cues). Investing, ops, and KYC waves will append to the list later.
 *
 * Direct `lucide-react` imports are only allowed inside `src/icons/**` —
 * see `.eslintrc.cjs`.
 */
export {
  // Arrows / movement
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,

  // Money / finance staples
  Wallet,
  CreditCard,
  Landmark,
  Building2,
  Banknote,
  Coins,
  PiggyBank,
  Receipt,

  // Trends / data
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  PieChart,

  // Trust / security
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,

  // Alerts / status
  Bell,
  BellRing,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Check,
  X,

  // Search / filter / nav
  Search,
  Filter,
  SlidersHorizontal,
  Settings,
  MoreHorizontal,
  MoreVertical,

  // Time / history
  Calendar,
  CalendarClock,
  Clock,
  History,
  RefreshCw,

  // Files / docs
  Download,
  Upload,
  FileText,
  Paperclip,

  // People
  User,
  Users,
  UserPlus,

  // System
  Sun,
  Moon,
  ExternalLink,
  Copy,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
