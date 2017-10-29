import Prism from 'prismjs';

export default {
  bind(el, binding, vnode) {
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value
      }
      Prism.highlightElement(target);
    });
  }
}
