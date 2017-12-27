import { flatMap, flow, sum, times } from 'lodash/fp'

const totalDimensions = 2
const exponentialWeight = 2
const maxIterations = 3

const reassignCentroids = (clusterCount, objects) => {
  const calcSum = flow(
    flatMap(({ coefficients }) => coefficients),
    coefficients => coefficients.map(c => c ** exponentialWeight),
    sum
  )
  const coefficientsSum = calcSum(objects)

  const centroidForCluster = cluster => {
    const weightedPointsSum = dimension => (
      objects.reduce(
        (acc, { point, coefficients }) => (
          acc + point[dimension] * coefficients[cluster] ** exponentialWeight
        ),
        0
      )
    )
    const centroidCoordinate = dimension => weightedPointsSum(dimension) / coefficientsSum
    return times(centroidCoordinate, totalDimensions)
  }

  return times(centroidForCluster, clusterCount)
}

const pointToCentroidsDistance = (point, centroids) => centroids.map(
  centroid => Math.hypot(
    ...times(
      i => point[i] - centroid[i],
      totalDimensions
    )
  )
)

const pointCoefficients = (point, centroids) => {
  const distances = pointToCentroidsDistance(point, centroids)
  const zeroDistanceIndex = distances.findIndex(e => !e)
  if (zeroDistanceIndex !== -1) {
    const result = Array(distances.length).fill(0)
    result[zeroDistanceIndex] = 1
    return result
  }

  return distances.map(
    d1 => 1 / sum(
      distances.map(d2 => (d1 / d2) ** 2 / (exponentialWeight - 1))
    )
  )
}

const reweightObjects = (centroids, weightedObjects) => (
  weightedObjects.map(
    ({ point }) => ({
      point,
      coefficients: pointCoefficients(point, centroids)
    })
  )
)

const iteration = (clusterCount, weightedObjects) => {
  const centroids = reassignCentroids(clusterCount, weightedObjects)
  const reweightedObjects = reweightObjects(centroids, weightedObjects)
  return {
    centroids,
    weightedObjects: reweightedObjects
  }
}

const toResult = ({ centroids, weightedObjects }) => ({
  centroids,
  weights: weightedObjects.map(
    ({ coefficients }) => coefficients
  )
})

export default ({ centroids, objects }) => {
  const clusterCount = centroids.length
  const result = []
  let weightedObjects = reweightObjects(centroids, objects.map(point => ({ point })))
  result.push(toResult({ centroids, weightedObjects }))
  for (let i = 0; i < maxIterations - 1; i++) {
    ({ centroids, weightedObjects } = iteration(clusterCount, weightedObjects))
    result.push(toResult({ centroids, weightedObjects }))
  }
  return result
}
