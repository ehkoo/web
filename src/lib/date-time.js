export function formatDate(date, opts) {
  const d = new Date(date)

  return d.toLocaleDateString('vi-VN', opts)
}

export function timeAgo(d, formatDateOptions) {
  const date = new Date(d)
  const now = new Date()
  const days = Math.floor((date.valueOf() - now.valueOf()) / 84_600_000)
  const absDays = Math.abs(days)

  if (absDays > 30) return formatDate(d, formatDateOptions)

  const value = absDays < 60 ? days : Math.floor(days / 30)
  const unit = absDays < 60 ? 'day' : 'month'

  const formatter = new Intl.RelativeTimeFormat('vi', { numeric: 'auto', style: 'narrow', value: unit })
  return formatter.format(value, unit)
}
