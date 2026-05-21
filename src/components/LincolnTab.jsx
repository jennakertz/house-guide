import { useState, useEffect, useRef } from 'react'
import { Sunrise, Utensils, UtensilsCrossed, Moon, BedDouble, ChevronDown } from 'lucide-react'

const TERRA      = '#B85C38'
const TEXT       = '#2C1A12'
const TEXT_MUTED = '#7A5C4E'
const BORDER     = '#D9CABF'
const CARD       = '#FAF6F1'

const ALL_EVENTS = [
  {
    id: 'wake',
    time: '6:00 – 7:15 AM',
    startHour: 6,
    endHour: 7.25,
    title: 'Wake up & morning bottle',
    Icon: Sunrise,
    summary: 'Let him wake naturally, then bottle time.',
    details: [
      'Leave him in the crib until 7:00–7:15 AM — no need to rush in.',
      'Give his morning bottle: 6 oz, warmed.',
      'He may be transitioning to a sippy cup — check the label on the bottle/cup.',
    ],
  },
  {
    id: 'breakfast',
    time: '7:15 – 9:00 AM',
    startHour: 7.25,
    endHour: 9,
    title: 'Breakfast & playtime',
    Icon: Utensils,
    summary: 'Food from his shelf in the fridge.',
    details: [
      'His food is on the middle shelf of the fridge — that\'s Lincoln\'s shelf.',
      'Always sit him in the high chair to eat. He must be seated at all times.',
      'If he throws food, say "looks like you\'re all done," end the meal, and try again in 20 minutes.',
      'He drinks water from his straw cup throughout the day.',
    ],
  },
  {
    id: 'nap1',
    time: '~10:00 – 11:30 AM',
    startHour: 10,
    endHour: 11.5,
    title: 'First nap',
    Icon: Moon,
    summary: 'About 3.5 hrs after wake-up.',
    details: [
      'Nap starts roughly 3.5 hours after he woke up.',
      'Nap routine: change diaper → put on sleep sack → read 1–2 books → place in crib with his stuffed animals and at least 3 pacifiers.',
      'Turn on the Nana baby monitor app — the old iPhone is downstairs (code: 111111).',
    ],
    napOnly: false,
  },
  {
    id: 'lunch',
    time: '~11:30 AM – 12:30 PM',
    startHour: 11.5,
    endHour: 12.5,
    title: 'Wake from nap + lunch',
    Icon: Utensils,
    summary: 'Nap is usually about 1.5 hours.',
    details: [
      'He usually sleeps about 1.5 hours, so expect him up around 11:30 AM.',
      'Lunch and snack from his fridge shelf.',
      'Elizabeth (the nanny) preps his food Mon–Thu — it\'ll be labeled and ready.',
    ],
    napOnly: false,
  },
  {
    id: 'nap2',
    time: '3:00 – 3:30 PM',
    startHour: 15,
    endHour: 15.5,
    title: 'Second nap',
    Icon: Moon,
    summary: 'Same routine as the first nap.',
    details: [
      'Same routine: diaper → sleep sack → 1–2 books → crib with animals + 3 pacifiers.',
      'Wake him by 5:15 PM at the very latest, even if he\'s still sleeping soundly.',
    ],
    napOnly: true,
  },
  {
    id: 'snack',
    time: '4:30 – 5:15 PM',
    startHour: 16.5,
    endHour: 17.25,
    title: 'Wake from nap + snack',
    Icon: Utensils,
    summary: 'Do not let him sleep past 5:15 PM.',
    details: [
      'If he\'s still asleep at 5:15 PM, gently wake him — late naps push bedtime too late.',
      'Snack from his fridge shelf.',
    ],
    napOnly: true,
  },
  {
    id: 'dinner',
    time: '5:30 – 6:30 PM',
    startHour: 17.5,
    endHour: 18.5,
    title: 'Dinner',
    Icon: UtensilsCrossed,
    summary: 'Same mealtime rules apply.',
    details: [
      'High chair, always seated.',
      'Dinner plus a snack if he asks for one.',
      'Same food-throwing rule — end the meal and try again in 20 min.',
    ],
  },
  {
    id: 'bedtime',
    time: '6:00 – 7:00 PM',
    startHour: 18,
    endHour: 19,
    title: 'Bedtime',
    Icon: BedDouble,
    summary: 'Bottle, books, crib.',
    details: [
      'Offer bottle or sippy cup, warmed.',
      'Bedtime routine: diaper → sleep sack → 1–2 books → crib with animals + 3 pacifiers.',
      'Timing tip: if he woke from nap 2 at 3:30, bedtime is ~6:00. If he woke at 5:00, push to ~6:45.',
      'Keep the Nana monitor app on overnight.',
    ],
  },
  {
    id: 'overnight',
    time: 'Overnight',
    startHour: 21,
    endHour: 24,
    title: 'Overnight',
    Icon: Moon,
    summary: 'He almost always sleeps through.',
    details: [
      'He might fuss briefly — this happens maybe once every two weeks. Wait 1 minute; he almost always settles himself.',
      'If it\'s a full meltdown (rare!), go in and comfort him.',
    ],
  },
]

