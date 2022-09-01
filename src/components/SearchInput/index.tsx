import { ChangeEvent } from 'react';
import * as S from './styles';

export type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({
  placeholder,
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <S.StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
