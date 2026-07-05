import { Phone, AlertTriangle, Heart, Baby, PawPrint, Stethoscope } from 'lucide-react'

const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  blue:    '#7EC8C8',
  sos:     '#C0392B',
}

const CARD_SHADOW = '0 1px 2px rgba(74,69,64,0.05), 0 2px 10px rgba(74,69,64,0.06)'

function SectionLabel({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      fontSize: '10px', fontWeight: 500, color: C.muted,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>
      <div style={{ width: '14px', height: '1.5px', backgroundColor: C.blue, flexShrink: 0 }} />
      {children}
    </div>
  )
}

function CallBtn({ number, label, variant = 'dark' }) {
  const isDark = variant === 'dark'
  const isRed  = variant === 'red'
  return (
    <a
      href={`tel:+1${number.replace(/\D/g, '')}`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        backgroundColor: isRed ? C.sos : isDark ? C.text : '#F5F3EF',
        color: (isRed || isDark) ? '#FFFFFF' : C.text,
        border: (isRed || isDark) ? 'none' : `1px solid ${C.border}`,
        borderRadius: '6px', padding: '9px 16px',
        fontSize: '14px', fontWeight: 500,
        textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
        flexShrink: 0,
      }}
    >
      <Phone size={15} strokeWidth={1.5} />
      {label}
    </a>
  )
}

function ContactCard({ Icon, role, name, number, note }) {
  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '16px',
      boxShadow: CARD_SHADOW,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '10px', fontWeight: 500, color: C.muted,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px',
          }}>
            {role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Icon size={16} strokeWidth={1.5} color={C.muted} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>{name}</span>
          </div>
          <div style={{ fontSize: '13px', color: C.muted, marginBottom: note ? '6px' : 0 }}>
            {number}
          </div>
          {note && (
            <div style={{ fontSize: '13px', color: C.muted, fontStyle: 'italic', lineHeight: '1.4' }}>
              {note}
            </div>
          )}
        </div>
        <CallBtn number={number} label="Call" variant="dark" />
      </div>
    </div>
  )
}

export default function EmergencyTab() {
  return (
    <div style={{ padding: '24px 16px 8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: '26px', fontWeight: 400, color: C.text, lineHeight: 1.2 }}
        >
          Contacts.
        </h1>
        <p style={{ fontSize: '15px', color: C.muted, marginTop: '4px' }}>
          Call us first — we're always reachable.
        </p>
      </div>

      {/* Quick call buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <CallBtn number="(573) 561-6782" label="Call Jenna" variant="dark" />
        <CallBtn number="(540) 871-3501" label="Call Josh"  variant="dark" />
      </div>

      {/* 911 */}
      <div style={{
        backgroundColor: C.card, borderRadius: '10px',
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${C.sos}`,
        padding: '16px 16px 16px 14px',
        boxShadow: CARD_SHADOW,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <AlertTriangle size={18} strokeWidth={1.5} color={C.sos} />
          <span style={{ fontSize: '15px', fontWeight: 500, color: C.sos }}>Emergency Services</span>
        </div>
        <p style={{ fontSize: '14px', color: C.muted, marginBottom: '14px', lineHeight: '1.4' }}>
          In any life-threatening situation, call 911 first.
        </p>
        <CallBtn number="911" label="Call 911" variant="red" />
      </div>

      {/* Lincoln contacts */}
      <SectionLabel>Lincoln</SectionLabel>

      {/* Medical history note */}
      <div style={{
        backgroundColor: C.card, borderRadius: '10px',
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid #B8A8CC`,
        padding: '14px 14px 14px 13px',
        fontSize: '13px', color: C.text, lineHeight: '1.5',
        boxShadow: CARD_SHADOW,
      }}>
        <div style={{ fontWeight: 500, color: C.text, marginBottom: '4px' }}>Medical history</div>
        Lincoln was born with Tetralogy of Fallot and had open heart surgery at one week old. He is healthy and thriving — this is just important context in any medical situation.
      </div>

      <ContactCard
        Icon={Stethoscope}
        role="Cardiologist"
        name="Children's Healthcare of Atlanta"
        number="(404) 256-2593"
        note="Info also posted next to the old iPhone in the living room."
      />

      <ContactCard
        Icon={Baby}
        role="Pediatrician"
        name="Dr. Brian Wynn — Peachtree Park Pediatrics"
        number="(404) 351-1131"
      />

      {/* Spritz contacts */}
      <SectionLabel>Spritz</SectionLabel>

      <ContactCard
        Icon={PawPrint}
        role="Regular Vet"
        name="GoodVets West Midtown"
        number="(404) 779-6788"
        note="Reach out to us first and we'll help coordinate."
      />

      <div style={{
        backgroundColor: C.card, borderRadius: '10px',
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.sos}`,
        padding: '14px 14px 14px 13px',
        boxShadow: CARD_SHADOW,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <AlertTriangle size={16} strokeWidth={1.5} color={C.sos} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: C.sos }}>Emergency Vet</span>
        </div>
        <p style={{ fontSize: '13px', color: C.text, lineHeight: '1.5' }}>
          Go to the nearest open emergency vet and text us immediately.
        </p>
      </div>


    </div>
  )
}
