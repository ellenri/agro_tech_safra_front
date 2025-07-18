import type { NavigationItem } from '../types';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const IconComponent = ({ icon }: { icon: string }) => {
  const iconProps = "w-4 h-4 text-current";
  
  switch (icon) {    
    case 'upload':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      );
    case 'search':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 'document':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'settings':
      return (
        <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const navigationItems: NavigationItem[] = [
  { id: 'upload', label: 'Upload de Dados', icon: 'upload', path: '/upload', active: true },
  { id: 'analysis', label: 'Análises', icon: 'search', path: '/analysis' },  
];

export default function Sidebar({ activeItem = 'upload', onItemClick }: SidebarProps) {
  return (
    <div className="w-52 bg-[#5a8a6b] h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 pt-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick?.(item)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-left transition-colors text-sm ${
                  activeItem === item.id
                    ? 'bg-[#3d6b4d] text-white font-medium'
                    : 'bg-transparent text-white hover:bg-[#4a7c59] hover:text-white'
                }`}
              >
                <IconComponent icon={item.icon} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#2d5a3d] to-[#f59e0b] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Usuário</p>
            <p className="text-xs text-[#e5f2e8] truncate">usuario@exemplo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}