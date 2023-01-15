import { Temporal } from 'proposal-temporal'

export type ReservationInfo = {
  id: string
  // @todo customer id
  startAt: Temporal.PlainDateTime,
  endAt: Temporal.PlainDateTime,
  roomId: string
}
