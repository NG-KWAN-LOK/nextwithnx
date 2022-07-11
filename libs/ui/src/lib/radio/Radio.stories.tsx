import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
} from '@mui/material';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { Radio, RadioProps } from './Radio';

export default {
  component: Radio,
  title: 'Radio',
  argTypes: {
    disabled: {
      type: { name: 'boolean', required: false },
      description: 'If true, the radio will be disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    labelPlacement: {
      type: { name: 'string', required: false },
      description: 'The position of the label.',
      table: {
        type: { summary: 'end' },
        defaultValue: { summary: 'end' },
        category: 'not comparable with caption',
      },
      options: ['end'],
      control: { type: 'radio' },
    },
    color: {
      type: { name: 'string', required: false },
      description:
        'The color of the component. It supports those theme colors that make sense for this component.',
      table: {
        type: { summary: 'primary | secondary | default' },
        defaultValue: { summary: 'secondary' },
      },
      options: ['primary', 'secondary', 'default'],
      control: { type: 'radio' },
    },
    size: {
      type: { name: 'string', required: false },
      description:
        'The size of the radio. small is equivalent to the dense radio styling.',
      table: {
        type: { summary: 'medium | small' },
        defaultValue: { summary: 'medium' },
      },
      options: ['medium', 'small'],
      control: { type: 'radio' },
    },
    RadioProps: {
      type: { name: 'any', required: false },
      description: 'Attributes applied to inner Radio element.',
      table: {
        type: { summary: 'any' },
      },
    },
    TypographyProps: {
      type: { name: 'any', required: false },
      description: 'Attributes applied to inner Typography element.',
      table: {
        type: { summary: 'any' },
      },
    },
  },
} as Meta<typeof Radio>;

const WithLabelStory: Story<RadioProps> = (args) => <Radio {...args} />;

export const WithLabel = WithLabelStory.bind({});

WithLabel.args = {
  disabled: false,
  labelPlacement: 'end',
  color: 'secondary',
  size: 'medium',
  value: 'JUI',
  label: 'JUI',
};

const RadioWithCaption = (props: RadioProps) => {
  const [value, setValue] = React.useState('');

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroup value={value} onChange={handleRadioChange}>
      <Radio caption={value && 'caption'} {...props} />
    </RadioGroup>
  );
};

const WithCaptionStory: Story<RadioProps> = (args) => (
  <RadioWithCaption {...args} />
);

export const WithCaption = WithCaptionStory.bind({});

WithCaption.args = {
  disabled: false,
  labelPlacement: 'end',
  color: 'secondary',
  size: 'medium',
  value: 'JUI',
  label: 'JUI',
};

const RadioWithFormGroup = (props: RadioProps) => {
  const options: string[] = ['JUI', 'MUI', 'MUIX'];
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [helperText, setHelperText] = React.useState<string>('Choose wisely');

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    setHelperText('');
    setError(false);
  };

  useEffect(() => {
    if (!value) {
      return;
    }

    if (value === 'JUI') {
      setHelperText('You got it!');
      setError(false);
    } else {
      setHelperText("I'm sorry to hear that.");
      setError(true);
    }
  }, [value]);

  return (
    <FormControl component="fieldset" error={error}>
      <FormLabel component="legend">
        Choose the UI made by Junyiacademy
      </FormLabel>
      <RadioGroup name="ui" value={value} onChange={handleRadioChange}>
        {options.map((option) => (
          <Radio key={option} label={option} value={option} {...props} />
        ))}
      </RadioGroup>
      <FormHelperText
        sx={{
          [`&.${formHelperTextClasses.root}`]: {
            marginLeft: 0,
          },
        }}
      >
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

const WithFormGroupStory: Story<RadioProps> = (args) => (
  <RadioWithFormGroup {...args} />
);

export const WithFormGroup = WithFormGroupStory.bind({});

WithFormGroup.args = {
  disabled: false,
  labelPlacement: 'end',
  color: 'secondary',
  size: 'medium',
};
