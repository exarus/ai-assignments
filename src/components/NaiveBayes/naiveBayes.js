export default (trainingSet, testSet) => {
  const class0Probability = trainingSet.filter(({ classId }) => classId === 0).length / trainingSet.length
  const class1Probability = trainingSet.filter(({ classId }) => classId === 1).length / trainingSet.length

  const classify = ({ features }) => ({ classId: 0 })

  return {
    classProbability: [
      class0Probability,
      class1Probability
    ],
    classifiedTestSet: testSet.map(classify)
  }
}
