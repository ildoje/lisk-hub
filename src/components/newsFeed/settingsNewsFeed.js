import React from 'react';
import Checkbox from '../toolbox/sliderCheckbox';
import styles from './settingsNewsFeed.css';

const unlockedOptions = ['twitter'];

const SettingsNewsFeed = props => (
  <div className={styles.settingsNewsFeed}>
    <div>Choose which feeds to display.</div>
    {Object.keys(props.channels)
      .filter(channel => unlockedOptions.indexOf(channel) !== -1)
      .map((channel, index) => (
        <div className={styles.item} key={`channel-${index}`}>
          <label>{props.t(channel)}</label>
          <Checkbox
            onChange={() =>
              props.setNewsChannels({
                channels: {
                  ...props.channels,
                  [channel]: !props.channels[channel],
                },
              })
            }
            theme={styles}
            input={{
              value: true,
              checked: props.channels[channel],
            }}/>
        </div>
      ))
    }
  </div>
);

export default SettingsNewsFeed;
