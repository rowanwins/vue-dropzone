<template>
  <div>
    <h1>Events</h1>
    <p>The vue2-Dropzone component will emit the following events.</p>
    <simple-table
      :headers="['Event Name', 'Description']" 
      :rows="events" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  data: function () {
    return {
      events: [
        ['vdropzone-file-added(file)', 'File added to the dropzone.'],
        ['sdfds','sdf']
      ]
    }
  },
  components: {
    'simple-table': SimpleTable
  }  
}
</script>

