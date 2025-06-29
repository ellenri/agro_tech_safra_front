import type { NavigationItem } from '../types';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { id: 'upload', label: 'Upload de Dados', icon: '📁', path: '/upload', active: true },
  { id: 'analysis', label: 'Análises', icon: '🔍', path: '/analysis' },
  { id: 'reports', label: 'Relatórios', icon: '📄', path: '/reports' },
  { id: 'settings', label: 'Configurações', icon: '⚙️', path: '/settings' },
];

export default function Sidebar({ activeItem = 'upload', onItemClick }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌾</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">AgroTech Safra</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick?.(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeItem === item.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Usuário</p>
            <p className="text-xs text-gray-500 truncate">usuario@exemplo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}