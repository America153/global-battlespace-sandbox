export type Base = {
  id: number
  owner: string
  lat: number
  lon: number
}

export const world = {
  tick: 0,
  speed: 1,
  bases: [] as Base[],
  bordersCrossed: false
}

export function step() {
  world.tick += world.speed

  // very basic enemy expansion logic
  if (world.bases.length > 0 && world.tick % 300 === 0) {
    world.bordersCrossed = true
  }
}
