<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(cell, j) in row" :key="j" v-html="marked(cell)"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: false
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>