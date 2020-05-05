// @flow
import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addConnections } from '../actions/connections';
import xcom from '../assets/xcom.csv';
import script1 from '../assets/script1.xml';
import script2 from '../assets/script2.xml';
import script3 from '../assets/script3.xml';
import { loadScriptSuccess } from '../actions/scripts';
import 'filepond/dist/filepond.min.css';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = ({ children }) => {
  const dispatch = useDispatch();
  dispatch(addConnections(xcom));
  dispatch(loadScriptSuccess([script1, script2, script3]));

  return <StyledApp>{children}</StyledApp>;
};

export default App;
