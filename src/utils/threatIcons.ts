import { 
  ShieldAlert, 
  Smartphone, 
  PhoneCall, 
  QrCode, 
  Bug, 
  FileLock2, 
  UserX, 
  KeyRound, 
  BrainCircuit, 
  Globe2, 
  Briefcase, 
  TrendingDown, 
  Share2, 
  Database 
} from 'lucide-react';
import React from 'react';

export const THREAT_ICONS: Record<string, React.ElementType> = {
  phishing: ShieldAlert,
  smishing: Smartphone,
  vishing: PhoneCall,
  'upi-fraud': QrCode,
  malware: Bug,
  ransomware: FileLock2,
  'identity-theft': UserX,
  'password-attacks': KeyRound,
  'social-engineering': BrainCircuit,
  'fake-websites': Globe2,
  'job-scams': Briefcase,
  'investment-scams': TrendingDown,
  'social-media-theft': Share2,
  'data-breaches': Database
};

export const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'CRITICAL':
      return 'bg-red-500/15 text-red-400 border border-red-500/30';
    case 'HIGH':
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
    case 'MEDIUM':
      return 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30';
    case 'LOW':
    default:
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
  }
};
