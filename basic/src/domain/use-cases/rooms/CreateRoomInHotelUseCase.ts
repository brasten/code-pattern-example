import { RoomInfo } from '../../lib/RoomInfo'
import { UUIDService } from '../../lib/uuids/UUIDService'

export function buildUseCase(): CreateRoomInHotelUseCase {
  const uuidService = new UUIDService()

  /**
   * CreateRoomInHotelUseCase handles the creation of a room in the hotel.
   */
  return function useCase({ room }) {
    return {
      status: 'OK',
      room: {
        id: uuidService.getUUID(),
        ...room,
      }
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
  (args: { room: RoomValues }) => RoomCreatedResult | CreationFailedResult
