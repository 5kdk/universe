import { Suspense, useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { Category, Posters, Carousels, PosterSkeleton } from '.';
import { goToTop } from '../../utils';

const Board = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleMediaChange = () => {
    setMediaType(media => (media === 'movie' ? 'tv' : 'movie'));
  };

  const handleCategoryChange = newCategory => {
    setSelectedIds(newCategory);
  };

  useEffect(() => {
    goToTop();
  }, [mediaType, selectedIds]);

  return (
    <Container fluid>
      <Category
        mediaType={mediaType}
        handleMediaChange={handleMediaChange}
        handleCategoryChange={handleCategoryChange}
      />
      <Container p={0} fluid>
        {selectedIds.length === 0 ? (
          <Suspense fallback={<PosterSkeleton />}>
            <Posters mediaType={mediaType} />
          </Suspense>
        ) : (
          <Carousels mediaType={mediaType} providerIds={selectedIds} />
        )}
      </Container>
    </Container>
  );
};

export default Board;
