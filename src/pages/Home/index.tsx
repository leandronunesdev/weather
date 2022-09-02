import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ForecastTable, Loading, SearchInput } from '../../components';
import { locationService } from '../../services/locationService';
import { weatherService } from '../../services/weatherService';

import * as S from './styles';

export type CityType = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState<CityType>();
  const [forecast, setForecast] = useState<any>();
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [mean, setMean] = useState<number>();
  const [mode, setMode] = useState<number>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const temperaturesArray: any = [];

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetCity = async (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      const data = await locationService.get(search);

      if (!data.data.length) {
        setError(true);
        setLoading(false);
        return;
      }

      if (data) {
        setCity(data.data[0]);
        setError(false);
        setLoading(false);
      }

      return;
    }
  };

  useEffect(() => {
    const getWeather = async (params: any) => {
      const data = await weatherService.get(params);

      if (data) {
        setForecast(data.data.daily.slice(0, 5));
      }

      return;
    };

    if (city) {
      const params = {
        lat: city.lat,
        lon: city.lon,
      };

      getWeather(params);
    }
  }, [city]);

  useEffect(() => {
    if (forecast) {
      forecast.map((daily: any) =>
        temperaturesArray.push(
          Math.round(daily.temp.day),
          Math.round(daily.temp.eve),
          Math.round(daily.temp.morn),
          Math.round(daily.temp.night)
        )
      );
    }
  }, [forecast]);

  useEffect(() => {
    if (temperaturesArray.length === 20) {
      const average =
        temperaturesArray.reduce((a: number, b: number) => a + b, 0) /
        temperaturesArray.length;
      setMean(Math.round(average));
      setMode(getMode(temperaturesArray));
      setMin(Math.min(...temperaturesArray));
      setMax(Math.max(...temperaturesArray));
    }
  }, [temperaturesArray]);

  function getMode(array: any) {
    interface IObjectKeys {
      [key: number]: number;
    }

    const obj: IObjectKeys = {};

    array.forEach((number: any) => {
      if (!obj[number as keyof IObjectKeys]) {
        obj[number] = 1;
      } else {
        obj[number] += 1;
      }
    });

    let highestValue = 0;
    let highestValueKey = 0;

    for (let key in obj) {
      const value = obj[key];
      if (value > highestValue) {
        highestValue = value;
        highestValueKey = parseInt(key);
      }
    }

    return highestValueKey;
  }

  return (
    <S.HomeWrapper>
      <S.StyledForm>
        <SearchInput
          placeholder='Search for the city here'
          value={search}
          onChange={onSearchChanged}
        />
        <S.StyledButton onClick={handleGetCity}>Check</S.StyledButton>
      </S.StyledForm>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <p>
              Sorry, your seach returned no results. Please check the city name
              and try again
            </p>
          ) : (
            <>
              {city && (
                <div>
                  <p>
                    5-day weather forecast for {city.name}, {city.state},{' '}
                    {city.country}
                  </p>
                </div>
              )}
              {min && max && mean && mode && (
                <div>
                  <p>Minimum Temperature: {min}</p>
                  <p>Maximum Temperature: {max}</p>
                  <p>Mean Temperature: {mean}</p>
                  <p>Mode Temperature: {mode}</p>
                </div>
              )}
              {forecast && <ForecastTable rows={forecast} />}
            </>
          )}
        </>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
