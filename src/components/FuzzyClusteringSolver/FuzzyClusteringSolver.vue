<script>
import fuzzyClustering from './fuzzyClustering'
import { times } from 'lodash/fp'

const getZeroPoint = () => [0, 0]

export default {
  name: 'FuzzyClusteringSolver',
  filters: {
    roundDecimal: value => value.toFixed(2)
  },
  data: () => ({
    clusteredObjects: times(getZeroPoint, 8),
    centroids: times(getZeroPoint, 2),
    results: null
  }),
  methods: {
    addCentroid () {
      this.centroids.push(getZeroPoint())
    },
    removeCentroid (index) {
      this.centroids.splice(index, 1)
    },
    addClusteredObject () {
      this.clusteredObjects.push(getZeroPoint())
    },
    removeClusteredObject (index) {
      this.clusteredObjects.splice(index, 1)
    },
    clusterObjects () {
      this.results = fuzzyClustering({
        centroids: this.centroids,
        objects: this.clusteredObjects
      })
    }
  }
}
</script>

<template lang="pug">
.root
  section
    h2 Objects to be clustered
    div(v-for="(object, index) of clusteredObjects")
      span.centroid-cluster {{ `X${index + 1}` }}
      ElInputNumber(
        v-model="object[0]"
      )
      ElInputNumber(
        v-model="object[1]"
      )
      ElButton.btn-remove(
        size="mini",
        type="danger",
        icon="el-icon-delete",
        @click="removeClusteredObject(index)"
      )
    ElButton.btn-add(
      type="primary",
      @click="addClusteredObject"
    ) Add
  section
    h2 Centroids
    div(v-for="(centroid, index) of centroids")
      span.centroid-cluster {{ index }}
      ElInputNumber(
        v-model="centroid[0]"
      )
      ElInputNumber(
        v-model="centroid[1]"
      )
      ElButton.btn-remove(
        size="mini",
        type="danger",
        icon="el-icon-delete",
        @click="removeCentroid(index)"
      )
    ElButton.btn-add(
      type="primary",
      @click="addCentroid"
    ) Add
  ElButton(@click="clusterObjects") Cluster Objects
  section.results(v-show="results")
    h2 Result
    div(v-for="(result, index) of results")
      h2 Step {{ index + 1 }}
      h3 Centroids
      table.centroids
        tr(v-for="centroid of centroids")
          td(v-for="coordinate of centroid") {{ coordinate }}
      h3 Weights
      table.weights
        tr(v-for="row of result.weights")
          td(v-for="weight of row") {{ weight | roundDecimal }}
</template>

<style scoped lang="postcss">
.results :matches(table, td, tr) {
  border: 1px solid gray;
}

.centroid-cluster {
  margin: 0 16px;
}

.btn-add {
  margin: 8px 16px;
}

.btn-remove {
  margin: 0 8px;
}
</style>
