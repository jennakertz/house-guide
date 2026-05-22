import { useState, useRef, useCallback, useEffect } from 'react'
import { CalendarDays, Home, Phone, Compass } from 'lucide-react'
import { haptic } from './haptic'
import ScheduleTab from './components/ScheduleTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'
import ActivitiesTab from './components/ActivitiesTab'
import SplashScreen from './components/SplashScreen'
import TourOverlay from './components/TourOverlay'

const TABS = [
  { id: 'schedule',   label: 'Schedule', Icon: CalendarDays },
  { id: 'house',      label: 'House',    Icon: Home },
  { id: 'activities', label: 'Explore',  Icon: Compass },
  { id: 'emergency',  label: 'Contacts', Icon: Phone },
]

const ACCENT = '#7EC8C8'
const INACTIVE = 'rgba(255,255,255,0.55)'

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashSeen'))
  const [showTour, setShowTour] = useState(false)
  const [activeTab, setActiveTab] = useState('schedule')
  const [navVisible, setNavVisible] = useState(true)

  const handleDismiss = useCallback(() => {
    sessionStorage.setItem('splashSeen', '1')
    setShowSplash(false)
    if (!sessionStorage.getItem('tourSeen')) setShowTour(true)
  }, [])

  const handleTourDismiss = useCallback(() => {
    sessionStorage.setItem('tourSeen', '1')
    setShowTour(false)
  }, [])

  const handleTourTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
    setNavVisible(true)
    lastScrollY.current = 0
  }, [])
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
    const divStart = scrollRef.current?.scrollTop ?? 0
    const winStart = window.scrollY ?? 0
    if (divStart === 0 && winStart === 0) return
    const startTime = performance.now()
    const duration = 320
    let raf
    function step(now) {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      if (divStart > 0 && scrollRef.current) scrollRef.current.scrollTop = divStart * (1 - ease)
      if (winStart > 0) window.scrollTo(0, winStart * (1 - ease))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'linear-gradient(160deg, #FAF8F4 0%, #EBE7DF 100%)' }}>
      {showSplash && <SplashScreen onDismiss={handleDismiss} />}
      {showTour && <TourOverlay onDismiss={handleTourDismiss} onTabChange={handleTourTabChange} />}
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
        data-tour="tour-nav"
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
          backgroundColor: 'rgba(58, 54, 50, 0.78)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          boxShadow: [
            '0 8px 32px rgba(30,27,24,0.28)',
            '0 2px 8px rgba(30,27,24,0.16)',
            'inset 0 1px 0 rgba(255,255,255,0.10)',
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
          const color = isActive ? ACCENT : INACTIVE
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
