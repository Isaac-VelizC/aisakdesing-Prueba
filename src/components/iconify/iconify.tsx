import { forwardRef } from 'react';
import { Icon, disableCache } from '@iconify/react';

import type { IconProps } from '@iconify/react';
import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { iconifyClasses } from './classes';

// ----------------------------------------------------------------------


type IconifyProps = BoxProps & IconProps;


export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ className, width = 20, sx, ...other }, ref) => (
    <Box
      ssr
      ref={ref}
      component={Icon}
      className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height: width,
        flexShrink: 0,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    />
  )
);

disableCache('local');
