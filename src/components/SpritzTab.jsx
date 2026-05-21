import { useState } from 'react'
import {
  Sunrise, Sunset, Footprints, Utensils, PawPrint,
  Ban, Droplets, Baby, Stethoscope, AlertTriangle, ChevronDown,
} from 'lucide-react'

const TERRA      = '#B85C38'
const ALERT      = '#C0392B'
const ALERT_LIGHT = '#FBF0EE'
const ALERT_TEXT  = '#8B2512'
const TEXT       = '#2C1A12'
const TEXT_MUTED = '#7A5C4E'
const BORDER     = '#D9CABF'
const CARD       = '#FAF6F1'

function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: CARD, borderRadius: '8px',
      padding: '14px 16px', border: `1px solid ${BORDER}`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '11px', color: TEXT_MUTED, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

function Row({ icon, title, detail, accent }) {
  const LucideIcon = typeof icon === 'function' ? icon : null
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: '20px', marginTop: '2px', display: 'flex', justifyContent: 'center' }}>
        {LucideIcon
          ? <LucideIcon size={15} color={accent || TEXT_MUTED} strokeWidth={2} />
          : <span style={{ fontSize: '15px', lineHeight: 1 }}>{icon}</span>
        }
      </div>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: accent || TEXT, lineHeight: '1.3' }}>{title}</div>
        {detail && <div style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '2px', lineHeight: '1.4' }}>{detail}</div>}
      </div>
    </div>
  )
}

function ScheduleCard({ Icon, timeLabel, title, items }) {
  const [open, setOpen] = useState(false)
  return (
    <Card>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, textAlign: 'left', fontFamily: 'Nunito, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon size={16} color={open ? TERRA : TEXT_MUTED} strokeWidth={2} />
            <div>
              <div style={{
                fontSize: '11px', fontWeight: 700, color: TEXT_MUTED,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                {timeLabel}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: TEXT }}>{title}</div>
            </div>
          </div>
          <ChevronDown
            size={16} color={TEXT_MUTED}
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
          />
        </div>
      </button>
      {open && (
        <div style={{
          marginTop: '12px', borderTop: `1px solid ${BORDER}`, paddingTop: '12px',
          display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
          {items.map((item, i) => (
            <Row key={i} icon={item.icon} title={item.title} detail={item.detail} accent={item.accent} />
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
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: TEXT_MUTED }}>
          He's a good boy — here's what he needs.
        </p>
      </div>

      {/* Sarah's dogs warning */}
      <Card style={{
        backgroundColor: ALERT_LIGHT,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${ALERT}`,
        paddingLeft: '13px',
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
          <AlertTriangle size={18} color={ALERT} strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: ALERT }}>Sarah's dogs</div>
            <div style={{ fontSize: '13px', color: ALERT_TEXT, marginTop: '2px' }}>Please read — this is important.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            ['Sarah\'s dogs must be FULLY separated from Lincoln at all times.', false],
            ['One of Sarah\'s dogs bites.', true],
            ['Sarah\'s dogs cannot be left alone in the house — ever.', false],
            ['Sarah knows this rule — it\'s already been discussed with her.', false],
          ].map(([rule, bold], i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: ALERT, fontWeight: 800, flexShrink: 0, fontSize: '14px', marginTop: '2px' }}>–</span>
              <span style={{ fontSize: '13px', color: ALERT_TEXT, lineHeight: '1.45', fontWeight: bold ? 700 : 400 }}>{rule}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionLabel>Daily schedule</SectionLabel>

      <ScheduleCard
        Icon={Sunrise}
        timeLabel="Morning"
        title="Morning walk & breakfast"
        items={[
          { icon: Footprints, title: '7:00–8:00 AM — Walk time', detail: 'He loves a good morning stroll.' },
          { icon: Utensils, title: '1.5 scoops kibble', detail: 'After the walk, measure carefully.' },
          { icon: '🦷', title: '1 treat per day', detail: 'CET Chew ("treasure") OR Veggie Dent ("tartar control") — pick one, not both.' },
        ]}
      />

      <ScheduleCard
        Icon={Sunset}
        timeLabel="Evening"
        title="Evening walk & dinner"
        items={[
          { icon: Footprints, title: '~5:00 PM — Walk time', detail: 'He\'ll let you know when he\'s ready.' },
          { icon: Utensils, title: '~6:00 PM — 1 scoop kibble', detail: 'Evening serving is smaller than morning.' },
        ]}
      />

      <SectionLabel>Important rules</SectionLabel>

      <Card style={{ borderLeft: `3px solid ${TERRA}`, paddingLeft: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <PawPrint size={15} color={TERRA} strokeWidth={2} />
          <span style={{ fontSize: '14px', fontWeight: 700, color: TERRA }}>House rules for Spritz</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row icon={Ban}      title="No human food or table scraps" detail="It really upsets his belly. He will absolutely beg — he does not need more." />
          <Row icon={Droplets} title="Backyard bathroom is okay in rain" detail="He can go in the mulch. Please pick it up!" />
          <Row icon={Baby}     title="Never leave Spritz near Lincoln unsupervised" />
          <Row icon={AlertTriangle} title="Keep Lincoln away from Spritz's face" />
        </div>
      </Card>

      <SectionLabel>Vet info</SectionLabel>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Row
            icon={Stethoscope}
            title="Non-emergency: Good Vets"
            detail="Call us first and we'll help coordinate."
          />
          <div style={{ height: '1px', backgroundColor: BORDER }} />
          <Row
            icon={AlertTriangle}
            title="Emergency vet"
            detail="Find the nearest open emergency vet and text us immediately."
            accent={ALERT}
          />
        </div>
      </Card>
    </div>
  )
}
