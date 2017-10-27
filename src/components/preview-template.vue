<script>
  export default {
    render(createElement) {
        return createElement(
          'div',
          {class: {'dz-preview': true, 'dz-file-preview': true}, slot: 'dz-preview'},
          [
            createElement(
              'div',
              {class:{'dz-image': true}, slot: 'dz-image'},
              [
                createElement('div', {attrs: {'data-dz-thumbnail-bg': ''}})
              ]
            ),
            createElement(
              'div',
              {class: {'dz-details': true}, slot: 'dz-details'},
              [
                createElement(
                  'div',
                  {class: {'dz-size': true}, slot: 'dz-size', },
                  [
                    createElement('span', {attrs: {'data-dz-size': ''}})
                  ]
                ),
                createElement(
                  'div',
                  {class: {'dz-filename': true}, slot: 'dz-filename'},
                  [
                    createElement('span', {attrs: {'data-dz-name': ''}})
                  ]
                )
              ]
            ),
            createElement(
              'div',
              {class: {'dz-progress': true}, slot: 'dz-progress'},
              [
                createElement('span', {class: {'dz-upload': true}, attrs: {'data-dz-uploadprogress': ''}})
              ]
            ),
            createElement(
              'div',
              {class: {'dz-error-message': true}, slot: 'dz-error-message'},
              [
                createElement('span', {attrs: {'data-dz-errormessage': ''}})
              ]
            ),
            createElement(
              'div',
              {class: {'dz-success-mark': true}, slot: 'dz-success-mark'},
              [
                createElement('i', {class: {'fa': true, 'fa-check':true}})
              ]
            ),
            createElement(
              'div',
              {class: {'dz-error-mark': true}, slot: 'dz-error-mark'},
              [
                createElement('i', {class: {'fa': true, 'fa-close':true}})
              ]
            ),
          ], this.$slots.default)
      }
  }
</script>
