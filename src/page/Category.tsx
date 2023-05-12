import BreadCrumbs from '@/components/section/BreadCrumbs';
import Dashboard from '@/components/section/Dashboard';
import { Box } from '@chakra-ui/react';

const BREADCRUMBS_DATA = [
  {
    name: 'dashboard',
    slug: 'dashboard',
  },
  {
    name: 'Kategori',
    slug: 'kategori',
  },
];

const Category = () => {
  return (
    <Dashboard>
      <Box bg="white" p={4}>
        <BreadCrumbs items={BREADCRUMBS_DATA} />
      </Box>
    </Dashboard>
  );
};

export default Category;
