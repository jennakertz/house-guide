import { User, Thermometer, Leaf, UtensilsCrossed, BedDouble } from 'lucide-react'

const TERRA      = '#B85C38'
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

function InfoCard({ Icon, title, items }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <Icon size={15} color={TEXT_MUTED} strokeWidth={2} />
        <span style={{ fontSize: '15px', fontWeight: 700, color: TEXT }}>{title}</span>
      </div>
      <div style={{
        borderTop: `1px solid ${BORDER}`, paddingTop: '12px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        {items.map(([text, sub], i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: TERRA, fontWeight: 700, flexShrink: 0, fontSize: '14px', marginTop: '1px' }}>–</span>
            <div>
              <span style={{ fontSize: '13px', color: TEXT, lineHeight: '1.45' }}>{text}</span>
              {sub && <div style={{ fontSize: '12px', color: TEXT_MUTED, marginTop: '2px' }}>{sub}</div>}
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
          Welcome home.
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: TEXT_MUTED }}>
          Everything you need to know about the house.
        </p>
      </div>

      <InfoCard
        Icon={User}
        title="Elizabeth, the nanny"
        items={[
          ['She\'s here Monday through Thursday — Friday is a holiday.'],
          ['She handles food prep, bottle prep, and laundry.'],
          ['You decide how much childcare help you\'d like from her — totally up to you!'],
        ]}
      />

      <InfoCard
        Icon={Thermometer}
        title="Temperature"
        items={[
          ['Feel free to adjust the thermostat however you\'d like.'],
          ['Please keep it at or below 72°F — Lincoln sleeps best in a cooler room.'],
        ]}
      />

      <InfoCard
        Icon={Leaf}
        title="Herb garden"
        items={[
          ['Please water the herb garden outside as needed — they\'re thirsty little guys!'],
        ]}
      />

      <InfoCard
        Icon={UtensilsCrossed}
        title="Kitchen"
        items={[
          ['Help yourself to anything — the kitchen is yours!'],
          ['If you can, send us a grocery list before you arrive so we can stock up for you.'],
        ]}
      />

      <InfoCard
        Icon={BedDouble}
        title="Your room"
        items={[
          ['The bed is made up with fresh linens.'],
          ['Towels and washcloths are ready for you.'],
        ]}
      />

      {/* Closing note */}
      <Card style={{ borderLeft: `3px solid ${TERRA}`, paddingLeft: '13px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: TEXT_MUTED, lineHeight: '1.6', fontWeight: 500 }}>
          We're so grateful you're here.<br />
          Don't hesitate to text us — no question is too small.
        </p>
      </Card>
    </div>
  )
}
