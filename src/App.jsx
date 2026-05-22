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

const ACCENT = '#B85C38'

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
          paddingBottom: 'calc(72px + env(safe-area-inset-bottom))',
        }}
      >
        {activeTab === 'schedule'  && <ScheduleTab />}
        {activeTab === 'house'     && <HouseTab />}
        {activeTab === 'emergency' && <EmergencyTab />}
      </div>

      {/* Bottom nav */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          height: 'calc(56px + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'rgba(255, 252, 250, 0.88)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          borderTop: '1px solid rgba(232, 228, 222, 0.7)',
          boxShadow: '0 -1px 12px rgba(26,22,18,0.05)',
          display: 'flex',
          alignItems: 'stretch',
          zIndex: 40,
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const { Icon } = tab
          const color = isActive ? ACCENT : '#C4BDB5'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '3px', border: 'none', background: 'none',
                cursor: 'pointer', padding: '8px 4px 0',
                position: 'relative',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px', height: '2px',
                  backgroundColor: ACCENT,
                  borderRadius: '0 0 2px 2px',
                }} />
              )}
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
