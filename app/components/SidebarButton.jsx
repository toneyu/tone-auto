import React from 'react';
import { Box, Button, Text } from 'grommet';

const SidebarButton = ({ label, icon, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? 'accent-1' : undefined}
        pad={{ horizontal: 'large', vertical: 'medium' }}
      >
        {icon}
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

export default SidebarButton;
