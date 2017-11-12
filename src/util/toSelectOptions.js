import deepFreeze from 'deep-freeze'

export default map => deepFreeze(Array.from(
  map,
  ([key, object]) => ({ key, ...object })
))
