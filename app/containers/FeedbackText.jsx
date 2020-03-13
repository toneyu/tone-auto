import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'grommet';

import { setupFeedbackRequest } from '../actions/feedback';
import { statusSelector } from '../selectors/statuses';
import { feedbackSelector } from '../selectors/feedbacks';
import { FeedbackStatus } from '../constants';

const FeedbackText = ({ host, path, label, stringify }) => {
  const dispatch = useDispatch();
  const feedbackStatus = useSelector(feedbackSelector(host, path));
  useEffect(() => {
    if (!feedbackStatus || feedbackStatus === FeedbackStatus.DISCONNECTED) {
      dispatch(setupFeedbackRequest(host, path));
    }
  }, [host, path, feedbackStatus]);

  let status = useSelector(statusSelector(host, path));

  if (feedbackStatus === FeedbackStatus.CONNECTING) {
    status = 'Loading...';
  } else if (feedbackStatus === FeedbackStatus.CONNECTED) {
    if (status === '') {
      status = 'N/A';
    } else if (typeof status === 'object' && !stringify) {
      status = JSON.stringify(status);
    } else if (stringify) {
      status = stringify(status);
    }
  } else if (feedbackStatus === FeedbackStatus.FAILED) {
    status = 'N/A';
  }

  return <Text>{`${label}: ${status}`}</Text>;
};

export default FeedbackText;
