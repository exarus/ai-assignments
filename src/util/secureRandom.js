const bufferSize = 128
const buffer = new Uint8Array(bufferSize)

let i = bufferSize

export const nextRandomUint8 = () => {
  if (i === bufferSize) {
    window.crypto.getRandomValues(buffer)
    i = 0
  }
  return buffer[i++]
}

export const pickRandom = (iterable) => {
  const arr = [...iterable]
  const length = arr.length
  if (length === 0) {
    throw Error('Empty input not allowed')
  } if (length < 128) {
    return arr[nextRandomUint8() % length]
  } else {
    throw Error('Unimplemented')
  }
}
