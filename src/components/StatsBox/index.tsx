import { ReactNode } from 'react';

import * as S from './styles';

export type StatsBoxProps = {
  title: string;
  temperature: number;
  icon: ReactNode;
};

export const StatsBox = ({ title, temperature, icon }: StatsBoxProps) => {
  return (
    <S.StatsBoxWrapper>
      <S.StatsTitle>
        <p>{title}</p>
      </S.StatsTitle>
      <S.StatsData>
        {icon}
        <p>{temperature}°</p>
      </S.StatsData>
    </S.StatsBoxWrapper>
  );
};
