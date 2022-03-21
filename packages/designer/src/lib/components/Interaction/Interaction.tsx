import styled from 'styled-components';
import { Fields } from '../Fields/Fields';
import { Properties } from '../Properties/Properties';

export type InteractionProps = {};

export const Interaction = (props: InteractionProps) => {
  return (
    <Wrapper>
      <PropertiesPanel style={{ flexBasis: '50%' }}>
        <Properties />
      </PropertiesPanel>
      <FieldsPanel style={{ flexBasis: '50%' }}>
        <Fields />
      </FieldsPanel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
`;

const PropertiesPanel = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border.normal};
`;

const FieldsPanel = styled.div``;