const ONE_NAP_EVENTS = ALL_EVENTS.filter(e => e.napOnly !== true)

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning!'
  if (h < 17) return 'Good afternoon!'
  return 'Good evening!'
}

function getCurrentHour() {
  const now = new Date()
  return now.getHours() + now.getMinutes() / 60
}

function getCurrentEventId(events) {
  const h = getCurrentHour()
  const current = events.find(e => h >= e.startHour && h < e.endHour)
  return current?.id ?? null
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: CARD,
      borderRadius: '8px',
      padding: '14px 16px',
      border: `1px solid ${BORDER}`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function MealtimeRules({ expanded, onToggle }) {
  return (
    <Card>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 0, fontFamily: 'Nunito, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UtensilsCrossed size={16} color={TEXT_MUTED} strokeWidth={2} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: TEXT }}>Mealtime rules</span>
        </div>
        <ChevronDown
          size={16}
          color={TEXT_MUTED}
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
        />
      </button>
      {expanded && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: `1px solid ${BORDER}`, paddingTop: '12px' }}>
          {[
            ['🪑', 'Always seated in high chair to eat'],
            ['🥶', 'Food on his middle fridge shelf only (or what Elizabeth makes)'],
            ['🍴', 'Utensils in the far right pantry cabinet'],
            ['🙅', 'If food is thrown → "looks like you\'re all done" → end meal, try again in 20 min'],
            ['💧', 'Water from straw cup throughout the day'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
              <span style={{ fontSize: '13px', color: TEXT, lineHeight: '1.4' }}>{text}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function TimelineEvent({ event, isActive, isCurrent, onToggle }) {
  const { Icon } = event

  return (
    <div
      id={`event-${event.id}`}
      style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '16px' }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
          backgroundColor: isCurrent ? TERRA : BORDER,
          transition: 'background-color 0.3s',
        }} />
        <div style={{ width: '1px', flex: 1, minHeight: '24px', backgroundColor: BORDER, marginTop: '4px' }} />
      </div>

      {/* Card */}
      <div style={{ flex: 1, paddingBottom: '10px' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, fontFamily: 'Nunito, sans-serif', textAlign: 'left',
          }}
        >
          <Card style={{
            borderLeft: isCurrent ? `3px solid ${TERRA}` : `1px solid ${BORDER}`,
            paddingLeft: isCurrent ? '13px' : '16px',
            transition: 'border-left 0.3s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '12px', fontWeight: 600, color: TEXT_MUTED,
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  {event.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={16} color={isCurrent ? TERRA : TEXT_MUTED} strokeWidth={2} />
                  <span style={{ fontSize: '16px', fontWeight: 600, color: TEXT }}>{event.title}</span>
                </div>
                <div style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '4px', lineHeight: '1.4' }}>{event.summary}</div>
              </div>
              <ChevronDown
                size={16}
                color={TEXT_MUTED}
                style={{
                  marginLeft: '8px', flexShrink: 0, marginTop: '2px',
                  transform: isActive ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </div>

            {isActive && (
              <div style={{ marginTop: '12px', borderTop: `1px solid ${BORDER}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {event.details.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: TERRA, fontWeight: 700, flexShrink: 0, fontSize: '14px', marginTop: '1px', lineHeight: 1.4 }}>–</span>
                    <span style={{ fontSize: '13px', color: TEXT, lineHeight: '1.5' }}>{d}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </button>
      </div>
    </div>
  )
}

export default function LincolnTab() {
  const [oneNap, setOneNap] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const containerRef = useRef(null)

  const events = oneNap ? ONE_NAP_EVENTS : ALL_EVENTS

  useEffect(() => {
    setCurrentId(getCurrentEventId(events))
    const interval = setInterval(() => setCurrentId(getCurrentEventId(events)), 60000)
    return () => clearInterval(interval)
  }, [events])

  function jumpToNow() {
    if (!currentId) return
    const el = document.getElementById(`event-${currentId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setExpandedId(currentId)
  }

  function toggleEvent(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <div ref={containerRef} style={{ padding: '20px 16px 8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: TEXT, fontFamily: 'Nunito, sans-serif', lineHeight: 1.2 }}>
              {getGreeting()}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: TEXT_MUTED, fontFamily: 'Nunito, sans-serif' }}>
              Here's Lincoln's day.
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '13px', color: TEXT_MUTED, fontWeight: 500 }}>{timeStr}</div>
          </div>
        </div>

        {/* Jump to now + one nap toggle */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', alignItems: 'center' }}>
          <button
            onClick={jumpToNow}
            style={{
              backgroundColor: TERRA, color: CARD, border: 'none', borderRadius: '6px',
              padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif', letterSpacing: '0.01em',
            }}
          >
            Jump to Now →
          </button>

          {/* One nap toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              onClick={() => setOneNap(v => !v)}
              style={{
                fontSize: '13px', fontWeight: 600,
                color: oneNap ? TEXT : TEXT_MUTED,
                fontFamily: 'Nunito, sans-serif',
                userSelect: 'none', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              One nap today
            </span>
            <button
              onClick={() => setOneNap(v => !v)}
              role="switch"
              aria-checked={oneNap}
              style={{
                width: '44px', height: '26px', borderRadius: '100px',
                backgroundColor: oneNap ? TERRA : BORDER,
                border: 'none', cursor: 'pointer', padding: 0,
                position: 'relative', flexShrink: 0,
                transition: 'background-color 0.25s ease',
                outline: 'none',
              }}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute', top: '3px',
                left: oneNap ? '21px' : '3px',
                transition: 'left 0.25s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
          </div>
        </div>
      </div>

      {oneNap && (
        <div style={{
          backgroundColor: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${TERRA}`,
          borderRadius: '8px', padding: '12px 14px 12px 13px',
          fontSize: '13px', color: TEXT_MUTED, fontWeight: 600,
          display: 'flex', gap: '8px', alignItems: 'flex-start',
        }}>
          <span style={{ color: TERRA, flexShrink: 0 }}>—</span>
          <span>One-nap day: the second nap and late afternoon snack have been removed from the schedule.</span>
        </div>
      )}

      {/* Mealtime rules */}
      <MealtimeRules expanded={rulesOpen} onToggle={() => setRulesOpen(v => !v)} />

      {/* Section label */}
      <div style={{
        fontSize: '11px', color: TEXT_MUTED, fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        paddingLeft: '20px',
      }}>
        Today's schedule
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {events.map(event => (
          <TimelineEvent
            key={event.id}
            event={event}
            isActive={expandedId === event.id}
            isCurrent={currentId === event.id}
            onToggle={() => toggleEvent(event.id)}
          />
        ))}
        {/* End marker */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: BORDER }} />
          </div>
          <p style={{ fontSize: '12px', color: TEXT_MUTED, margin: 0, paddingTop: '1px', fontStyle: 'italic' }}>Sweet dreams, Lincoln.</p>
        </div>
      </div>
    </div>
  )
}
