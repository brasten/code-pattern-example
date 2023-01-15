import test from 'ava'
import { InMemoryRoomRepository } from '../../lib/in-memory'
import { isResultOk } from '../../lib/results'
import { buildUseCase, CreateRoomInHotelUseCase, RoomCreatedResult } from './CreateRoomInHotelUseCase'

function buildSubject(): [ CreateRoomInHotelUseCase, { roomRepository: InMemoryRoomRepository } ] {
  const roomRepository = new InMemoryRoomRepository()

  return [
    buildUseCase({ roomRepository }),
    { roomRepository },
  ]
}

test(`basic example`, async t => {
  const [ createRoom, { roomRepository } ] = buildSubject()

  const result = await createRoom({
    room: {
      floor: 1,
      roomNumber: 101,
    }
  })

  t.is(result.status, 'OK')
  t.is(typeof (result as RoomCreatedResult).room.id, 'string')

  t.is(roomRepository.records.length, 1)
})

test(`multiple rooms`, async t => {
  const [ createRoom, { roomRepository } ] = buildSubject()

  const room101 = {
    floor: 1,
    roomNumber: 101,
  }
  const room102 = {
    floor: 1,
    roomNumber: 102,
  }

  const resultOne = await createRoom({ room: room101 })
  const resultTwo = await createRoom({ room: room102 })

  if (!isResultOk(resultOne)) throw new Error(`resultOne is not OK`)
  if (!isResultOk(resultTwo)) throw new Error(`resultTwo is not OK`)

  // This is where we start getting into dependencies, since ID generation can be
  // specific to our persistence layer.
  //
  t.true(resultOne.room.id !== resultTwo.room.id)
  t.is(roomRepository.records.length, 2)
})

// Now we will need to "persist" rooms somewhere so we can validate
// new room creation requests
//
test(`validation: cannot create room with duplicate floor/roomNumber`, async t => {
  const [ createRoom, { roomRepository } ] = buildSubject()

  const room101 = {
    floor: 1,
    roomNumber: 101,
  }
  const duplicateRoom = {
    floor: 1,
    roomNumber: 101,
  }

  const resultOne = await createRoom({ room: room101 })
  const resultTwo = await createRoom({ room: duplicateRoom })

  t.is(resultOne.status, 'OK')
  t.is(resultTwo.status, 'FAIL')

  t.is(roomRepository.records.length, 1)
})