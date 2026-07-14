import { useState, useEffect, useMemo } from 'react'
import { haptic } from '../haptic'
import {
  Sunrise, Moon, BedDouble, Utensils, Footprints,
  ShoppingBag, Clock, ChevronDown, X,
} from 'lucide-react'

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  text:    '#4A4540',
  muted:   '#8A8078',
  border:  '#E8E4DE',
  card:    '#FFFFFF',
  bg:      '#F5F3EF',
  blue:    '#7EC8C8',
  sage:    '#8DB898',
  lav:     '#B8A8CC',
  yellow:  '#E8CC88',
  dark:    '#4A4540',
  divider: '#EDE9E3',
}

const MEALTIME_RULES = [
  'Lincoln must always be seated in his high chair to eat — at the counter or the table. No walking around with food.',
  'Food comes from his shelf (middle shelf, fridge) or what Elizabeth prepared.',
  'Utensils and bowls: far right cabinet in the pantry.',
  'He drinks water from his straw cup throughout the day.',
  'If he throws food on the floor: calmly say "looks like you\'re all done." If he does it again, end the meal and try again in 20 minutes.',
  'He likes to feed Spritz — it\'s a habit we\'re working on.',
]

const CARD_SHADOW = '0 1px 2px rgba(74,69,64,0.05), 0 2px 10px rgba(74,69,64,0.06)'
const ACTIVE_SHADOW = '0 2px 14px rgba(126,200,200,0.22), 0 1px 3px rgba(74,69,64,0.07)'

