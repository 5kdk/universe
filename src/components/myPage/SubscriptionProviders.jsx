import { Container, Title, Flex, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import ProviderBadges from './ProviderBadges';

const SubscriptionServices = () => (
  <Container mt={10} p={0}>
    <Flex justify="space-between" align="center" mb={10}>
      <Title order={5} fw={400}>
        현재 구독하고 있어요
      </Title>
      <ActionIcon variant="transparent">
        <IconSettings size="1rem" />
      </ActionIcon>
    </Flex>
    <ProviderBadges variant={'dot'} />
  </Container>
);

export default SubscriptionServices;
