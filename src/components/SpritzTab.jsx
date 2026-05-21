import { useState } from 'react'

const TERRA = '#C4795A'
const TERRA_LIGHT = '#F5EAE5'
const ALERT = '#C45A5A'
const ALERT_LIGHT = '#F5E5E5'
const TEXT = '#3A3530'
const TEXT_MUTED = '#7A746E'
const BORDER = '#EBE8E3'
const CARD = '#FFFFFF'

function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: CARD, borderRadius: '20px', padding: '18px',
      boxShadow: '0 2px 12px rgba(58,53,48,0.06)', ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: '12px', color: TEXT_MUTED, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {children}
    </div>
  )
}

function Row({ icon, title, detail, accent }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: accent || TEXT }}>{title}</div>
        {detail && <div style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '2px', lineHeight: '1.4' }}>{detail}</div>}
      </div>
    </div>
  )
}

function ScheduleCard({ emoji, timeLabel, title, items }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{ border: `1.5px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'Nunito, sans-serif' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              backgroundColor: TERRA_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            }}>
              {emoji}
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: TERRA, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{timeLabel}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: TEXT }}>{title}</div>
            </div>
          </div>
          <span style={{ fontSize: '20px', color: TEXT_MUTED, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
        </div>
      </button>
      {open && (
        <div style={{ marginTop: '14px', borderTop: `1px solid ${BORDER}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, i) => (
            <Row key={i} icon={item.icon} title={item.title} detail={item.detail} />
          ))}
        </div>
      )}
    </Card>
  )
}

export default function SpritzTab() {
  return (
    <div style={{ padding: '20px 16px 8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: TEXT, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>
          Hey Spritz! 🐾
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '15px', color: TEXT_MUTED }}>
          He's a good boy — here's what he needs.
        </p>
      </div>

      {/* Sarah's dogs — MUST be first, most visible */}
      <Card style={{ backgroundColor: ALERT_LIGHT, border: `2px solid ${ALERT}` }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span style={{ fontSize: '22px' }}>⚠️</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: ALERT }}>Sarah's dogs</div>
            <div style={{ fontSize: '13px', color: '#8B3A3A', marginTop: '2px' }}>Please read — this is important.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Sarah\'s dogs must be FULLY separated from Lincoln at all times.',
            'One of Sarah\'s dogs bites.',
            'Sarah\'s dogs cannot be left alone in the house — ever.',
            'Sarah knows this rule — it\'s already been discussed with her.',
          ].map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: ALERT, fontWeight: 800, flexShrink: 0, fontSize: '14px', marginTop: '2px' }}>•</span>
              <span style={{ fontSize: '14px', color: '#5C2A2A', lineHeight: '1.45', fontWeight: i === 1 ? 700 : 400 }}>{rule}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionLabel>Daily schedule</SectionLabel>

      <ScheduleCard
        emoji="🌄"
        timeLabel="Morning"
        title="Morning walk & breakfast"
        items={[
          { icon: '🦮', title: '7:00–8:00 AM — Walk time', detail: 'He loves a good morning stroll.' },
          { icon: '🥣', title: '1.5 scoops kibble', detail: 'After the walk, measure carefully.' },
          { icon: '🦷', title: '1 treat per day', detail: 'CET Chew ("treasure") OR Veggie Dent ("tartar control") — pick one, not both.' },
        ]}
      />

      <ScheduleCard
        emoji="🌇"
        timeLabel="Evening"
        title="Evening walk & dinner"
        items={[
          { icon: '🦮', title: '~5:00 PM — Walk time', detail: 'He\'ll let you know when he\'s ready.' },
          { icon: '🥣', title: '~6:00 PM — 1 scoop kibble', detail: 'Evening serving is smaller than morning.' },
        ]}
      />

      <SectionLabel>Important rules</SectionLabel>

      <Card style={{ border: `1.5px solid ${TERRA}`, backgroundColor: TERRA_LIGHT }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '20px' }}>🐕</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: TERRA }}>House rules for Spritz</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            ['🚫', 'No human food or table scraps', 'It really upsets his belly. He will absolutely beg — he does not need more.'],
            ['🌧️', 'Backyard bathroom is okay in rain', 'He can go in the mulch. Please pick it up!'],
            ['👶', 'Never leave Spritz near Lincoln unsupervised', null],
            ['😤', 'Keep Lincoln away from Spritz\'s face', null],
          ].map(([icon, title, detail]) => (
            <Row key={title} icon={icon} title={title} detail={detail} />
          ))}
        </div>
      </Card>

      <SectionLabel>Vet info</SectionLabel>

      <Card style={{ border: `1.5px solid ${BORDER}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Row
            icon="🏥"
            title="Non-emergency: Good Vets"
            detail="Call us first and we'll help coordinate."
          />
          <div style={{ height: '1px', backgroundColor: BORDER }} />
          <Row
            icon="🚨"
            title="Emergency vet"
            detail="Find the nearest open emergency vet and text us immediately."
            accent={ALERT}
          />
        </div>
      </Card>
    </div>
  )
}
