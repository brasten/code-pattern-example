# Hotel Booking System Example

## Practices

- Use a form of the [Ports and Adapters](https://wkrzywiec.medium.com/ports-adapters-architecture-on-example-19cab9e93be7) pattern
- Implement "fake" implementations of ports to demonstrate test readability
  benefits
- Implement "sociable tests" (or similar) that use fake dependency implementations
  for external dependencies but otherwise exercise the entire logic stack

## Tasks:
- ✅ Create room
- ✅ Delete room
- Create reservations for rooms
  - ✅ Basic use case
  - Rooms cannot be double-booked
  - New requirement on room deletion:
    - Rooms with reservations cannot be deleted
- Remove reservations for rooms
  - ... not within 24-hours of cancelation time


## Suggested Reading ##
- https://wkrzywiec.medium.com/ports-adapters-architecture-on-example-19cab9e93be7
- https://www.jamesshore.com/v2/blog/2018/testing-without-mocks#sociable-tests
