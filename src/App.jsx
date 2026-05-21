import { useState } from 'react'
import { Leaf, PawPrint, Home, AlertCircle } from 'lucide-react'
import LincolnTab from './components/LincolnTab'
import SpritzTab from './components/SpritzTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'
import './App.css'

const TABS = [
  { id: 'lincoln',   label: 'Lincoln', Icon: Leaf },
  { id: 'spritz',    label: 'Spritz',  Icon: PawPrint },
  { id: 'house',     label: 'House',   Icon: Home },
  { id: 'emergency', label: 'SOS',     Icon: AlertCircle },
]

const NAV_BG     = '#2C1A12'
const NAV_ACTIVE = '#B85C38'
const NAV_MUTED  = '#7A5C4E'
const NAV_SOS    = '#C0392B'

export default function App() {
  const [activeTab, setActiveTab] = useState('lincoln')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#F2EBE1' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }} className="no-scrollbar">
        {activeTab === 'lincoln'   && <LincolnTab />}
        {activeTab === 'spritz'    && <SpritzTab />}
        {activeTab === 'house'     && <HouseTab />}
        {activeTab === 'emergency' && <EmergencyTab />}
      </div>

      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        backgroundColor: NAV_BG,
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 50,
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const isEmergency = tab.id === 'emergency'
          const iconColor = isEmergency ? NAV_SOS : (isActive ? NAV_ACTIVE : NAV_MUTED)
          const { Icon } = tab

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '10px 4px 12px', border: 'none', background: 'none',
                cursor: 'pointer', gap: '4px', position: 'relative',
              }}
            >
              {isActive && (
                <span style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '28px', height: '2px',
                  backgroundColor: isEmergency ? NAV_SOS : NAV_ACTIVE,
                }}/>
              )}
              <Icon size={22} color={iconColor} strokeWidth={isActive ? 2.5 : 2.25} />
              <span style={{
                fontSize: '11px', fontWeight: isActive ? 700 : 600,
                color: iconColor, fontFamily: 'Nunito, sans-serif', letterSpacing: '0.01em',
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
