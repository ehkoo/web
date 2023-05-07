export function timeAgo(d) {
  const date = new Date(d)
  const now = new Date()
  const days = Math.floor((date.valueOf() - now.valueOf()) / 84_600_000)
  const value = Math.abs(days) < 60 ? days : Math.floor(days / 30)
  const unit = Math.abs(days) < 60 ? 'day' : 'month'

  const formatter = new Intl.RelativeTimeFormat('vi', { numeric: 'auto', style: 'narrow', value: unit })
  return formatter.format(value, unit)
}

export function formatDate(date, { dateStyle = 'long' } = {}) {
  const d = new Date(date)

  return new Intl.DateTimeFormat('vi-VN', { dateStyle }).format(d)
}
