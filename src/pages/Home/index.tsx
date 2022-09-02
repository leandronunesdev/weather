import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ForecastTable, SearchInput } from '../../components';
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
  const [mean, setMean] = useState();

  const temperaturesArray: any = [];

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleGetCity = async (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      const data = await locationService.get(search);

      if (data) {
        setCity(data.data[0]);
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
          daily.temp.day,
          daily.temp.eve,
          daily.temp.morn,
          daily.temp.night
        )
      );
    }
  }, [forecast]);

  // useEffect(() => {
  //   if(temperaturesArray.length === 20){
  //     const
  //   }
  //   console.log(temperaturesArray);
  // }, [temperaturesArray]);

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
      {forecast && <ForecastTable rows={forecast} />}
    </S.HomeWrapper>
  );
};

export default Home;
