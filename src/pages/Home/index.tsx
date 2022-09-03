import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { WiDayCloudy } from 'react-icons/wi';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import LegendToggleRoundedIcon from '@mui/icons-material/LegendToggleRounded';
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded';

import {
  ForecastTable,
  Loading,
  SearchInput,
  StatsBox,
} from '../../components';
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

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGetCity = async (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      const data = await locationService.get(search);

      if (!data.length) {
        setError(true);
        setLoading(false);
        return;
      }

      if (data) {
        setCity(data[0]);
        setError(false);
      }

      return;
    }
  };

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
    const getStats = (temperatures: number[]) => {
      const average =
        temperatures.reduce((a: number, b: number) => a + b, 0) /
        temperatures.length;
      setMean(Math.round(average));
      setMode(getMode(temperatures));
      setMin(Math.min(...temperatures));
      setMax(Math.max(...temperatures));
    };

    if (forecast) {
      const temperatures: number[] = [];
      forecast.map((daily: ForecastType) =>
        temperatures.push(
          Math.round(daily.temp.day),
          Math.round(daily.temp.eve),
          Math.round(daily.temp.morn),
          Math.round(daily.temp.night)
        )
      );
      getStats(temperatures);
      setLoading(false);
    }
  }, [forecast]);

  return (
    <S.HomeWrapper>
      <h1>
        WeatherApp <WiDayCloudy />
      </h1>
      <S.StyledForm>
        <SearchInput
          placeholder='Search for the city here'
          value={search}
          onChange={onSearchChanged}
        />
        <S.StyledButton onClick={handleGetCity}>
          <SearchRoundedIcon />
        </S.StyledButton>
      </S.StyledForm>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <p>
              Sorry, your search returned no results. Please check the city name
              and try again
            </p>
          ) : (
            <>
              {city && (
                <div>
                  <h2>
                    5-Day Weather Forecast for {city.name}, {city.state},{' '}
                    {city.country}
                  </h2>
                </div>
              )}
              {forecast && <ForecastTable rows={forecast} />}
              {min && max && mean && mode && (
                <>
                  <h2>5-Day Weather Stats for {city?.name}</h2>
                  <S.StatsBoxSection>
                    <StatsBox
                      title='Minimum Temperature'
                      temperature={min}
                      icon={
                        <KeyboardArrowDownRoundedIcon htmlColor='#4050D2' />
                      }
                    />
                    <StatsBox
                      title='Maximum Temperature'
                      temperature={max}
                      icon={<KeyboardArrowUpRoundedIcon htmlColor='#FFBF5E' />}
                    />
                    <StatsBox
                      title='Mean Temperature'
                      temperature={mean}
                      icon={<LegendToggleRoundedIcon htmlColor='#6ABAD1' />}
                    />
                    <StatsBox
                      title='Mode Temperature'
                      temperature={mode}
                      icon={<ScatterPlotRoundedIcon htmlColor='#d6d7da' />}
                    />
                  </S.StatsBoxSection>
                </>
              )}
            </>
          )}
        </>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
