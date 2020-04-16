// @flow
import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addConnections } from '../actions/connections';
import xcom from '../assets/xcom.csv';
import script1 from '../assets/script1.xml';
import script2 from '../assets/script2.xml';
import script3 from '../assets/script3.xml';
import 'filepond/dist/filepond.min.css';
import { addScript } from '../actions/scripts';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = ({ children }) => {
  const dispatch = useDispatch();
  dispatch(addConnections(xcom));
  dispatch(addScript(script1));
  dispatch(addScript(script2));
  dispatch(addScript(script3));

  return <StyledApp>{children}</StyledApp>;
};

export default App;
