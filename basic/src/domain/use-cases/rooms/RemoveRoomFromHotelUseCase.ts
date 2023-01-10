import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'

export function buildUseCase(deps: {
  roomRepository: RoomRepositoryPort
}): RemoveRoomInHotelUseCase {
  const roomRepo    = deps.roomRepository

  /**
   * CreateRoomInHotelUseCase handles the creation of a room in the hotel.
   */
  return async function useCase({ room }) {

    return {
      status: 'OK',
    }
  }
}

/**
 * The values of a Room to create that are passed to the use case.
 */

export type RoomRemovedResult = {
  status: 'OK'
}

export type RemoveRoomInHotelUseCase =
  (args: { room: { id: string } }) => Promise<RoomRemovedResult>
