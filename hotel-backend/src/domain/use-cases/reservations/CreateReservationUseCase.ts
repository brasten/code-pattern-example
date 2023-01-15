import { Temporal } from 'proposal-temporal'
import { must } from '../../lib/utils'
import { UUIDService } from '../../lib/uuids/UUIDService'
import { ReservationRepositoryPort } from '../../ports/ReservationRepositoryPort'
import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'

export function buildUseCase(deps: {
  roomRepository: RoomRepositoryPort
  reservationRepository: ReservationRepositoryPort
}): CreateReservationUseCase {
  const uuidService = new UUIDService()
  const roomRepo    = deps.roomRepository
  const reservationRepo = deps.reservationRepository

  /**
   * CreateReservationUseCase handles the creation of a reservation for a room.
   */
  return async function useCase({ roomNumber, startAt, endAt }: {
    roomNumber: number
    startAt: Temporal.PlainDateTime,
    endAt: Temporal.PlainDateTime,
  }) {
    const rooms = await roomRepo.fetchByRoomNumber({ roomNumber })
    const roomToReserve = must(rooms[0])

    const reservationsToSave = [
      {
        id: uuidService.getUUID(),
        startAt,
        endAt,
        roomId: roomToReserve.id,
      }
    ]

    await reservationRepo.addReservations(reservationsToSave)

    return {
      status: 'OK',
    }
  }
}


export type ReservationCreatedResult = {
  status: 'OK'
}

export type CreateReservationUseCase =
  (args: {
    floor: number
    roomNumber: number
    startAt: Temporal.PlainDateTime,
    endAt: Temporal.PlainDateTime,
  }) => Promise<ReservationCreatedResult>
