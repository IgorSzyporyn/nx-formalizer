import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Formalizer } from '@formalizer/core';
import { useMediaColorScheme } from '@formalizer/ui';

import { themes } from './theme/themes';
import { DesignerContext } from './Designer.Context';
import { Toolbox } from './components/Toolbox/Toolbox';
import { Canvas } from './components/Canvas/Canvas';
import { Interaction } from './components/Interaction/Interaction';

import type { IFieldProps } from '@formalizer/core';
import type { ThemeVariant } from '@formalizer/ui';
import { FieldExtraProps, fieldMap } from '@formalizer/react-form';
import type { DesignerContextType } from './Designer.Context';

export type DesignerProps = {
  fields?: IFieldProps[];
};

export const Designer = ({ fields: _fields = [] }: DesignerProps) => {
  const mediaColorScheme = useMediaColorScheme();
  const [themeVariant, setThemeVariant] =
    useState<ThemeVariant>(mediaColorScheme);
  const [context, setContext] = useState<DesignerContextType>({
    fields: _fields,
    formalizer: new Formalizer<FieldExtraProps>({
      fields: _fields,
      xFieldMap: fieldMap,
    }),
    updateDesignerContext: () => {},
  });

  const updateDesignerContext = (
    contextPartials: Partial<DesignerContextType>
  ) => {
    setContext({
      ...context,
      ...contextPartials,
      ...(contextPartials.fields
        ? {
            formalizer: new Formalizer({
              fields: contextPartials.fields,
              xFieldMap: fieldMap,
            }),
          }
        : {}),
    });
  };

  useEffect(() => {
    updateDesignerContext({ fields: _fields });
  }, [_fields]);

  const theme = themes[themeVariant];

  return (
    <ThemeProvider theme={theme}>
      <DesignerContext.Provider value={{ ...context, updateDesignerContext }}>
        <Root>
          <DndProvider backend={HTML5Backend}>
            <Heading></Heading>
            <Main>
              <ToolboxPanel>
                <Toolbox />
              </ToolboxPanel>
              <CanvasPanel>
                <Canvas />
              </CanvasPanel>
              <InteractionPanel>
                <Interaction />
              </InteractionPanel>
            </Main>
          </DndProvider>
        </Root>
      </DesignerContext.Provider>
    </ThemeProvider>
  );
};

const Root = styled.div`
  height: 100%;
  min-height: 100%;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.surface.background.light};
  color: ${({ theme }) => theme.typography.color.normal};
  font-family: ${({ theme }) => theme.typography.font};
`;

const Heading = styled.header`
  height: 56px;
  border-bottom: 1px solid ${({ theme }) => theme.border.normal};
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
`;

const CanvasPanel = styled.section`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.surface.background.normal};
`;

const ToolboxPanel = styled.section`
  border-right: 1px solid ${({ theme }) => theme.border.normal};
`;

const InteractionPanel = styled.section`
  border-left: 1px solid ${({ theme }) => theme.border.normal};
`;
