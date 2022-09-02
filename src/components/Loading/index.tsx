import { CircularProgress } from '@mui/material';

import * as S from './styles';

export const Loading = () => {
  return (
    <S.LoadingWrapper>
      <CircularProgress />
    </S.LoadingWrapper>
  );
};
