<template>
  <section>
    <h2>Usage</h2>

    <p>Assuming <code>{{name}}</code> is registered as 
      <code>{{tag}}</code>, the <code>template</code> of your component may contain: </p>
    <pre v-prism data-lang="html"><code class="language-markup"><slot name="template"></slot></code></pre>

    <template v-if="$slots.script">
      <p>The <code>script</code> section of your component may contain:</p>
      <pre v-prism data-lang="js"><code class="language-javascript"><slot name="script"></slot></code></pre>
    </template>

  </section>
</template>

<script>
import Prism from '../directives/Prism';

export default {
  props: [ 'name', 'tag' ],
  directives: {
    'prism': Prism
  }
}
</script>

