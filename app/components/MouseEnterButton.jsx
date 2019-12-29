import { Button } from 'grommet';
import React, { useCallback, useState } from 'react';

/**
 * Simple wrapper for grommet's button except its children funtion may include an additional
 * property in its parameter named "mouseEnter". The motiviation for this component
 * originates from the following problem:
 * https://stackoverflow.com/q/28772104
 *
    <MouseEnterButton>
      {({ mouseEnter }) =>
        "children"
      }
    </MouseEnterButton>
 */
const MouseEnterButton = ({ children, ...props }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <Button
      onMouseEnter={useCallback(() => setMouseEnter(true), [setMouseEnter])}
      onMouseLeave={useCallback(() => setMouseEnter(false), [setMouseEnter])}
      {...props}
    >
      {typeof children === 'function'
        ? (buttonProps) => children({ mouseEnter, ...buttonProps })
        : children}
    </Button>
  );
};

export default MouseEnterButton;
