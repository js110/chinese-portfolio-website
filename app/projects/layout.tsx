import { EditModeProvider } from '@/contexts/EditModeContext';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <EditModeProvider>{children}</EditModeProvider>;
} 