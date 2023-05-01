import React from 'react';

import { Modal, Image, Grid, Container, Title, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import styled from '@emotion/styled';
import Badges from '../Badges';

import { useProviderQueries } from '../../hooks/queries';

import { getProvidersByIds } from '../../utils';
import ActionIcons from './ActionIcons';
import genres from '../../constants/genres';

const BadgeContainer = styled.div`
  width: 100%;
  padding: 0 1.875rem;
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 1rem;
  z-index: 999;
`;

const DetailModal = ({ opened, close, id, title, backdropPath, posterPath, overview, genreIds, mediaType }) => {
  const userCollectionList = [{ id, type: mediaType }];

  const { providers } = useProviderQueries(userCollectionList, {
    select: data => ({ id: data.id, providers: data.results.KR.flatrate ?? [] }),
  });

  const providerIds = getProvidersByIds(providers[0]?.providers);

  return (
    <>
      <Modal.Root opened={opened} onClose={close} size={850} centered>
        <Modal.Overlay />
        <Modal.Content pos="relative">
          <Overlay c="#000" opacity={0.75} zIndex="1" />
          <Image src={`https://image.tmdb.org/t/p/w780${backdropPath}` || undefined}></Image>
          <BadgeContainer>
            <Badges providers={providerIds} spacing="sm" size="2.5rem" />
            <ActionIcons size={10} id={id} type={mediaType} />
          </BadgeContainer>
          <Modal.CloseButton style={{ zIndex: '999' }} pos="absolute" top={10} right={20} />
          <Modal.Body m={40} c="#fff" style={{ zIndex: '2' }} pos="absolute" top={0}>
            <Grid columns={5}>
              <Grid.Col span={3}>
                <Container>
                  <Title order={1} mb={10} mt={10}>
                    {title}
                  </Title>
                  <Text>2023</Text>
                  {genreIds.map(id => (
                    <Badge color={genres[mediaType][id].color} key={id}>
                      {genres[mediaType][id].name}
                    </Badge>
                  ))}
                  <ScrollArea fw={300} fz="sm" h={200}>
                    {overview}
                  </ScrollArea>
                </Container>
              </Grid.Col>
              <Grid.Col span={2}>
                <Container m={10}>
                  <Image src={`https://image.tmdb.org/t/p/w342${posterPath}` || undefined} />
                </Container>
              </Grid.Col>
            </Grid>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
export default DetailModal;