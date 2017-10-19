import actions from '@/ai/vacuum-cleaner-world/actions'

export const getPositionAfterMove = (move, [fromX, fromY]) => new Map([
  [actions.moveNorth, [fromX - 1, fromY]],
  [actions.moveSouth, [fromX + 1, fromY]],
  [actions.moveWest, [fromX, fromY - 1]],
  [actions.moveEast, [fromX, fromY + 1]]
]).get(move)
