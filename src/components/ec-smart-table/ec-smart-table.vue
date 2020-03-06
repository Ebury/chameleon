<script>
import EcTable from '../ec-table';
import withSorting from '../../hocs/ec-with-sorting';

// smart table must be composable. in the future, we are expecting to have pagination, search functionality,
// loading, empty state and error handling,
// e.g.
// withSorting(withPagination(withSkeletonLoading(EcTable))
export default withSorting(EcTable);
</script>
