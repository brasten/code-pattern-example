import test from 'ava'
import { InMemoryRoomRepository } from '../../lib/in-memory'
import { makeRoomInfos } from '../../lib/in-memory/InMemoryRoomRepository'
import { must } from '../../lib/utils'
import { buildUseCase, RemoveRoomInHotelUseCase } from './RemoveRoomFromHotelUseCase'

function buildSubject(): [ RemoveRoomInHotelUseCase, { roomRepository: InMemoryRoomRepository } ] {
  const roomRepository = new InMemoryRoomRepository()

  return [
    buildUseCase({ roomRepository }),
    { roomRepository },
  ]
}

test(`basic example`, async t => {
  const [ removeRoom, { roomRepository } ] = buildSubject()

  const rooms = makeRoomInfos({}, { count: 10 })
  await roomRepository.addRooms(rooms)

  t.is(roomRepository.records.length, 10)

  const result = await removeRoom({
    room: { id: must(rooms[3].id) },
  })

  t.is(result.status, 'OK')
  t.is(roomRepository.records.length, 9)
})
