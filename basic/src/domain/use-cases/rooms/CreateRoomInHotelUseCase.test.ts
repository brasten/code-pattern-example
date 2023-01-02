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

test(`multiple rooms`, t => {
  const createRoom = buildSubject()

  const room101 = {
    floor: 1,
    roomNumber: 101,
  }
  const room102 = {
    floor: 1,
    roomNumber: 102,
  }

  const resultOne = createRoom({ room: room101 })
  const resultTwo = createRoom({ room: room102 })

  t.is(resultOne.status, 'OK')
  t.is(resultTwo.status, 'OK')

  // This is where we start getting into dependencies, since ID generation can be
  // specific to our persistence layer.
  //
  t.true(resultOne.room.id !== resultTwo.room.id)
})