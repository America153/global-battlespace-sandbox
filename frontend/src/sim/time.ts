import { step } from './world'

let interval: any = null

export function start() {
  if (interval) return
  interval = setInterval(step, 1000)
}

export function stop() {
  clearInterval(interval)
  interval = null
}
