import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'
import { RoomInfo } from '../RoomInfo'

/**
 * Reference implementation of a Room Repository
 */
export class InMemoryRoomRepository implements RoomRepositoryPort {
  records = [] as RoomInfo[]

  async addRooms(rooms: RoomInfo[]): Promise<unknown> {
    this.records.push(...rooms)
    return null
  }
}