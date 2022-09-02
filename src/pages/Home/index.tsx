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

export type ForecastType = {
  dt: number;
  temp: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  humidity: number;
};

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [city, setCity] = useState<CityType>();
  const [forecast, setForecast] = useState<ForecastType[]>();
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [mean, setMean] = useState<number>();
  const [mode, setMode] = useState<number>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const temperaturesArray: number[] = [];

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetCity = async (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      const data = await locationService.get(search);
      console.log(data.length);

      if (!data.length) {
        setError(true);
        setLoading(false);
        return;
      }

      if (data) {
        setCity(data[0]);
        setError(false);
        setLoading(false);
      }

      return;
    }
  };

  useEffect(() => {
    type GetWeatherParams = {
      lat: number;
      lon: number;
    };

    const getWeather = async (params: GetWeatherParams) => {
      const data = await weatherService.get(params);

      if (data) {
        setForecast(data.daily.slice(0, 5));
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
      forecast.map((daily: ForecastType) =>
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

  function getMode(array: number[]) {
    interface IObjectKeys {
      [key: number]: number;
    }

    const obj: IObjectKeys = {};

    array.forEach((number: number) => {
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
