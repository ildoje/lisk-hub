import React from 'react';
import styles from './newsFeed.css';
import News from './news';
import Box from '../box';
import { FontIcon } from '../fontIcon';
import SettingsNewsFeed from './settingsNewsFeed';
import liskServiceApi from '../../utils/api/liskService';

class NewsFeed extends React.Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
      newsFeed: [],
    };
    this.updateData();
  }


  updateData() {
    liskServiceApi.getNewsFeed().then((newsFeed) => {
      this.setState({ newsFeed });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  openSettings() {
    this.setState({ showSettings: true });
  }

  hideSettings() {
    this.setState({ showSettings: false });
  }

  setNewsChannels(data) {
    this.props.settingsUpdated(data);
  }

  render() {
    const settingsButton = this.state.showSettings ?
      (<div className={`settingsButton ${styles.settingsButton}`} onClick={() => { this.hideSettings(); }}>
        <span>{this.props.t('Done')}</span>
      </div>) :
      (<div className={`settingsButton ${styles.settingsButton}`} onClick={() => { this.openSettings(); }}>
        <FontIcon className='online' value='edit' />
      </div>);

    const filteredNewsFeed =
      this.state.newsFeed.filter(feed => this.props.channels[feed.source]) || [];

    return (
      <Box className={`newsFeed-box ${styles.newsFeedBox}`}>
        <div className={styles.newsFeed}>
          <div className={styles.header}>
            <header className={styles.headerWrapper}>
              <h2>{this.props.t('News')}</h2>
            </header>
            {settingsButton}
          </div>
          <div className={styles.container}>
            {this.state.showSettings ?
              <SettingsNewsFeed
                t={this.props.t}
                channels={this.props.channels}
                hideSettings={this.hideSettings.bind(this)}
                setNewsChannels={this.setNewsChannels.bind(this)} /> :
              <div>
                {filteredNewsFeed.map((news, index) => (
                  <div className={styles.newsWrapper} key={`newsWrapper-${index}`}>
                    <News
                      t={this.props.t}
                      {...news} />
                  </div>
                ))}
              </div>
            }
          </div>
          <footer>
          </footer>
        </div>
      </Box>
    );
  }
}

export default NewsFeed;
