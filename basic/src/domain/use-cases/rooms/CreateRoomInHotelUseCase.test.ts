import test from 'ava'
import { isResultOk } from '../../lib/results'
import { buildUseCase, CreateRoomInHotelUseCase, RoomCreatedResult } from './CreateRoomInHotelUseCase'

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
  t.is(typeof (result as RoomCreatedResult).room.id, 'string')
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

  if (!isResultOk(resultOne)) throw new Error(`resultOne is not OK`)
  if (!isResultOk(resultTwo)) throw new Error(`resultTwo is not OK`)

  // This is where we start getting into dependencies, since ID generation can be
  // specific to our persistence layer.
  //
  t.true(resultOne.room.id !== resultTwo.room.id)
})

test(`validation: cannot create room with duplicate floor/roomNumber`, t => {
  const createRoom = buildSubject()

  const room101 = {
    floor: 1,
    roomNumber: 101,
  }
  const duplicateRoom = {
    floor: 1,
    roomNumber: 101,
  }

  const resultOne = createRoom({ room: room101 })
  const resultTwo = createRoom({ room: duplicateRoom })

  t.is(resultOne.status, 'OK')
  t.is(resultTwo.status, 'FAIL')
})