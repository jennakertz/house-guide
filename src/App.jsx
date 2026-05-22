import { useState, useRef, useCallback } from 'react'
import { CalendarDays, Home, AlertTriangle, AlertOctagon } from 'lucide-react'
import ScheduleTab from './components/ScheduleTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'

const TABS = [
  { id: 'schedule',  label: 'Schedule',  Icon: CalendarDays },
  { id: 'house',     label: 'House',     Icon: Home },
  { id: 'emergency', label: 'Emergency', Icon: AlertTriangle },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback((e) => {
    const y = e.currentTarget.scrollTop
    if (y > lastScrollY.current + 10 && y > 60) {
      setNavVisible(false)
    } else if (y < lastScrollY.current - 10) {
      setNavVisible(true)
    }
    lastScrollY.current = y
  }, [])

  const goToEmergency = useCallback(() => {
    setActiveTab('emergency')
    setNavVisible(true)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#F5F3EF' }}>
      {/* Scrollable content */}
      <div
        className="no-scrollbar"
        onScroll={handleScroll}
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

      {/* Bottom nav — auto-hides on scroll down */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: navVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(calc(100% + 2px))',
          width: '100%',
          maxWidth: '430px',
          height: 'calc(56px + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid #EDE9E3',
          display: 'flex',
          alignItems: 'stretch',
          zIndex: 40,
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const { Icon } = tab
          const color = isActive ? '#1A1612' : '#C4BDB5'
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
                  backgroundColor: '#B85C38',
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

      {/* Floating SOS button — always visible */}
      <button
        onClick={goToEmergency}
        aria-label="Emergency contacts"
        style={{
          position: 'fixed',
          bottom: navVisible
            ? 'calc(56px + env(safe-area-inset-bottom) + 14px)'
            : '16px',
          right: '16px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#C0392B',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(192,57,43,0.3)',
          zIndex: 50,
          transition: 'bottom 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <AlertOctagon size={22} color="#FFFFFF" strokeWidth={1.5} />
      </button>
    </div>
  )
}
