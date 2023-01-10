import { RoomRepositoryPort } from '../../ports/RoomRepositoryPort'
import { RoomInfo } from '../RoomInfo'
import { UUIDService } from '../uuids/UUIDService'

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

export function makeRoomInfos(vals?: Partial<RoomInfo>, args?: { count: number }): RoomInfo[] {
  const count = args?.count ?? 1

  const floorNum = vals?.floor ?? 1
  let roomNumber = floorNum * 100

  return new Array(count).fill(null).map(_ => ({
    id: vals?.id ?? new UUIDService().getUUID(),
    floor: floorNum,
    roomNumber: roomNumber++,
  }))
}