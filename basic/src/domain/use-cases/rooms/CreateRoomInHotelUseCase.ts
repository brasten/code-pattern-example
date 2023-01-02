import { UUIDService } from '../../lib/uuids/UUIDService'

export type RoomInfo = {
  id: string
  floor: number
  roomNumber: number
}
export type RoomValues = Omit<RoomInfo, 'id'>

export type CreateRoomInHotelUseCase =
  (args: { room: RoomValues }) => {
    status: 'OK';
    room: RoomInfo
  }

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