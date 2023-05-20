import { useRef } from 'react';
import { Accordion, Pagination } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from '@mantine/hooks';
import { useCollectionQueries, useUserQuery } from '../../../hooks/queries';
import { useSelectedItem, usePagination } from '../../../hooks';
import { sideNavState, categoryState } from '../../../recoil/atom';
import { EmptyMessage, Item } from '.';
import { TMDB_IMG_URL } from '../../../constants';

const Collection = ({ selectedItem, setSelectedItem, setImgSrc }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const category = useRecoilValue(categoryState);
  const isNavOpened = useRecoilValue(sideNavState);

  const { userInfo = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
    refetchOnWindowFocus: false,
  });

  const { activePage, setActivePage, total, collection } = usePagination(
    userInfo.reverse(),
    setSelectedItem,
    setImgSrc
  );

  const collectionQueries = useCollectionQueries(collection, { enable: !!collection });

  const collectionList = collectionQueries.map(
    ({ data }) =>
      data !== undefined && {
        ...data,
        modified_at: collection?.filter(item => item.id === data?.id)[0]?.modified_at,
      }
  );

  const itemRef = useRef(null);

  const screenToClose = useSelectedItem(selectedItem, setImgSrc, itemRef);

  const selectItem = e => {
    setSelectedItem(e);
    itemRef.current = e && `${TMDB_IMG_URL}/w300${collectionList.find(item => item.title === e)?.posterPath}`;
    setImgSrc(itemRef.current);

    if (isNavOpened && screenToClose) {
      setImgSrc(null);
    }
  };

  return (
    <>
      {collectionList.length === 0 ? (
        <EmptyMessage category={category} />
      ) : (
        <>
          <Accordion variant="separated" w="100%" onChange={selectItem} value={selectedItem}>
            {collectionList?.map(item => (
              <Item key={item.id} item={item} setSelectedItem={setSelectedItem} setImgSrc={setImgSrc} />
            ))}
          </Accordion>

          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={total}
            siblings={2}
            withEdges
            align="center"
            position="center"
            size={smallScreen ? 'xs' : 'sm'}
            m={smallScreen ? 'xs' : 'sm'}
          />
        </>
      )}
    </>
  );
};

export default Collection;
