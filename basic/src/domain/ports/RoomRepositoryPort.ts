import { RoomInfo } from '../lib/RoomInfo'

export interface RoomRepositoryPort {

  /**
   * Adds rooms to an external repository of some kind
   */
  addRooms(rooms: RoomInfo[]): Promise<unknown>

  /**
   * Removes rooms from an external repository of some kind
   */
  removeRooms(rooms: Pick<RoomInfo, 'id'>[]): Promise<unknown>

  /**
   * Finds room records for a given `roomNumber`.
   *
   * Implementation Note: This would be a good index (roomNumber)
   */
  fetchByRoomNumber(args: { roomNumber: number }): Promise<RoomInfo[]>
}