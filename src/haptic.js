// iOS Safari does not support navigator.vibrate — this no-ops silently there.
// Durations: light = 40ms, medium = 60ms, strong = 80ms
export const haptic = (ms = 40) => navigator.vibrate?.(ms)
