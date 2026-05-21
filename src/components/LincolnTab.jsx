import { useState, useEffect, useRef } from 'react'

const SAGE = '#7BAF8A'
const SAGE_LIGHT = '#EAF3ED'
const TEXT = '#3A3530'
const TEXT_MUTED = '#7A746E'
const BORDER = '#EBE8E3'
const CARD = '#FFFFFF'

const ALL_EVENTS = [
  {
    id: 'wake',
    time: '6:00 – 7:15 AM',
    startHour: 6,
    endHour: 7.25,
    title: 'Wake up & morning bottle',
    icon: '🌅',
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
    icon: '🥣',
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
    icon: '😴',
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
    icon: '🍽️',
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
    icon: '🌙',
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
    icon: '🍌',
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
    icon: '🍜',
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
    icon: '🌛',
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
    icon: '⭐',
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
      borderRadius: '20px',
      padding: '16px 18px',
      boxShadow: '0 2px 12px rgba(58,53,48,0.06)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function MealtimeRules({ expanded, onToggle }) {
  return (
    <Card style={{ border: `1.5px solid ${BORDER}` }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 0, fontFamily: 'Nunito, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🍽️</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: TEXT }}>Mealtime rules</span>
        </div>
        <span style={{ fontSize: '18px', color: TEXT_MUTED, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
      </button>
      {expanded && (
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            ['🪑', 'Always seated in high chair to eat'],
            ['🥶', 'Food on his middle fridge shelf only (or what Elizabeth makes)'],
            ['🍴', 'Utensils in the far right pantry cabinet'],
            ['🙅', 'If food is thrown → "looks like you\'re all done" → end meal, try again in 20 min'],
            ['💧', 'Water from straw cup throughout the day'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '15px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
              <span style={{ fontSize: '14px', color: TEXT, lineHeight: '1.4' }}>{text}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function TimelineEvent({ event, isActive, isCurrent, onToggle }) {
  return (
    <div
      id={`event-${event.id}`}
      style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '18px' }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
          backgroundColor: isCurrent ? SAGE : (isActive ? SAGE : BORDER),
          border: isCurrent ? `3px solid ${SAGE}` : `2px solid ${isCurrent || isActive ? SAGE : BORDER}`,
          boxShadow: isCurrent ? `0 0 0 3px ${SAGE_LIGHT}` : 'none',
          transition: 'all 0.3s',
        }} />
        <div style={{ width: '2px', flex: 1, minHeight: '24px', backgroundColor: BORDER, marginTop: '4px' }} />
      </div>

      {/* Card */}
      <div style={{ flex: 1, paddingBottom: '12px' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, fontFamily: 'Nunito, sans-serif', textAlign: 'left',
          }}
        >
          <Card style={{
            border: isCurrent ? `2px solid ${SAGE}` : `1.5px solid ${BORDER}`,
            backgroundColor: isCurrent ? SAGE_LIGHT : CARD,
            transition: 'all 0.3s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '12px', fontWeight: 600, color: isCurrent ? SAGE : TEXT_MUTED,
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  {event.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{event.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: TEXT }}>{event.title}</span>
                </div>
                <div style={{ fontSize: '13px', color: TEXT_MUTED, marginTop: '4px' }}>{event.summary}</div>
              </div>
              <span style={{
                fontSize: '18px', color: TEXT_MUTED, marginLeft: '8px', flexShrink: 0,
                transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s',
              }}>›</span>
            </div>

            {isActive && (
              <div style={{ marginTop: '14px', borderTop: `1px solid ${isCurrent ? SAGE : BORDER}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {event.details.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: SAGE, fontWeight: 700, flexShrink: 0, fontSize: '14px', marginTop: '1px' }}>·</span>
                    <span style={{ fontSize: '14px', color: TEXT, lineHeight: '1.5' }}>{d}</span>
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
            <p style={{ margin: '4px 0 0', fontSize: '15px', color: TEXT_MUTED, fontFamily: 'Nunito, sans-serif' }}>
              Here's Lincoln's day. 🌿
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
              backgroundColor: SAGE, color: '#fff', border: 'none', borderRadius: '100px',
              padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif', boxShadow: '0 2px 8px rgba(123,175,138,0.35)',
            }}
          >
            Jump to Now →
          </button>

          <button
            onClick={() => setOneNap(v => !v)}
            style={{
              backgroundColor: oneNap ? '#E8C9BE' : '#F0EDE8',
              border: `1.5px solid ${oneNap ? '#C4795A' : BORDER}`,
              color: oneNap ? '#C4795A' : TEXT_MUTED,
              borderRadius: '100px', padding: '7px 14px',
              fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '14px' }}>{oneNap ? '✓' : '○'}</span>
            One nap today
          </button>
        </div>
      </div>

      {oneNap && (
        <div style={{
          backgroundColor: '#FDF3EE', border: '1.5px solid #E8C9BE', borderRadius: '14px',
          padding: '12px 14px', fontSize: '13px', color: '#C4795A', fontWeight: 600,
          display: 'flex', gap: '8px', alignItems: 'flex-start',
        }}>
          <span>☝️</span>
          <span>One-nap day: the second nap and late afternoon snack have been removed from the schedule.</span>
        </div>
      )}

      {/* Mealtime rules */}
      <MealtimeRules expanded={rulesOpen} onToggle={() => setRulesOpen(v => !v)} />

      {/* Section label */}
      <div style={{ fontSize: '12px', color: TEXT_MUTED, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', paddingLeft: '26px' }}>
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
        {/* End dot */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '4px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: BORDER }} />
          </div>
          <p style={{ fontSize: '13px', color: TEXT_MUTED, margin: 0, paddingTop: '2px', fontStyle: 'italic' }}>Sweet dreams, Lincoln 🌙</p>
        </div>
      </div>
    </div>
  )
}
