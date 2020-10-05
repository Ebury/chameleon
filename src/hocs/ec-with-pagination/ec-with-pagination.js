import { createHOCc } from 'vue-hoc';

import { DEFAULT_PAGE_SIZE } from '../../enums/pagination';

const withPagination = createHOCc({
  name: 'EcWithPagination',
  data() {
    return {
      internalPagination: {
        page: 1,
        numberOfItems: DEFAULT_PAGE_SIZE,
      },
    };
  },
}, {
  props(props) {
    return {
      ...props,
      page: this.internalPagination.page,
      numberOfItems: this.internalPagination.numberOfItems,
    };
  },
  listeners: {
    pagination(page, numberOfItems) {
      this.internalPagination.page = page ?? this.internalPagination.page;
      this.internalPagination.numberOfItems = numberOfItems ?? this.internalPagination.numberOfItems;
    },
  },
});

export default withPagination;
