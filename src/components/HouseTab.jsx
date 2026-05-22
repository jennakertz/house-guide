import { useState } from 'react'
import {
  Home, BedDouble, Wifi, Thermometer, Leaf, User,
  Utensils, UtensilsCrossed, Coffee, Baby, Moon,
  Heart, Smartphone, ShoppingBag, Star, Footprints, Plus,
} from 'lucide-react'

const C = {
  text:    '#1A1612',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  divider: '#EDE9E3',
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '10px', fontWeight: 500, color: C.muted,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

function InfoCard({ Icon, title, children }) {
  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Icon size={18} strokeWidth={1.5} color={C.muted} />
        <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>{title}</span>
      </div>
      <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  )
}

function FindItem({ Icon, label, location }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '13px 16px',
    }}>
      <Icon size={18} strokeWidth={1.5} color={C.muted} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: C.text }}>{label}</span>
      <span style={{
        fontSize: '13px', color: C.muted,
        textAlign: 'right', maxWidth: '45%', lineHeight: '1.3',
      }}>
        {location}
      </span>
    </div>
  )
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'flex', backgroundColor: C.bg,
      borderRadius: '8px', padding: '3px',
      border: `1px solid ${C.border}`,
    }}>
      {options.map(opt => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: '6px',
              border: 'none', cursor: 'pointer',
              backgroundColor: active ? C.card : 'transparent',
              color: active ? C.text : C.muted,
              fontSize: '14px', fontWeight: active ? 500 : 400,
              fontFamily: 'DM Sans, sans-serif',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.07)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export default function HouseTab() {
  const [segment, setSegment] = useState('for-you')

  return (
    <div style={{ padding: '24px 16px 8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: '26px', fontWeight: 400, color: C.text, lineHeight: 1.2 }}
        >
          The house.
        </h1>
        <p style={{ fontSize: '15px', color: C.muted, marginTop: '4px' }}>
          Everything you need.
        </p>
      </div>

      {/* Segmented control */}
      <SegmentedControl
        options={[{ id: 'for-you', label: 'For You' }, { id: 'find-it', label: 'Find It' }]}
        value={segment}
        onChange={setSegment}
      />

      {/* For You */}
      {segment === 'for-you' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InfoCard Icon={Home} title="Welcome!">
            Before you arrive, please send us a grocery list so we can stock the kitchen for you. Help yourself to anything in there.
          </InfoCard>

          <InfoCard Icon={BedDouble} title="Your room">
            Your bed is made up with fresh linens. Towels and washcloths are ready for you.
          </InfoCard>

          <InfoCard Icon={Wifi} title="Wifi">
            <span style={{ color: C.muted }}>Network:</span> <strong>[to be filled in]</strong>
            <br />
            <span style={{ color: C.muted }}>Password:</span> <strong>[to be filled in]</strong>
          </InfoCard>

          <InfoCard Icon={Thermometer} title="Temperature">
            Adjust the thermostat to whatever is comfortable. Please keep it at or below 72°F — Lincoln sleeps best in a cooler room.
          </InfoCard>

          <InfoCard Icon={Leaf} title="Herb garden">
            Please water the herb garden outside as needed — they're thirsty little guys.
          </InfoCard>

          <InfoCard Icon={User} title="Elizabeth (Nanny)">
            Elizabeth is here Monday–Thursday (Friday is a holiday). She handles Lincoln's food prep, bottles, and laundry. You can decide how much additional childcare help you'd like from her.
          </InfoCard>
        </div>
      )}

      {/* Find It */}
      {segment === 'find-it' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SectionLabel>Lincoln</SectionLabel>
          <FindItem Icon={ShoppingBag}      label="Lincoln's food"             location="Middle shelf, fridge" />
          <FindItem Icon={UtensilsCrossed}  label="Utensils, bowls, plates"    location="Far right cabinet, pantry" />
          <FindItem Icon={Coffee}           label="Bottle warmer"              location="Kitchen counter (instructions next to it)" />
          <FindItem Icon={Baby}             label="Diapers"                    location="[to be filled in]" />
          <FindItem Icon={Moon}             label="Sleep sacks"                location="[to be filled in]" />
          <FindItem Icon={Heart}            label="Pacifiers"                  location="[to be filled in]" />
          <FindItem Icon={Smartphone}       label="Nana app (baby monitor)"    location="Old iPhone downstairs · passcode 111111" />
          <FindItem Icon={Plus}             label="Baby medicine"              location="[to be filled in]" />

          <div style={{ marginTop: '8px' }}>
            <SectionLabel>Spritz</SectionLabel>
          </div>
          <FindItem Icon={ShoppingBag}  label="Dog food (kibble)"  location="[to be filled in]" />
          <FindItem Icon={Star}         label="Dog treats"         location="[to be filled in]" />
          <FindItem Icon={Footprints}   label="Dog leash"          location="[to be filled in]" />
        </div>
      )}

    </div>
  )
}
