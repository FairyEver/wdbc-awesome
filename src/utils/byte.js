export default function byteTo (limit) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const getPowAndMult = (limit, p) => {
    if (limit >= 1024) {
      return getPowAndMult(limit / 1024, p + 1)
    }
    return { power: p, mult: limit }
  }
  const res = getPowAndMult(limit, 0)
  // wrap with Number to remove trailing 0
  const number = Number(res.mult.toFixed(1))
  return `${number}${sizes[res.power]}`
}
