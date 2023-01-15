import { ReservationInfo } from '../lib/ReservationInfo'

export interface ReservationRepositoryPort {
  addReservations(infos: ReservationInfo[]): Promise<unknown>
}