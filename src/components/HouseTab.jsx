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

function InfoCard({ emoji, title, items, accent }) {
  return (
    <Card style={{ border: `1.5px solid ${BORDER}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          backgroundColor: accent ? accent + '22' : '#F0EDE8',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
        }}>
          {emoji}
        </div>
        <span style={{ fontSize: '16px', fontWeight: 700, color: TEXT }}>{title}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(([text, sub], i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: '#7A746E', fontWeight: 700, flexShrink: 0, fontSize: '14px', marginTop: '2px' }}>·</span>
            <div>
              <span style={{ fontSize: '14px', color: TEXT, lineHeight: '1.45' }}>{text}</span>
              {sub && <div style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '2px' }}>{sub}</div>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function HouseTab() {
  return (
    <div style={{ padding: '20px 16px 8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: TEXT, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>
          Welcome home 🏠
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '15px', color: TEXT_MUTED }}>
          Everything you need to know about the house.
        </p>
      </div>

      <InfoCard
        emoji="👩"
        title="Elizabeth, the nanny"
        items={[
          ['She\'s here Monday through Thursday — Friday is a holiday.'],
          ['She handles food prep, bottle prep, and laundry.'],
          ['You decide how much childcare help you\'d like from her — totally up to you!'],
        ]}
      />

      <InfoCard
        emoji="🌡️"
        title="Temperature"
        items={[
          ['Feel free to adjust the thermostat however you\'d like.'],
          ['Please keep it at or below 72°F — Lincoln sleeps best in a cooler room.'],
        ]}
      />

      <InfoCard
        emoji="🌿"
        title="Herb garden"
        items={[
          ['Please water the herb garden outside as needed — they\'re thirsty little guys!'],
        ]}
      />

      <InfoCard
        emoji="🍳"
        title="Kitchen"
        items={[
          ['Help yourself to anything — the kitchen is yours!'],
          ['If you can, send us a grocery list before you arrive so we can stock up for you.'],
        ]}
      />

      <InfoCard
        emoji="🛏️"
        title="Your room"
        items={[
          ['The bed is made up with fresh linens.'],
          ['Towels and washcloths are ready for you.'],
        ]}
      />

      {/* Warm closing note */}
      <Card style={{ backgroundColor: '#F0F5F1', border: '1.5px solid #D2E4D9', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#5A7A62', lineHeight: '1.6', fontWeight: 500 }}>
          We're so grateful you're here. 💚<br />
          Don't hesitate to text us with anything — no question is too small.
        </p>
      </Card>
    </div>
  )
}
