import React from 'react';
import { Box, Text, Button } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { statusSelector } from '../selectors/statuses';
import { feedbackSelector } from '../selectors/feedbacks';
import { setupFeedbackRequest, teardownFeedbackRequest } from '../actions/feedback';

const Statuses = ({ host }) => {
  const dispatch = useDispatch();
  const muteStatus = useSelector(statusSelector(host, 'Audio Microphones Mute'));
  useMount(() => dispatch(setupFeedbackRequest(host, 'Audio Microphones Mute')));
  const attached = useSelector(feedbackSelector(host, 'Audio Microphones Mute'));

  return (
    <Box>
      <Button
        label="Teardown"
        onClick={() => dispatch(teardownFeedbackRequest(host, 'Audio Microphones Mute'))}
      />
      <Text>Mute: {muteStatus ?? 'Loading...'}</Text>
      <Text>Attached: {attached ? 'true' : 'false'}</Text>
    </Box>
  );
};

export default Statuses;
