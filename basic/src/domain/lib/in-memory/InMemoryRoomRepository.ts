import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'
import { RoomInfo } from '../RoomInfo'

/**
 * Reference implementation of a Room Repository
 */
export class InMemoryRoomRepository implements RoomRepositoryPort {
  records = [] as RoomInfo[]

  async addRooms(rooms: RoomInfo[]): Promise<unknown> {
    for (const newRoom of rooms) {
      const existingRecord = this.records.find(_ =>
        _.id == newRoom.id
        || (_.roomNumber == newRoom.roomNumber && _.floor == newRoom.floor)
      )

      if (existingRecord)
        throw new Error(`Room exists: ${existingRecord}`)
    }

    this.records.push(...rooms)
    return null
  }
}
