import { useState } from 'react'
import { CalendarDays, Home, AlertTriangle } from 'lucide-react'
import ScheduleTab from './components/ScheduleTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'

const TABS = [
  { id: 'schedule',  label: 'Schedule',  Icon: CalendarDays },
  { id: 'house',     label: 'House',     Icon: Home },
  { id: 'emergency', label: 'Emergency', Icon: AlertTriangle },
]

const ACCENT = '#7EC8C8'

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#F5F3EF' }}>
      {/* Scrollable content */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: 'calc(96px + env(safe-area-inset-bottom))',
        }}
      >
        {activeTab === 'schedule'  && <ScheduleTab />}
        {activeTab === 'house'     && <HouseTab />}
        {activeTab === 'emergency' && <EmergencyTab />}
      </div>

      {/* Floating pill nav */}
      <nav
        style={{
          position: 'fixed',
          bottom: 'calc(20px + env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '400px',
          height: '62px',
          borderRadius: '22px',
          backgroundColor: 'rgba(255, 253, 251, 0.45)',
          backdropFilter: 'blur(28px) saturate(1.9)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.9)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: [
            '0 8px 32px rgba(74,69,64,0.13)',
            '0 2px 8px rgba(74,69,64,0.08)',
            'inset 0 1px 0 rgba(255,255,255,0.85)',
            'inset 0 -1px 0 rgba(74,69,64,0.04)',
          ].join(', '),
          display: 'flex',
          alignItems: 'stretch',
          zIndex: 40,
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const { Icon } = tab
          const color = isActive ? ACCENT : '#B8B0A8'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '4px', border: 'none', background: 'none',
                cursor: 'pointer', padding: '0 4px',
                borderRadius: '22px',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} color={color} />
              <span style={{
                fontSize: '11px', fontFamily: 'DM Sans, sans-serif',
                fontWeight: isActive ? 500 : 400, color,
                letterSpacing: '0.01em',
              }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
