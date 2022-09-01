import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SearchInput } from '../../components';
import { locationService } from '../../services/locationService';

import * as S from './styles';

const Home = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState({});

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
    console.log(city);
  }, [city]);

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
    </S.HomeWrapper>
  );
};

export default Home;
