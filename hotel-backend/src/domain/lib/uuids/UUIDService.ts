import { generate } from 'short-uuid'

export class UUIDService {

  getUUID(): string {
    return generate().toString()
  }

}