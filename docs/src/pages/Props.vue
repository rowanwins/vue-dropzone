<template>
  <div>
    <h1>Props</h1>
    <p>The following props are available for the Vue2-Dropzone component.</p>
    <simple-table
      :headers="['Prop Name', 'Type', 'Description', 'Required']" 
      :rows="props" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  data: function () {
    return {
      props: [
        ['id', 'String', 'A string by which to identify the component, can be anything', 'True'],
        ['options', 'Object', 'A dropzone [configuration object](http://www.dropzonejs.com/#configuration-options), accepts all valid dropzone configuration', 'True'],
        ['includeStyling', 'Boolean', 'Whether to include the dropzone and component styling, defaults to true', 'False'],
      ]
    }
  },
  components: {
    'simple-table': SimpleTable
  }  
}
</script>

