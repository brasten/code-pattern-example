export type ResultOk = {
  status: 'OK',
}
export type ResultFail = {
  status: 'FAIL',
}

export function isResultOk(result: (ResultOk | ResultFail)): result is ResultOk {
  return result.status == 'OK'
}