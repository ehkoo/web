import { timeAgo } from './date-time'

export class XDateTime extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.render()
  }

  render() {
    const ts = this.getAttribute('ts')
    if (ts != null) {
      this.shadow.innerHTML = timeAgo(ts, { dateStyle: this.getAttribute('date-style') ?? 'short' })
    }
  }
}
