import { Skeleton } from '@/app/components/index';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="2rem" width="5rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
