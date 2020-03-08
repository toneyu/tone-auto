import React from 'react';
import { Box, Text, Button } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { statusSelector } from '../selectors/statuses';
import { feedbackSelector } from '../selectors/feedbacks';
import { setupFeedbackRequest, teardownFeedbackRequest } from '../actions/feedback';

const Statuses = ({ host }) => {
  const dispatch = useDispatch();
  const muteStatus = useSelector(statusSelector(host, 'Status/Audio/Microphones/Mute'));
  useMount(() => {
    dispatch(setupFeedbackRequest(host, 'Status/Audio/Microphones/Mute'));
  });
  const attached = useSelector(feedbackSelector(host, 'Status/Audio/Microphones/Mute'));

  return (
    <Box>
      <Button
        label="Teardown"
        onClick={() => dispatch(teardownFeedbackRequest(host, 'Audio Microphones Mute'))}
      />
      <Text>Mute: {JSON.stringify(muteStatus) ?? 'Loading...'}</Text>
      <Text>Attached: {attached}</Text>
    </Box>
  );
};

export default Statuses;
