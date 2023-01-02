
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

  /**
   * CreateRoomInHotelUseCase handles the creation of a room in the hotel.
   */
  return function useCase({ room }) {
    return {
      status: 'OK',
      room: {
        id: 'test-id',
        ...room,
      }
    }
  }

}