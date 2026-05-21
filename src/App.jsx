import { useState } from 'react'
import LincolnTab from './components/LincolnTab'
import SpritzTab from './components/SpritzTab'
import HouseTab from './components/HouseTab'
import EmergencyTab from './components/EmergencyTab'
import './App.css'

const TABS = [
  { id: 'lincoln', label: 'Lincoln', emoji: '🌿', color: '#7BAF8A', lightColor: '#EAF3ED' },
  { id: 'spritz',  label: 'Spritz',  emoji: '🐾', color: '#C4795A', lightColor: '#F5EAE5' },
  { id: 'house',   label: 'House',   emoji: '🏠', color: '#7A746E', lightColor: '#F0EDE8' },
  { id: 'emergency', label: 'SOS',   emoji: '🚨', color: '#C45A5A', lightColor: '#F5E5E5' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('lincoln')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#FAF8F4' }}>
      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }} className="no-scrollbar">
        {activeTab === 'lincoln'   && <LincolnTab />}
        {activeTab === 'spritz'    && <SpritzTab />}
        {activeTab === 'house'     && <HouseTab />}
        {activeTab === 'emergency' && <EmergencyTab />}
      </div>

      {/* Bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EBE8E3',
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(58,53,48,0.06)',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const isEmergency = tab.id === 'emergency'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 4px 12px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                gap: '3px',
                position: 'relative',
              }}
            >
              {/* Emergency dot indicator */}
              {isEmergency && !isActive && (
                <span style={{
                  position: 'absolute', top: '8px', right: 'calc(50% - 14px)',
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: '#C45A5A',
                  border: '1.5px solid #fff',
                }}/>
              )}
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{tab.emoji}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? tab.color : '#7A746E',
                fontFamily: 'Nunito, sans-serif',
                letterSpacing: '0.01em',
              }}>
                {tab.label}
              </span>
              {isActive && (
                <span style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '24px', height: '3px', borderRadius: '2px 2px 0 0',
                  backgroundColor: tab.color,
                }}/>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
