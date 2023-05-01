import { useQueries } from '@tanstack/react-query';
import { fetchProviderAndDetail } from '../../api';
import PROVIDERS from '../../constants/providers';

const useCollectionQueries = (list, options) => {
  const collectionQueries = list?.map(({ type, id }) => ({
    queryKey: ['@collection', type, id],
    queryFn: () => fetchProviderAndDetail(type, id),
    suspense: true,
    select: data => ({
      id: data.id,
      title: data.title || data.name,
      posterPath: data.poster_path,
      providers: data.results.KR.flatrate
        .map(provider => provider.provider_id)
        ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
    }),
    ...options,
  }));

  const queries = useQueries({
    queries: collectionQueries,
  });

  return queries;
};

export default useCollectionQueries;
