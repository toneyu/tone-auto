import React from 'react';
import { Box } from 'grommet';

import FeedbackText from './FeedbackText';

const Statuses = ({ host }) => {
  return (
    <Box>
      <FeedbackText label="Product" host={host} path="Status/SystemUnit/ProductId" />
      <FeedbackText label="Mute" host={host} path="Status/Audio/Microphones/Mute" />
      <FeedbackText label="System time" host={host} path="Status/Time/SystemTime" />
      <FeedbackText
        label="Serial number"
        host={host}
        path="Status/SystemUnit/Hardware/Module/SerialNumber"
      />
      <FeedbackText
        label="Software version"
        host={host}
        path="Status/Provisioning/Software/Current/VersionId"
      />
      {/* <FeedbackText
        label="Installed options"
        host={host}
        path="Status/SystemUnit/Software/OptionKeys"
      /> */}
      <FeedbackText label="System name" host={host} path="Configuration/SystemUnit/Name" />
      <FeedbackText label="IPv4" host={host} path="Status/Network/1/IPv4/Address" />
      {/* <FeedbackText label="IPv6" host={host} path="Status/Network/1/IPv6/Address" /> */}
      {/* <FeedbackText label="MAC address" host={host} path="Status/Network/1/Ethernet/MacAddress" />
      <FeedbackText
        label="Temperature"
        host={host}
        path="Status/SystemUnit/Hardware/Monitoring/Temperature/Status"
      /> */}
      <FeedbackText label="Selfview mode" host={host} path="Status/Video/Selfview/Mode" />
      <FeedbackText label="Do not disturb" host={host} path="Status/Conference/DoNotDisturb" />
      {/* <FeedbackText label="Callid" host={host} path="Status/Conference/ActiveSpeaker CallId" /> */}
      {/* <FeedbackText label="Call Status" host={host} path="Status/Call/15" /> */}
      <FeedbackText label="Call Status" host={host} path="Status/Call" />
      {/* <FeedbackText label="Remote Input" host={host} path="Status/" /> */}
    </Box>
  );
};

export default Statuses;
