import { ReservationRepositoryPort } from '../../ports/ReservationRepositoryPort'
import { ReservationInfo } from '../ReservationInfo'
import { UUIDService } from '../uuids/UUIDService'

/**
 * Reference implementation of a Reservation Repository
 */
export class InMemoryReservationRepository implements ReservationRepositoryPort {
  records = [] as ReservationInfo[]
  uuidService = new UUIDService()

  async addReservations(infos: ReservationInfo[]): Promise<unknown> {
    this.records.push(...infos)

    return null
  }
}
