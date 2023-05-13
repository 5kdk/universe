import { useProviderQueries, useUserQuery } from './queries';
import { PROVIDERS, colors } from '../constants';

const defaultData = {
  total: '0',
  data: [
    {
      id: 8,
      label: 'Netflix',
      count: 0,
      part: 0,
      color: colors.Netflix,
    },
    {
      id: 97,
      label: 'Watcha',
      count: 0,
      part: 0,
      color: colors.Watcha,
    },
    {
      id: 119,
      label: 'Amazon Prime',
      count: 0,
      part: 0,
      color: colors['Amazon Prime Video'],
    },
    {
      id: 337,
      label: 'Disney+',
      count: 0,
      part: 0,
      color: colors['Disney Plus'],
    },
    {
      id: 350,
      label: 'Apple TV+',
      count: 0,
      part: 0,
      color: colors['Apple TV Plus'],
    },
    {
      id: 356,
      label: 'Wavve',
      count: 0,
      part: 0,
      color: colors.Wavve,
    },
  ],
};

const getCountByProvider = (providerId, providerIds) => providerIds?.filter(Id => Id === providerId).length;

const getNewData = (providers, newTotal) => {
  const providerIds = providers.flatMap(Ids => Ids.providers);

  const newData = defaultData.data
    .map(item => ({ ...item, count: getCountByProvider(item.id, providerIds) }))
    .map(item => ({ ...item, part: +((item.count / newTotal) * 100).toFixed() }));
  return newData;
};

const useStatisticsByProvider = () => {
  const { data } = useUserQuery({ select: userInfo => userInfo.history_list });
  const historyList = data || [];
  const newTotal = historyList.length;

  let newData = [];

  const queries = useProviderQueries(historyList, {
    select: data => ({
      id: data.id,
      providers: data.results.KR
        ? data.results.KR.flatrate
            ?.map(provider => provider.provider_id)
            ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id))
        : [],
    }),
    enabled: !!newTotal,
  });

  const providers = queries.map(({ isSuccess, data }) => isSuccess && data);

  if (providers[0]) {
    newData = getNewData(providers, newTotal);
  }

  const newStats = { total: newTotal, data: newData };

  return newStats;
};

export default useStatisticsByProvider;
