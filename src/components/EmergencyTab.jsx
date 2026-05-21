import { Phone, Heart, Baby, PawPrint, AlertTriangle } from 'lucide-react'

const TERRA       = '#B85C38'
const ALERT       = '#C0392B'
const ALERT_LIGHT = '#FBF0EE'
const ALERT_TEXT  = '#8B2512'
const TEXT        = '#2C1A12'
const TEXT_MUTED  = '#7A5C4E'
const BORDER      = '#D9CABF'
const CARD        = '#FAF6F1'

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

function CallButton({ number, label }) {
  return (
    <a
      href={`tel:${number.replace(/\D/g, '')}`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        backgroundColor: TERRA, color: CARD,
        border: 'none', borderRadius: '6px',
        padding: '7px 14px', fontSize: '13px', fontWeight: 700,
        textDecoration: 'none', fontFamily: 'Nunito, sans-serif', flexShrink: 0,
      }}
    >
      <Phone size={13} strokeWidth={2.5} />
      {label || 'Call'}
    </a>
  )
}

function ContactCard({ Icon, role, name, number, note }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, color: TEXT_MUTED,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px',
          }}>
            {role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Icon size={15} color={TEXT_MUTED} strokeWidth={2} />
            <span style={{ fontSize: '15px', fontWeight: 700, color: TEXT }}>{name}</span>
          </div>
          <div style={{ fontSize: '13px', color: TEXT_MUTED, marginBottom: note ? '4px' : 0 }}>{number}</div>
          {note && <div style={{ fontSize: '12px', color: TEXT_MUTED, fontStyle: 'italic', lineHeight: '1.4' }}>{note}</div>}
        </div>
        <CallButton number={number} />
      </div>
    </Card>
  )
}

function ParentContact({ name, number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: TEXT }}>{name}</div>
        <div style={{ fontSize: '13px', color: TEXT_MUTED }}>{number}</div>
      </div>
      <CallButton number={number} label="Call" />
    </div>
  )
}

export default function EmergencyTab() {
  return (
    <div style={{ padding: '20px 16px 8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: TEXT, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>
          Contacts & emergencies
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: TEXT_MUTED }}>
          Call us first — we're always reachable.
        </p>
      </div>

      {/* Call us first */}
      <Card style={{ borderLeft: `3px solid ${TERRA}`, paddingLeft: '13px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
          <Phone size={16} color={TERRA} strokeWidth={2} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: TEXT }}>Call us first</div>
            <div style={{ fontSize: '13px', color: TEXT_MUTED }}>Viceroy Riviera Maya · June 14–19</div>
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: BORDER, margin: '12px 0' }} />
        <ParentContact name="Jenna" number="(404) 555-0101" />
        <div style={{ height: '1px', backgroundColor: BORDER }} />
        <ParentContact name="Josh" number="(404) 555-0102" />
      </Card>

      {/* Lincoln medical note */}
      <Card style={{ borderLeft: `3px solid ${TERRA}`, paddingLeft: '13px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Heart size={15} color={TERRA} strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: TERRA, marginBottom: '4px' }}>Lincoln's medical history</div>
            <p style={{ margin: 0, fontSize: '13px', color: TEXT, lineHeight: '1.5' }}>
              Lincoln was born with Tetralogy of Fallot and had open heart surgery at one week old.
              He is healthy and thriving — this is just important context if any medical situation arises.
            </p>
          </div>
        </div>
      </Card>

      <SectionLabel>Medical contacts</SectionLabel>

      <ContactCard
        Icon={Heart}
        role="Lincoln — Cardiology"
        name="Children's Healthcare of Atlanta"
        number="(404) 256-2593"
        note="Info also posted next to the old iPhone in the living room."
      />

      <ContactCard
        Icon={Baby}
        role="Lincoln — Pediatrician"
        name="Dr. Brian Wynn · Peachtree Park Pediatrics"
        number="(404) 237-0704"
      />

      <SectionLabel>Pet & general</SectionLabel>

      <ContactCard
        Icon={PawPrint}
        role="Spritz — Regular Vet"
        name="Good Vets"
        number="(404) 555-0199"
        note="Call us first and we'll help coordinate."
      />

      {/* 911 */}
      <Card style={{
        backgroundColor: ALERT_LIGHT,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${ALERT}`,
        paddingLeft: '13px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <AlertTriangle size={16} color={ALERT} strokeWidth={2} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: ALERT }}>Fire · Police · Medical emergency</div>
        </div>
        <div style={{ fontSize: '13px', color: ALERT_TEXT, marginBottom: '14px' }}>
          In any life-threatening situation, call 911 first.
        </div>
        <a
          href="tel:911"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: ALERT, color: '#FFFFFF',
            border: 'none', borderRadius: '6px',
            padding: '12px 40px', fontSize: '17px', fontWeight: 800,
            textDecoration: 'none', fontFamily: 'Nunito, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          <Phone size={18} strokeWidth={2.5} /> Call 911
        </a>
      </Card>
    </div>
  )
}
