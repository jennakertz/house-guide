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

function CallButton({ number, label }) {
  return (
    <a
      href={`tel:${number.replace(/\D/g, '')}`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        backgroundColor: '#EAF3ED', color: '#4A8A5A', border: '1.5px solid #C2DEC9',
        borderRadius: '100px', padding: '8px 18px', fontSize: '14px', fontWeight: 700,
        textDecoration: 'none', fontFamily: 'Nunito, sans-serif', flexShrink: 0,
      }}
    >
      <span>📞</span>
      {label || number}
    </a>
  )
}

function ContactCard({ icon, role, name, number, note }) {
  return (
    <Card style={{ border: `1.5px solid ${BORDER}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: TEXT_MUTED, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {role}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: TEXT }}>{name}</span>
          </div>
          <div style={{ fontSize: '14px', color: TEXT_MUTED, marginBottom: note ? '4px' : 0 }}>{number}</div>
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
        <div style={{ fontSize: '14px', color: TEXT_MUTED }}>{number}</div>
      </div>
      <a
        href={`tel:${number.replace(/\D/g, '')}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          backgroundColor: '#EAF3ED', color: '#4A8A5A', border: '1.5px solid #C2DEC9',
          borderRadius: '100px', padding: '8px 18px', fontSize: '14px', fontWeight: 700,
          textDecoration: 'none', fontFamily: 'Nunito, sans-serif',
        }}
      >
        <span>📞</span> Call
      </a>
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
        <p style={{ margin: '4px 0 0', fontSize: '15px', color: TEXT_MUTED }}>
          Call us first — we're always reachable.
        </p>
      </div>

      {/* Hero: Call us first */}
      <Card style={{ background: 'linear-gradient(135deg, #EAF3ED 0%, #F0F5F1 100%)', border: '1.5px solid #C2DEC9' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '22px' }}>💚</span>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: TEXT }}>Call us first</div>
            <div style={{ fontSize: '13px', color: TEXT_MUTED }}>Viceroy Riviera Maya · June 14–19</div>
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: '#C2DEC9', margin: '12px 0' }} />
        <ParentContact name="Jenna" number="(404) 555-0101" />
        <div style={{ height: '1px', backgroundColor: '#C2DEC9' }} />
        <ParentContact name="Josh" number="(404) 555-0102" />
      </Card>

      {/* Lincoln medical note */}
      <Card style={{ backgroundColor: ALERT_LIGHT, border: `1.5px solid ${ALERT}` }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '20px' }}>❤️</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: ALERT, marginBottom: '4px' }}>Lincoln's medical history</div>
            <p style={{ margin: 0, fontSize: '14px', color: '#5C2A2A', lineHeight: '1.5' }}>
              Lincoln was born with Tetralogy of Fallot and had open heart surgery at one week old.
              He is healthy and thriving — this is just important context if any medical situation arises.
            </p>
          </div>
        </div>
      </Card>

      <div style={{ fontSize: '12px', color: TEXT_MUTED, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Medical contacts
      </div>

      <ContactCard
        icon="❤️"
        role="Lincoln — Cardiology"
        name="Children's Healthcare of Atlanta"
        number="(404) 256-2593"
        note="Info also posted next to the old iPhone in the living room."
      />

      <ContactCard
        icon="👶"
        role="Lincoln — Pediatrician"
        name="Dr. Brian Wynn · Peachtree Park Pediatrics"
        number="(404) 237-0704"
      />

      <div style={{ fontSize: '12px', color: TEXT_MUTED, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Pet & general
      </div>

      <ContactCard
        icon="🐕"
        role="Spritz — Regular Vet"
        name="Good Vets"
        number="(404) 555-0199"
        note="Call us first and we'll help coordinate."
      />

      {/* 911 button */}
      <Card style={{ backgroundColor: ALERT_LIGHT, border: `2px solid ${ALERT}`, textAlign: 'center' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: ALERT }}>Fire · Police · Medical emergency</div>
          <div style={{ fontSize: '13px', color: '#8B3A3A', marginTop: '4px' }}>In any life-threatening situation, call 911 first.</div>
        </div>
        <a
          href="tel:911"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: ALERT, color: '#fff', border: 'none', borderRadius: '100px',
            padding: '14px 32px', fontSize: '18px', fontWeight: 800, textDecoration: 'none',
            fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 16px rgba(196,90,90,0.4)',
            letterSpacing: '0.02em',
          }}
        >
          📞 Call 911
        </a>
      </Card>
    </div>
  )
}
