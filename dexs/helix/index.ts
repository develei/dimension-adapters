import { FetchResultVolume, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";
import fetchURL from "../../utils/fetchURL"

const URL = "https://external.api.injective.network/api/aggregator/v1/spot/tickers";
interface IVolume {
  target_volume: number;
}

const fetch = async (timestamp: number): Promise<FetchResultVolume> => {
  const volume: IVolume[] = (await fetchURL(URL)).data;
  const dailyVolume = volume.reduce((e: number, a: IVolume) => a.target_volume + e, 0);
  return {
    dailyVolume: dailyVolume.toString(),
    timestamp
  }
}


const adapter: SimpleAdapter = {
  adapter: {
    [CHAIN.INJECTIVE]: {
      fetch: fetch,
      start: async () => 1676505600,
    }
  }
}

export default adapter;
