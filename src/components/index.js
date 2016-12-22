import React, { Component, PropTypes } from 'react';

import Select from './Select';
import Info from './Info';

const styles = {
  container: {
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif', // eslint-disable-line max-len
  },
  select: {
    borderRight: '1px solid rgb(234, 234, 234)',
    flex: '1 0 15rem',
  },
  info: {
    flex: '1 1 100%',
  },
};

class App extends Component {
  static propTypes = {
    channel: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      font: undefined,
    };

    this.onFontChanged = this.onFontChanged.bind(this);
  }

  componentWillMount() {
    const { channel } = this.props;

    channel.on('font-set', this.setFont);
  }

  componentDidUpdate(_, prevState) {
    const { channel } = this.props;

    if (this.state.font !== prevState.font) {
      channel.emit('font', this.state.font);
    }
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.removeListener('font-set');
  }

  onFontChanged(font) {
    this.setState({
      font,
    });
  }

  setFont = (font) =>
    this.setState({
      font,
    });

  render() {
    const { font } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.select}>
          <Select onChange={this.onFontChanged} />
        </div>

        <div style={styles.info}>
          <Info font={font} />
        </div>
      </div>
    );
  }
}

export default App;
