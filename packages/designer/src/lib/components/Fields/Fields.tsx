import { useContext } from 'react';
import styled from 'styled-components';

import { DesignerContext } from '../../Designer.Context';
import { FormField } from './components/FormField';

export type FieldsProps = {};

export const Fields = (props: FieldsProps) => {
  const { fields } = useContext(DesignerContext);

  return (
    <Wrapper>
      <Header>Header</Header>
      <Main>
        <FormField fields={fields} />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.div``;

const Main = styled.div``;
