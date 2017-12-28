<script>
import naiveBayes from './naiveBayes'

export default {
  name: 'NaiveBayes',
  data: () => ({
    trainingSet: [],
    testSet: [],
    result: null
  }),
  methods: {
    addTrainingExample () {
      this.trainingSet.push({ classId: 0, features: [] })
    },
    removeTrainingExample (exampleIndex) {
      this.trainingSet.splice(exampleIndex, 1)
    },
    addFeature (example) {
      example.features.push(0)
    },
    removeFeature (example, featureIndex) {
      example.features.splice(featureIndex, 1)
    },
    addTestExample () {
      this.testSet.push({ features: [] })
    },
    removeTestExample (exampleIndex) {
      this.testSet.splice(exampleIndex, 1)
    },
    trainAndClassify () {
      this.result = naiveBayes(this.trainingSet, this.testSet)
    }
  }
}
</script>

<template lang="pug">
.root
  section
    h2 Training Set
    div(v-for="(example, exampleIndex) of trainingSet")
      div.example-header
        h3 Example {{ exampleIndex }}
        ElButton.btn-remove(
          size="mini",
          type="danger",
          icon="el-icon-delete",
          @click="removeTrainingExample(exampleIndex)"
        )
      h4 Class
      ElInputNumber(v-model="example.classId")
      h4 Features
      div(v-for="(feature, featureIndex) of example.features")
        ElInputNumber(v-model="example.features[featureIndex]")
        ElButton.btn-remove(
          size="mini",
          type="danger",
          icon="el-icon-delete",
          @click="removeFeature(example, featureIndex)"
        )
      ElButton.btn-add(
        type="primary",
        @click="addFeature(example)"
      ) Add feature
    ElButton.btn-add(
      type="primary",
      @click="addTrainingExample"
    ) Add example
  section
    h2 Test Set
    div(v-for="(example, exampleIndex) of testSet")
      div.example-header
        h3 Example {{ exampleIndex }}
        ElButton.btn-remove(
          size="mini",
          type="danger",
          icon="el-icon-delete",
          @click="removeTestExample(exampleIndex)"
        )
      div(v-for="(feature, featureIndex) of example.features")
        ElInputNumber(v-model="example.features[featureIndex]")
        ElButton.btn-remove(
          size="mini",
          type="danger",
          icon="el-icon-delete",
          @click="removeFeature(example, featureIndex)"
        )
      ElButton.btn-add(
        type="primary",
        @click="addFeature(example)"
      ) Add feature
    ElButton.btn-add(
      type="primary",
      @click="addTestExample"
    ) Add example
  ElButton(@click="trainAndClassify") Train and Classify
</template>

<style scoped lang="postcss">
.example-header {
  display: flex;
}

.btn-add {
  margin: 8px 16px;
}

.btn-remove {
  margin: 0 8px;
}
</style>
