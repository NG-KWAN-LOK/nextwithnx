import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  Typography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';
import { formControlLabelClasses } from '@mui/material/FormControlLabel';
import { radioClasses } from '@mui/material/Radio';

// self-defined-components
const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  [`& .${formControlLabelClasses.label}`]: {
    color: theme.palette.text.secondary,
    [`&.${formControlLabelClasses.disabled}`]: {
      color: theme.palette.text.disabled,
    },
  },
  [`& .${radioClasses.checked} + .${formControlLabelClasses.label}`]: {
    color: theme.palette.text.primary,
  },
}));

export interface RadioProps extends MuiFormControlLabelProps {
  color?: 'primary' | 'secondary' | 'default';
  size?: 'medium' | 'small';
  caption?: string;
  FormControlLabelProps?: Partial<MuiFormControlLabelProps>;
  RadioProps?: Partial<MuiRadioProps>;
  TypographyProps?: Partial<MuiTypographyProps>;
}

export const Radio = ({
  checked,
  disabled,
  label,
  labelPlacement,
  value,
  FormControlLabelProps = {},
  RadioProps = {},
  TypographyProps = {},
  color = 'secondary',
  size = 'medium',
  caption = '',
}: RadioProps) => {
  const { sx: radioSx = [], ...otherRadioProps } = RadioProps;
  const { sx: typographySx = [], ...otherTypographyProps } = TypographyProps;

  return (
    <>
      <StyledFormControlLabel
        control={
          <MuiRadio
            sx={[
              (theme) => ({
                color: theme.palette.text.primary,
              }),
              ...(Array.isArray(radioSx) ? radioSx : [radioSx]),
            ]}
            color={color}
            size={size}
            {...otherRadioProps}
          />
        }
        checked={checked}
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        value={value}
        {...FormControlLabelProps}
      />
      {caption && (
        <Typography
          sx={[
            (theme) => ({
              color: theme.palette.text.disabled,
              margin: '0 0 0 30px',
            }),
            ...(Array.isArray(typographySx) ? typographySx : [typographySx]),
          ]}
          variant="body2"
          {...otherTypographyProps}
        >
          {caption}
        </Typography>
      )}
    </>
  );
};

export default Radio;
