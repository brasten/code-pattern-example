import { RoomInfo } from '../../lib/RoomInfo'
import { UUIDService } from '../../lib/uuids/UUIDService'
import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'

export function buildUseCase(deps: {
  roomRepository: RoomRepositoryPort
}): CreateRoomInHotelUseCase {
  const uuidService = new UUIDService()
  const roomRepo    = deps.roomRepository

  /**
   * CreateRoomInHotelUseCase handles the creation of a room in the hotel.
   */
  return async function useCase({ room }) {
    const roomToAdd = {
      id: uuidService.getUUID(),
      ...room,
    }

    await roomRepo.addRooms([ roomToAdd ])

    return {
      status: 'OK',
      room: roomToAdd,
    }
  }
}

export type RoomValues = Omit<RoomInfo, 'id'>

export type RoomCreatedResult = {
  status: 'OK'
  room: RoomInfo
}
export type CreationFailedResult = {
  status: 'FAIL'
  code: 'DUPLICATE'
}

export type CreateRoomInHotelUseCase =
  (args: { room: RoomValues }) => Promise<RoomCreatedResult | CreationFailedResult>