// ─── Timeline events ─────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'wake',
    startHour: 6, endHour: 7.25,
    time: '6:00 – 7:15 AM',
    title: 'Wake up',
    Icon: Sunrise,
    preview: 'Leave him in the crib until 7:00–7:15 AM.',
    details: [
      "It's okay to leave Lincoln in his crib for a few minutes while you wake up. Get him out by 7:00–7:15 AM.",
      "He'll be hungry right away when you get him up — have breakfast ready to go.",
    ],
    character: 'lincoln',
    dotColor: C.blue,
  },
  {
    id: 'spritz-walk-am',
    startHour: 7, endHour: 8,
    time: '7:00 – 8:00 AM',
    title: 'Spritz: Morning walk',
    Icon: Footprints,
    preview: 'Take Spritz for his morning walk.',
    details: [
      "Usually just walk to the park entrance and back — or go longer around the lake if you're feeling it.",
      "Poop bags go in the trash cans right at the park entrance — there are two of them.",
      "If he's being stubborn about walking, say \"we're going to the park\" and that usually gets him moving.",
      "To lure him back home, promise him breakfast.",
      "If it's raining, he can use the backyard instead — try to get him to go in the mulch.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'breakfast',
    startHour: 7, endHour: 9,
    time: '~7:00 – 7:15 AM',
    title: 'Breakfast & playtime',
    Icon: Utensils,
    preview: 'Feed him right when he gets up — he wakes up hungry.',
    details: [
      "Feed him as soon as you get him out of the crib — he'll be hungry right away.",
      "Food is on the middle shelf of the fridge — that's Lincoln's shelf. Only feed him food from there, or food Elizabeth has prepared.",
      "His bowls, plates, and utensils are in the far right cabinet of the pantry.",
      "He drinks water from a straw cup throughout the day.",
      "After breakfast, free play until his morning snack around 9:00.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'spritz-breakfast',
    startHour: 8, endHour: 8.5,
    time: 'After morning walk',
    title: 'Spritz: Breakfast',
    Icon: ShoppingBag,
    preview: '1.5 scoops of kibble, then one treat.',
    details: [
      "1.5 scoops of kibble.",
      'After he eats, one treat — either a CET Chew (we call it a "treasure") OR a Veggie Dent (we call it "tartar control"). One treat per day, not both.',
      "No human food or table scraps — it upsets his belly.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'snack1',
    startHour: 9, endHour: 9.5,
    time: '~9:00 AM',
    title: 'Morning snack',
    Icon: Utensils,
    preview: 'Light snack, then playtime until lunch.',
    details: [
      "Something small from his shelf — keeps him going until lunch at 11.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'lunch-prenap',
    startHour: 11, endHour: 11.5,
    time: '~11:00 AM',
    title: 'Lunch',
    Icon: Utensils,
    preview: 'Lunch before his nap at 11:30.',
    details: [
      "Aim for lunch around 11:00 AM — nap starts at 11:30, so keep it light and relatively quick.",
      "Food from his fridge shelf.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'nap',
    startHour: 11.5, endHour: 14.5,
    time: '11:30 AM – ~2:00–2:30 PM',
    title: 'Nap',
    Icon: Moon,
    preview: 'Nap starts at 11:30. He usually sleeps 2.5–3 hours.',
    details: [
      "Try to get him down right at 11:30 AM.",
      "Nap routine: (1) Change diaper, (2) Put on sleep sack, (3) Read 1–2 books, (4) Place in crib with his stuffed animals and 2 pacifiers.",
      "Monitor him on the Nanit — the old iPhone is kept downstairs. Passcode: 111111.",
      "He usually sleeps 2.5–3 hours — that's totally normal.",
    ],
    character: 'lincoln',
    dotColor: C.lav,
  },
  {
    id: 'post-nap',
    startHour: 14.5, endHour: 17,
    time: '~2:00 – 5:00 PM',
    title: 'After nap — meal or snack',
    Icon: Utensils,
    preview: 'Depends on how long he slept.',
    details: [
      "If he woke up on the earlier side (~2:00 PM): offer a small meal around 2:30–3:00, then a snack around 4:30.",
      "If he slept the full stretch (~2:30 PM): a snack around 4:00–4:30 is enough before dinner.",
      "Follow his cues — if he's not hungry for a full meal, a snack is fine.",
      "Food from his fridge shelf.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'spritz-walk-pm',
    startHour: 17, endHour: 17.5,
    time: '~5:00 PM',
    title: 'Spritz: Evening walk',
    Icon: Footprints,
    preview: 'Evening walk around 5 PM.',
    details: [
      "Usually just walk to the park entrance and back — or go longer around the lake if you're feeling it.",
      "Poop bags go in the trash cans right at the park entrance — there are two of them.",
      "If he's being stubborn, say \"we're going to the park\" to get him moving.",
      "To lure him back home, promise him dinner.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'dinner',
    startHour: 17.5, endHour: 18,
    time: '~5:30 PM',
    title: 'Dinner',
    Icon: Utensils,
    preview: 'Dinner at 5:30 PM.',
    details: [
      "Aim for dinner at 5:30 PM — bedtime routine starts right at 6:00.",
      "Food from his fridge shelf.",
    ],
    character: 'lincoln',
    dotColor: C.sage,
    hasMealtimeRules: true,
  },
  {
    id: 'bedtime',
    startHour: 18, endHour: 19,
    time: '6:00 – 7:00 PM',
    title: 'Bedtime',
    Icon: BedDouble,
    preview: 'Bedtime routine starts at 6:00 PM.',
    details: [
      "Start the bedtime routine at 6:00 PM. Aim for him to be in the crib by 7:00 PM.",
      "Bedtime routine: (1) Change diaper, (2) Sleep sack, (3) Brush teeth — he hates this, but do it anyway, (4) Read books, (5) Crib with his stuffed animals and 2 pacifiers.",
      "For books: the second-to-last book is always the Goodbye Pacifier book. While you read it, get out the special bag and drop one pacifier in, close it, and wave bye bye together.",
      "The last book is always one of the Your Places books.",
      "Keep the Nanit on overnight.",
    ],
    character: 'lincoln',
    dotColor: C.dark,
  },
  {
    id: 'spritz-dinner',
    startHour: 18.1, endHour: 18.6,
    time: '~6:00 PM',
    title: 'Spritz: Dinner',
    Icon: ShoppingBag,
    preview: '1 scoop of kibble.',
    details: [
      "1 scoop of kibble.",
      "Spritz will beg constantly. He does not need any additional food.",
    ],
    character: 'spritz',
    dotColor: C.yellow,
  },
  {
    id: 'overnight',
    startHour: 19, endHour: 31,
    time: '7:00 PM – 7:00 AM',
    title: 'Overnight',
    Icon: Moon,
    preview: 'He almost always sleeps through.',
    details: [
      "Lincoln occasionally fusses briefly at night — about once every two weeks.",
      "Wait about a minute before going in; he almost always self-soothes.",
      "If he's having a full meltdown, go in and comfort him. This is very rare.",
    ],
    character: 'lincoln',
    dotColor: C.lav,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getTimeStr() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function getCurrentHour() {
  const n = new Date()
  return n.getHours() + n.getMinutes() / 60
}

function getCurrentEventId(events) {
  const h = getCurrentHour()
  const active = events.filter(e => {
    if (e.endHour > 24) {
      return h >= e.startHour || h < e.endHour - 24
    }
    return h >= e.startHour && h < e.endHour
  })
  if (active.length) {
    return (active.find(e => e.character === 'lincoln') ?? active[0]).id
  }
  return getNextEventId(events)
}

function getNextEventId(events) {
  const h = getCurrentHour()
  const upcoming = events
    .filter(e => e.startHour > h)
    .sort((a, b) => a.startHour - b.startHour)
  return upcoming[0]?.id ?? null
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ children, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      fontSize: '10px', fontWeight: 500, color: C.muted,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      ...style,
    }}>
      <div style={{ width: '14px', height: '1.5px', backgroundColor: C.blue, flexShrink: 0 }} />
      {children}
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

function MealtimeRulesModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(26,22,18,0.45)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        zIndex: 100,
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '430px',
          backgroundColor: C.card,
          borderRadius: '16px 16px 0 0',
          padding: '0 20px calc(32px + env(safe-area-inset-bottom))',
        }}
      >
        {/* drag handle */}
        <div style={{
          width: '36px', height: '4px', borderRadius: '2px',
          backgroundColor: C.border, margin: '12px auto 20px',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Utensils size={18} strokeWidth={1.5} color={C.muted} />
            <span style={{ fontSize: '16px', fontWeight: 500, color: C.text }}>Mealtime rules</span>
          </div>
          <button
            onClick={() => { haptic(40); onClose() }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', color: C.muted,
            }}
          >
            <X size={18} strokeWidth={1.5} color={C.muted} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MEALTIME_RULES.map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%',
                backgroundColor: C.sage, flexShrink: 0, marginTop: '9px',
              }} />
              <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.55' }}>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineEvent({ event, isActive, isCurrent, onToggle, onMealtimeRules }) {
  const { Icon } = event
  return (
    <div id={`event-${event.id}`} style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* Dot column */}
      <div style={{
        width: '32px', flexShrink: 0,
        display: 'flex', justifyContent: 'center',
        paddingTop: '17px', position: 'relative', zIndex: 1,
      }}>
        <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
          {isCurrent && (
            <div className="dot-ping" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              backgroundColor: event.dotColor,
            }} />
          )}
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: event.dotColor,
            boxShadow: isCurrent
              ? `0 0 0 3px ${event.dotColor}33, 0 0 0 2.5px #F5F3EF`
              : '0 0 0 2.5px #F5F3EF',
            position: 'relative', zIndex: 1,
          }} />
        </div>
      </div>
      {/* Card */}
      <div style={{ flex: 1, paddingBottom: '10px' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%', border: 'none', background: 'none',
            cursor: 'pointer', padding: 0, textAlign: 'left',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <div style={{
            backgroundColor: isCurrent ? '#F5FBFB' : C.card,
            borderRadius: '10px',
            border: `1px solid ${C.border}`,
            borderLeft: isCurrent ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
            padding: isCurrent ? '14px 14px 14px 13px' : '14px',
            boxShadow: isCurrent ? ACTIVE_SHADOW : CARD_SHADOW,
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: C.muted, letterSpacing: '0.01em' }}>
                {event.time}
              </span>
              {isCurrent && (
                <span style={{
                  fontSize: '11px', fontWeight: 500, color: C.blue,
                  backgroundColor: `${C.blue}18`,
                  padding: '2px 7px', borderRadius: '20px',
                  letterSpacing: '0.04em',
                }}>
                  Now
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                <Icon size={18} strokeWidth={1.5} color={isCurrent ? C.blue : C.muted} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '15px', fontWeight: 500, color: C.text }}>{event.title}</span>
              </div>
              <ChevronDown
                size={16} strokeWidth={1.5} color="#C4BDB5"
                style={{
                  transform: isActive ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px',
                }}
              />
            </div>
            <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px', lineHeight: '1.4' }}>
              {event.preview}
            </div>

            {event.hasMealtimeRules && (
              <button
                onClick={e => { e.stopPropagation(); haptic(40); onMealtimeRules() }}
                style={{
                  marginTop: '10px',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '12px', fontWeight: 500, color: C.muted,
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <Utensils size={12} strokeWidth={1.5} />
                Mealtime rules
              </button>
            )}

            {isActive && (
              <div style={{ marginTop: '14px', borderTop: `1px solid ${C.border}`, paddingTop: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {event.details.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '4px', height: '4px', borderRadius: '50%',
                        backgroundColor: C.sage, flexShrink: 0, marginTop: '9px',
                      }} />
                      <span style={{ fontSize: '14px', color: C.text, lineHeight: '1.5' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScheduleTab() {
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(() => {
    const id = getCurrentEventId(EVENTS)
    return id === 'overnight' ? 'overnight' : null
  })
  const [mealtimeOpen, setMealtimeOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [timeStr, setTimeStr] = useState(getTimeStr)

  const filteredEvents = useMemo(
    () => filter === 'all' ? EVENTS : EVENTS.filter(e => e.character === filter),
    [filter]
  )

  useEffect(() => { setExpandedId(null) }, [filter])

  useEffect(() => {
    setCurrentId(getCurrentEventId(filteredEvents))
    setTimeStr(getTimeStr())
    const id = setInterval(() => {
      setCurrentId(getCurrentEventId(filteredEvents))
      setTimeStr(getTimeStr())
    }, 30000)
    return () => clearInterval(id)
  }, [filteredEvents])

  function jumpToNow() {
    const id = getCurrentEventId(filteredEvents)
    if (!id) return
    haptic(50)
    setExpandedId(id)
    setTimeout(() => {
      const el = document.getElementById(`event-${id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  function toggleEvent(id) {
    haptic(40)
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div style={{ padding: '24px 16px 8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div>
        <h1
          className="serif"
          style={{ fontSize: '26px', fontWeight: 400, color: C.text, lineHeight: 1.25 }}
        >
          {getGreeting()} — here's the day.
        </h1>
        <p style={{ fontSize: '15px', color: C.muted, marginTop: '4px' }}>
          {timeStr}
        </p>
      </div>

      {/* Controls row */}
      <div data-tour="tour-schedule-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={jumpToNow}
          style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            backgroundColor: '#4A4540', color: '#FFFFFF',
            border: 'none', borderRadius: '6px',
            padding: '9px 16px', fontSize: '13px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            flexShrink: 0,
          }}
        >
          <Clock size={15} strokeWidth={2} color="#FFFFFF" />
          Jump to Now
        </button>
      </div>

      {/* Segmented filter */}
      <div data-tour="tour-schedule-filter">
        <SegmentedControl
          options={[
            { id: 'all',     label: 'Everyone' },
            { id: 'lincoln', label: 'Lincoln'  },
            { id: 'spritz',  label: 'Spritz'   },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {/* Timeline section label */}
      <SectionLabel style={{ paddingLeft: '32px' }}>Today's schedule</SectionLabel>

      {/* Timeline */}
      <div style={{ position: 'relative', marginTop: '-8px' }}>
        {/* Spine line */}
        <div style={{
          position: 'absolute',
          left: '15px', top: '14px', bottom: '14px',
          width: '1px', backgroundColor: C.border, zIndex: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredEvents.map(event => (
            <TimelineEvent
              key={event.id}
              event={event}
              isActive={expandedId === event.id}
              isCurrent={currentId === event.id}
              onToggle={() => toggleEvent(event.id)}
              onMealtimeRules={() => setMealtimeOpen(true)}
            />
          ))}
          {/* End marker */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '32px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: C.blue, boxShadow: '0 0 0 2.5px #F5F3EF',
                opacity: 0.45,
              }} />
            </div>
            <span style={{ fontSize: '13px', color: C.muted, fontStyle: 'italic' }}>
              {filter === 'spritz' ? 'Good night, Spritz.' : 'Sweet dreams, Lincoln. ✨'}
            </span>
          </div>
        </div>
      </div>

      {/* Mealtime rules modal */}
      {mealtimeOpen && <MealtimeRulesModal onClose={() => setMealtimeOpen(false)} />}

    </div>
  )
}
