import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

interface BreadCrumbs {
  items: {
    name: string;
    slug: string;
  }[];
}

const BreadCrumbs = ({ items }: BreadCrumbs) => {
  return (
    <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
      {items.map((item, key: number) => (
        <BreadcrumbItem key={key}>
          <BreadcrumbLink
            as={NavLink}
            to={'/' + item.slug}
            textTransform="capitalize"
            _hover={{
              fontWeight: 'medium',
            }}
          >
            {item.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
