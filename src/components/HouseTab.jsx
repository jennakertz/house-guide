import { useState } from 'react'
import { haptic } from '../haptic'
import {
  Home, BedDouble, Wifi, Thermometer, Leaf, User, PawPrint,
  UtensilsCrossed, Coffee, Smartphone, Plus,
  ShoppingBag, Star, Footprints, Package, Baby, ChevronDown,
} from 'lucide-react'

const CARD_SHADOW   = '0 1px 2px rgba(74,69,64,0.05), 0 2px 10px rgba(74,69,64,0.06)'
const ACTIVE_SHADOW = '0 2px 14px rgba(126,200,200,0.22), 0 1px 3px rgba(74,69,64,0.07)'

const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  divider: '#EDE9E3',
  blue:    '#7EC8C8',
  amber:   '#C9A84C',
  amberBg: '#FFFDF5',
}

const WEEK = [
  {
    id: 'mon', label: 'Monday', jsDay: 1,
    items: [
      'Yard crew arrives — no set time.',
      'Put trash bins out to the street tonight.',
      'Elizabeth is here.',
    ],
  },
  {
    id: 'tue', label: 'Tuesday', jsDay: 2,
    items: [
      'Trash pickup in the morning — bring bins in after the truck comes.',
      'Cleaners every other week.',
      'Elizabeth is here.',
    ],
  },
  { id: 'wed', label: 'Wednesday', jsDay: 3, items: ['Elizabeth is here.'] },
  { id: 'thu', label: 'Thursday',  jsDay: 4, items: ['Elizabeth is here.'] },
  { id: 'fri', label: 'Friday',    jsDay: 5, items: ["Elizabeth's day off."] },
  { id: 'sat', label: 'Saturday',  jsDay: 6, items: [] },
  { id: 'sun', label: 'Sunday',    jsDay: 0, items: [
    'Barkbus mobile grooming for Spritz — June 14th, 12:45–2:45 PM.',
    'Bring Spritz to the door on his leash. They\'ll take him, wash him, and return him.',
    'No payment needed — they charge us directly.',
    'Parking: they must park on the street, not in the gravel lot next to the house.',
  ]},
]

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

function InfoCard({ Icon, title, children }) {
  return (
    <div style={{
      backgroundColor: C.card, borderRadius: '10px',
      border: `1px solid ${C.border}`, padding: '16px',
      boxShadow: CARD_SHADOW,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Icon size={18} strokeWidth={1.5} color={C.blue} />
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
      boxShadow: CARD_SHADOW,
    }}>
      <div
        onClick={expandable ? () => { haptic(40); setOpen(v => !v) } : undefined}
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
            onClick={() => { haptic(40); onChange(opt.id) }}
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
  const today = new Date().getDay()

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
          Thank you so much for being here 🫶
        </p>
      </div>

      {/* Segmented control */}
      <div data-tour="tour-segment">
        <SegmentedControl
          options={[{ id: 'for-you', label: 'For You' }, { id: 'find-it', label: 'Find It' }, { id: 'schedule', label: 'Maintenance' }]}
          value={segment}
          onChange={setSegment}
        />
      </div>

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

          <div style={{
            backgroundColor: C.amberBg, borderRadius: '10px',
            border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`,
            padding: '16px 16px 16px 14px', boxShadow: CARD_SHADOW,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <PawPrint size={16} strokeWidth={1.5} color={C.amber} />
              <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>A note about the pups</span>
            </div>
            <p style={{ fontSize: '14px', color: C.text, lineHeight: '1.6' }}>
              Just a reminder of what we flagged before we left — we're at a stage where we're keeping Lincoln away from dogs (his movements are pretty unpredictable right now), so Sarah's dogs and Lincoln will need to stay separated the whole visit. And since Mylo tends to get anxious without Sarah around — which then gets Spritz going — the dogs really can't be left alone at the house.
            </p>
          </div>
        </div>
      )}

      {/* Schedule */}
      {segment === 'schedule' && (
        <div style={{ position: 'relative', marginTop: '-8px' }}>
          {/* Spine */}
          <div style={{
            position: 'absolute',
            left: '15px', top: '14px', bottom: '14px',
            width: '1px', backgroundColor: C.border, zIndex: 0,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {WEEK.map(day => {
              const isToday = today === day.jsDay
              const hasItems = day.items.length > 0
              return (
                <div key={day.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  {/* Dot */}
                  <div style={{
                    width: '32px', flexShrink: 0,
                    display: 'flex', justifyContent: 'center',
                    paddingTop: '17px', position: 'relative', zIndex: 1,
                  }}>
                    <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
                      {isToday && (
                        <div className="dot-ping" style={{
                          position: 'absolute', inset: 0, borderRadius: '50%',
                          backgroundColor: C.blue,
                        }} />
                      )}
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: (isToday || hasItems) ? C.blue : C.border,
                        boxShadow: isToday
                          ? `0 0 0 3px ${C.blue}33, 0 0 0 2.5px #F5F3EF`
                          : '0 0 0 2.5px #F5F3EF',
                        position: 'relative', zIndex: 1,
                      }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1, paddingBottom: '10px' }}>
                    <div style={{
                      backgroundColor: isToday ? '#F5FBFB' : C.card,
                      borderRadius: '10px',
                      border: `1px solid ${C.border}`,
                      borderLeft: isToday ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
                      padding: isToday ? '13px 14px 13px 13px' : '13px 14px',
                      boxShadow: isToday ? ACTIVE_SHADOW : CARD_SHADOW,
                      transition: 'background-color 0.2s, box-shadow 0.2s',
                    }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        marginBottom: hasItems ? '10px' : 0,
                      }}>
                        <span style={{
                          fontSize: '14px', fontWeight: 500,
                          color: isToday ? C.blue : C.text,
                        }}>
                          {day.label}
                        </span>
                        {isToday && (
                          <span style={{
                            fontSize: '11px', fontWeight: 500, color: C.blue,
                            backgroundColor: `${C.blue}18`,
                            padding: '2px 7px', borderRadius: '20px',
                            letterSpacing: '0.04em',
                          }}>
                            Today
                          </span>
                        )}
                      </div>

                      {hasItems ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {day.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                              <div style={{
                                width: '4px', height: '4px', borderRadius: '50%',
                                backgroundColor: C.muted, flexShrink: 0, marginTop: '8px',
                              }} />
                              <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '13px', color: C.muted, fontStyle: 'italic' }}>
                          Nothing scheduled.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* As needed node */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px', flexShrink: 0,
                display: 'flex', justifyContent: 'center',
                paddingTop: '17px', position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  border: `1.5px dashed ${C.muted}`,
                  backgroundColor: 'transparent',
                  boxShadow: '0 0 0 2.5px #F5F3EF',
                }} />
              </div>
              <div style={{ flex: 1, paddingBottom: '10px' }}>
                <div style={{
                  backgroundColor: C.card, borderRadius: '10px',
                  border: `1px solid ${C.border}`, padding: '13px 14px',
                  boxShadow: CARD_SHADOW,
                }}>
                  <div style={{
                    fontSize: '11px', fontWeight: 500, color: C.muted,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    marginBottom: '8px',
                  }}>
                    As needed
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      backgroundColor: C.muted, flexShrink: 0, marginTop: '8px',
                    }} />
                    <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>
                      Water the herb garden outside — they're thirsty little guys.
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
