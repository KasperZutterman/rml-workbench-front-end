import * as React from 'react';
import { ComponentCategory } from '../../constants/componentCategory';
import ProcessorForm from './ProcessorForm';
import SourceForm from './SourceForm';

export interface FormProps {
  onClose: () => void;
  onUpdate: (data: any) => void;
  component: any;
}

const ComponentForm = (props: FormProps) => {
  const { category } = props.component;
  if (category === ComponentCategory.Processor) {
    return <ProcessorForm {...props} />;
  } else if (category === ComponentCategory.Source) {
    return <SourceForm {...props} />;
  }
  return null;
};

export default ComponentForm;
