import { useState, useRef, useCallback, useEffect } from 'react'
import { CalendarDays, Home, Phone, Compass } from 'lucide-react'
import { haptic } from './haptic'
import ScheduleTab from './components/ScheduleTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'
import ActivitiesTab from './components/ActivitiesTab'

const TABS = [
  { id: 'schedule',   label: 'Schedule', Icon: CalendarDays },
  { id: 'house',      label: 'House',    Icon: Home },
  { id: 'activities', label: 'Explore',  Icon: Compass },
  { id: 'emergency',  label: 'Contacts', Icon: Phone },
]

const ACCENT = '#7EC8C8'

export default function App() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollRef = useRef(null)

  const handleScroll = useCallback((e) => {
    const y = e.currentTarget.scrollTop
    if (y > lastScrollY.current + 10 && y > 60) {
      setNavVisible(false)
    } else if (y < lastScrollY.current - 10) {
      setNavVisible(true)
    }
    lastScrollY.current = y
  }, [])

  const handleTabChange = useCallback((tabId) => {
    haptic(40)
    setActiveTab(tabId)
    setNavVisible(true)
    lastScrollY.current = 0
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || el.scrollTop === 0) return
    const start = el.scrollTop
    const startTime = performance.now()
    const duration = 320
    let raf
    function step(now) {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3) // ease-out cubic
      el.scrollTop = start * (1 - ease)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'linear-gradient(160deg, #FAF8F4 0%, #EBE7DF 100%)' }}>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: 'calc(96px + env(safe-area-inset-bottom))',
        }}
      >
        {activeTab === 'schedule'   && <ScheduleTab />}
        {activeTab === 'house'      && <HouseTab />}
        {activeTab === 'activities' && <ActivitiesTab />}
        {activeTab === 'emergency'  && <EmergencyTab />}
      </div>

      {/* Floating pill nav */}
      <nav
        style={{
          position: 'fixed',
          bottom: 'calc(20px + env(safe-area-inset-bottom))',
          left: '50%',
          transform: navVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(calc(100% + 28px))',
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
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const { Icon } = tab
          const color = isActive ? ACCENT : '#5C554E'
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
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
