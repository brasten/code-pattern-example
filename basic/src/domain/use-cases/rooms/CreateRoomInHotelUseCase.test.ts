import test from 'ava'
import { buildUseCase, CreateRoomInHotelUseCase } from './CreateRoomInHotelUseCase'

function buildSubject(): CreateRoomInHotelUseCase {
  return buildUseCase()
}

test(`basic example`, t => {
  const createRoom = buildSubject()

  const result = createRoom({
    room: {
      floor: 1,
      roomNumber: 101,
    }
  })

  t.is(result.status, 'OK')
  t.is(typeof result.room.id, 'string')
})