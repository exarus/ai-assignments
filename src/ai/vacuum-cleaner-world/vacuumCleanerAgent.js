import { cellStates } from '@/util/vacuum-cleaner-world'
export default () => ({
  discoveredGrid: Array(10).fill((() => Array(10).fill(null))()),
  position: [0, 0],
  spentEnergy: 0,
  stayIdle () {},
  positionStatus () {

  },
  goNorth (cellState) {
    this.spentEnergy += 1
    if (cellState !== cellStates.wall) {
      this.position[0] += 1
    }
    this.discoveredGrid.set(this.position.toString(), cellState)
  },
  suck () {
    this.spentEnergy += 2
  }
})
