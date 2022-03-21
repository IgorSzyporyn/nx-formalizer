import { cloneDeep, isEmpty } from 'lodash';
import { initXFieldValidation, mapEach } from './utils';
import {
  initValue,
  initXFieldArrayCapability,
  initXFieldObjectCapability,
  initXFieldStateHandlers,
} from './utils/initialize';
import { initXFieldMap } from './utils/initXFieldMap';
import { initXFields } from './utils/initXFields';
import { initXFieldRefMap } from './utils/initXFieldRefMap';
import { initXFieldDependencies } from './utils/initXFieldDependencies';

import { xFieldMap as xFieldCoreMap } from './xFieldMap';

import type {
  FormalizerOptions,
  IValidationErrors,
  IValue,
  IXFieldMap,
  IXFieldProps,
  IXFieldRefMap,
  ValidateFn,
  ExtraProps,
} from './types';

export class Formalizer<E = ExtraProps> {
  public config: FormalizerOptions<E> = {};

  public xFieldMap: IXFieldMap<E> = {};
  public xFields: Array<IXFieldProps<E>> = [];
  public xFieldRefMap: IXFieldRefMap<E> = {};

  public value: IValue = {};
  public initialValue: IValue = {};

  public validate: ValidateFn;
  public validation: IValidationErrors = {};

  public dirty = false;
  public touched = false;
  public valid = false;

  protected formalizer = '1.0.0';

  constructor(options: FormalizerOptions<E> = {}) {
    const { registerExtraProps, fields = [] } = options;

    // Set options as config
    this.config = options;

    //////////////////////////////////////////////////////
    // Core functionality, safeguarding, mapping etc..
    //////////////////////////////////////////////////////

    // Initialize the xFieldMap for ability to handle the core types:
    // ["string", "number", "boolean", "object", "array"]
    this.xFieldMap = initXFieldMap<E>({
      applicantMaps: this.config.xFieldMap,
      xFieldCoreMap: xFieldCoreMap as IXFieldMap<E>,
    });

    // Initialize and convert the given fields to xFields
    // using the xFieldMap as catalyst - registerExtraProps
    // lets the user send in a function which return statement
    // will be merged on top of the returned xFields extraProps
    this.xFields = initXFields({
      fields,
      registerExtraProps,
      xFieldMap: this.xFieldMap,
    });

    // Initialize and create the flat dot notated object holding
    // all the xFields in the formalizer instance
    this.xFieldRefMap = initXFieldRefMap<E>(this.xFields);

    //////////////////////////////////////////////////////
    // Enrich capabilities
    //////////////////////////////////////////////////////

    // Enrich the xFields with dependency capabilities
    initXFieldDependencies<E>(this.xFieldRefMap);

    // Enrich the xFields with valueType set to "object" with capabilities
    // to handle child properties up and down the tree
    initXFieldObjectCapability<E>(this.xFieldRefMap);

    // Enrich the xFields with valueType set to "array" with capabilities
    // to handle child properties and values
    initXFieldArrayCapability<E>(this.xFieldRefMap);

    // Initialize and create the value object in the formalizer instance
    const { handleValueChange } = this;

    this.value = initValue<E>({
      value: options.value,
      xFieldRefMap: this.xFieldRefMap,
      onChange: handleValueChange,
      onDelete: handleValueChange,
    });

    this.initialValue = cloneDeep(this.value);

    // Now relationships and values have been established we also need to
    // introduce dirty and touched states on our fields
    initXFieldStateHandlers<E>(this.xFieldRefMap);

    // And handle validation
    this.validate = initXFieldValidation<E>(this.xFields);
  }

  // Keep value object updated, keep xValue object updated and
  // keep dirty, valid and touched updated
  private handleValueChange = () => {
    const { onDirtyChange, onTouchedChange } = this.config;
    const dirty =
      JSON.stringify(this.value) !== JSON.stringify(this.initialValue);
    const dirtyChange = dirty !== this.dirty;

    this.dirty = dirty;

    if (!this.touched && onTouchedChange) {
      onTouchedChange(true);
    }

    if (this.dirty) {
      this.touched = true;
    }

    if (dirtyChange && onDirtyChange) {
      onDirtyChange(dirty);
    }

    this.handleValidation();
  };

  private handleValidation = async () => {
    const { onValidChange } = this.config;
    const validation = (this.validation = await this.validate(this.value));
    const valid = isEmpty(validation);
    const validChange = valid !== this.valid;

    this.valid = valid;

    if (validChange && onValidChange) {
      onValidChange(valid);
    }

    mapEach<IXFieldRefMap<E>, IXFieldProps<E>>(this.xFieldRefMap, (xField) => {
      if (xField.$id) {
        const error = validation[xField.$id];
        xField.error = error || undefined;
      }
    });
  };
}
