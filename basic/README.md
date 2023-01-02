

# Exercise 1: Hotel Booking System

## Tasks:
- Create and delete rooms
- Create reservations for rooms
  - Rooms cannot be double-booked
  - New requirement on room deletion:
    - Rooms with reservations cannot be deleted
- Remove reservations for rooms
  - ... not within 24-hours of cancelation time



# Script #

- create `domain/ports`
  - interfaces that our domain defines to allow it to access the outside world
- create `domain/use-cases`
  - represents the API that our application uses to interact with the domain model

- start by creating a use case for the first requirement: "Create a room"


## Suggested Reading ##
- https://wkrzywiec.medium.com/ports-adapters-architecture-on-example-19cab9e93be7