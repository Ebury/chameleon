import { createHOC } from '../hoc';

function ecWithFilters(Component, filters = []) {
  const curriedComponent = createHOC(Component, {
    name: 'EcWithFilters',
  }, {
    props: {
      filters() {
        return filters;
      },
    },
  });

  // remove "filters" prop if exist because we are pre-bounding that value.
  delete curriedComponent.props.filters;
  return curriedComponent;
}

export default ecWithFilters;
