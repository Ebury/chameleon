export default function flushPromises() {
  // better than calling nextTick multiple times.
  // await wrapper.vm.$nextTick();
  // await wrapper.vm.$nextTick();
  // await wrapper.vm.$nextTick();
  return new Promise((resolve) => {
    setTimeout(resolve);
  });
}
