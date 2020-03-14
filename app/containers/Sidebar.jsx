import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import WifiIcon from '@material-ui/icons/Wifi';
import { push } from 'connected-react-router';
import { Nav } from 'grommet';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarButton from '../components/SidebarButton';
import routes from '../constants/routes';

const SidebarButtons = () => {
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.router.location.pathname);

  return (
    <Nav fill gap="none" background="accent-1">
      <SidebarButton
        icon={<WifiIcon style={{ color: 'green' }} />}
        active={pathname === routes.CONNECTIONS}
        onClick={() => dispatch(push(routes.CONNECTIONS))}
        label="Connect"
      />
      <SidebarButton
        label="Scripts"
        icon={<FormatListNumberedIcon />}
        active={pathname === routes.SCRIPTS}
        onClick={() => dispatch(push(routes.SCRIPTS))}
      />
    </Nav>
  );
};

export default SidebarButtons;
