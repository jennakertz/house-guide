import { useState } from 'react'
import {
  Home, BedDouble, Wifi, Thermometer, Leaf, User, PawPrint,
  UtensilsCrossed, Coffee, Smartphone, Plus,
  ShoppingBag, Star, Footprints, Package, Baby, ChevronDown,
} from 'lucide-react'

const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  divider: '#EDE9E3',
  amber:   '#C9A84C',
  amberBg: '#FFFDF5',
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

// steps prop makes the item expandable with numbered instructions
function FindItem({ Icon, label, location, steps }) {
  const [open, setOpen] = useState(false)
  const expandable = !!steps

  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, overflow: 'hidden',
    }}>
      <div
        onClick={expandable ? () => setOpen(v => !v) : undefined}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '13px 16px',
          cursor: expandable ? 'pointer' : 'default',
        }}
      >
        <Icon size={18} strokeWidth={1.5} color={C.muted} style={{ flexShrink: 0 }} />

        {expandable ? (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: C.text }}>{label}</div>
            <div style={{ fontSize: '13px', color: C.muted, marginTop: '1px' }}>{location}</div>
          </div>
        ) : (
          <span style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: C.text }}>{label}</span>
        )}

        {expandable ? (
          <ChevronDown
            size={15} strokeWidth={1.5} color={C.muted}
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
          />
        ) : (
          <span style={{ fontSize: '13px', color: C.muted, textAlign: 'right', maxWidth: '45%', lineHeight: '1.3' }}>
            {location}
          </span>
        )}
      </div>

      {expandable && open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 16px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: C.bg, border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 600, color: C.muted, marginTop: '1px',
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
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
            <span style={{ color: C.muted }}>Network:</span> <strong>window_corgi</strong>
            <br />
            <span style={{ color: C.muted }}>Password:</span> <strong>puppy123</strong>
          </InfoCard>

          <InfoCard Icon={Thermometer} title="Temperature">
            Adjust the thermostat to whatever is comfortable. Please keep it at or below 72°F — Lincoln sleeps best in a cooler room.
          </InfoCard>

          <InfoCard Icon={Leaf} title="Herb garden">
            Please water the herb garden outside as needed — they're thirsty little guys.
          </InfoCard>

          <InfoCard Icon={User} title="Elizabeth (Nanny)">
            Elizabeth is here Monday–Thursday (Friday is a holiday). At a minimum, she will handle Lincoln's food prep, bottles, and laundry. You can decide how much additional childcare help you'd like from her.
          </InfoCard>

          <div style={{
            backgroundColor: C.amberBg, borderRadius: '10px',
            border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`,
            padding: '16px 16px 16px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <PawPrint size={16} strokeWidth={1.5} color={C.amber} />
              <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>A note about the pups</span>
            </div>
            <p style={{ fontSize: '14px', color: C.text, lineHeight: '1.6' }}>
              Just a reminder of what we flagged before we left — so glad Sarah didn't have to board them! We're at a stage where we're keeping Lincoln away from dogs (his movements are pretty unpredictable right now), so Sarah's dogs and Lincoln will need to stay separated the whole visit. And since Mylo tends to get anxious without Sarah around — which then gets Spritz going — the dogs really can't be left alone at the house. Sarah, just plan to have eyes on them the whole time. Thanks so much!
            </p>
          </div>
        </div>
      )}

      {/* Find It */}
      {segment === 'find-it' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SectionLabel>Lincoln</SectionLabel>
          <FindItem Icon={ShoppingBag}     label="Lincoln's food"          location="Middle shelf, fridge" />
          <FindItem Icon={UtensilsCrossed} label="Baby feeding supplies"   location="Far right cabinet, pantry" />
          <FindItem
            Icon={Coffee}
            label="Bottle warmer"
            location="Kitchen counter"
            steps={[
              "Press the first button to turn it on.",
              "Press the third button once for each ounce in the bottle (e.g., 6 times for a 6 oz bottle).",
              'Press "Steady Warm."',
            ]}
          />
          <FindItem Icon={Smartphone} label="Baby monitor (Nanit)"  location="Old iPhone downstairs · passcode 111111" />
          <FindItem Icon={Plus}       label="Baby medicine"         location="Under the sink, baby's room" />
          <FindItem Icon={Package}    label="Diaper bag"            location="Right cabinet, mudroom" />
          <FindItem Icon={Baby}       label="Stroller"              location="Hallway closet" />

          <div style={{ marginTop: '8px' }}>
            <SectionLabel>Spritz</SectionLabel>
          </div>
          <FindItem Icon={ShoppingBag} label="Dog food (kibble)"            location="Pantry" />
          <FindItem Icon={Star}        label="Dog treats & supplies"        location="Left cabinet, mudroom" />
          <FindItem Icon={Footprints}  label="Spritz's leash"              location="Hallway closet" />
        </div>
      )}

    </div>
  )
}
