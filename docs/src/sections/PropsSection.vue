<template>
  <div>
    <h2>Props</h2>
    <simple-table v-if="props" :headers="['Property', 'Desc', 'Type', 'Accepted Values', 'Default value']" :rows="props" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  props: {
    props: {
      type: Array,
      required: false
    }
  },
  components: {
    'simple-table': SimpleTable
  }
}
</script>

