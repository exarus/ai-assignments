import actions from '@/ai/vacuum-cleaner-world/actions'

export const getMoveDestination = (move, [fromX, fromY]) => new Map([
  [actions.moveNorth, [fromX - 1, fromY]],
  [actions.moveSouth, [fromX + 1, fromY]],
  [actions.moveWest, [fromX, fromY - 1]],
  [actions.moveEast, [fromX, fromY + 1]]
]).get(move)

export const getMoveOrigin = (move, [toX, toY]) => new Map([
  [actions.moveNorth, [toX + 1, toY]],
  [actions.moveSouth, [toX - 1, toY]],
  [actions.moveWest, [toX, toY + 1]],
  [actions.moveEast, [toX, toY - 1]]
]).get(move)
