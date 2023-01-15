import test from 'ava'
import { Temporal } from 'proposal-temporal'
import { InMemoryReservationRepository, InMemoryRoomRepository } from '../../lib/in-memory'
import { makeRoomInfos } from '../../lib/in-memory/InMemoryRoomRepository'
import { must } from '../../lib/utils'
import { buildUseCase, CreateReservationUseCase } from './CreateReservationUseCase'

test(`basic example - createReservation`, async t => {
  const [
    createReservation,
    { roomRepository, reservationRepository }
  ] = buildSubject()

  await roomRepository.addRooms(makeRoomInfos({ floor: 1 }, { count: 10 }))
  const roomToReserve = must(roomRepository.records[3])

  const result = await createReservation({
    floor: roomToReserve.floor,
    roomNumber: roomToReserve.roomNumber,
    startAt: Temporal.PlainDateTime.from("2024-02-01 12:00:00"),
    endAt: Temporal.PlainDateTime.from("2024-02-03 10:00:00"),
  })

  t.is(result.status, 'OK')
  t.is(reservationRepository.records.length, 1)

  const newReservation = must(reservationRepository.records[0])

  t.is(newReservation.roomId, roomToReserve.id)
})

function buildSubject(): [
  CreateReservationUseCase,
  {
    roomRepository: InMemoryRoomRepository
    reservationRepository: InMemoryReservationRepository
  }
] {
  const roomRepository = new InMemoryRoomRepository()
  const reservationRepository = new InMemoryReservationRepository()

  return [
    buildUseCase({ roomRepository, reservationRepository }),
    {
      roomRepository,
      reservationRepository,
    },
  ]
}
