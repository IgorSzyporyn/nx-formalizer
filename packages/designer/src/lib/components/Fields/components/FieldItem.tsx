import { useDrop, useDrag } from 'react-dnd';
import * as Styled from './styled';

import { dndAccept } from '../../../map/dnd';

import type { IFieldProps } from '@formalizer/core';
import type { ReactNode } from 'react';
import { FieldMapKey } from '@formalizer/react-form';

export const createFields = (fields: IFieldProps[], level: number) => {
  const elements: ReactNode[] = [];

  fields.forEach((field) => {
    const Field = createField(field, level + 1);
    elements.push(Field);
  });

  return elements;
};

const createField = (field: IFieldProps, level: number) => {
  return <FieldItem key={field.name} field={field} level={level} />;
};

export type FieldItemProps = {
  field: IFieldProps;
  level: number;
};

const FieldItem = ({ field, level }: FieldItemProps) => {
  const { type, fields = [] } = field;
  const acceptType = dndAccept[type as FieldMapKey];
  const isDroppable = acceptType !== 'none';

  const [{ isDragging }, drag] = useDrag(() => ({
    type: field.type,
    item: field,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: acceptType,
      drop(_item: IFieldProps, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          return;
        }
        // setHasDropped(true)
        //  setHasDroppedOnChild(didDrop)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    []
  );

  if (isDragging) {
    return <div ref={drag} />;
  }

  return isDroppable ? (
    <Styled.Wrapper ref={drag}>
      <Styled.FieldPanel>{field.name}</Styled.FieldPanel>
      {fields.length > 0 && (
        <Styled.FieldChildren ref={drop}>
          {createFields(fields, level)}
        </Styled.FieldChildren>
      )}
    </Styled.Wrapper>
  ) : (
    <Styled.Wrapper ref={drag}>
      <Styled.FieldPanel>{field.name}</Styled.FieldPanel>
      {fields.length > 0 && (
        <Styled.FieldChildren>
          {createFields(fields, level)}
        </Styled.FieldChildren>
      )}
    </Styled.Wrapper>
  );
};
