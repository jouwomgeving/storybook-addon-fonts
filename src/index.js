import React, { Component, PropTypes } from 'react';

import addons from '@kadira/storybook-addons';

import WebFont from 'webfontloader';

class Font extends Component {
  static propTypes = {
    channel: PropTypes.func,
    story: PropTypes.func,
    font: PropTypes.string,
  }

  static defaultProps = {
    channel: addons.getChannel(),
    font: 'Strada, Strada OT, Roboto, sans-serif',
  }

  constructor(props) {
    super(props);

    this.state = {
      font: props.font,
    };

    this.setFont = this.setFont.bind(this);
    this.generateCSS = this.generateCSS.bind(this);

    this.loadFont = this.loadFont.bind(this);
  }

  componentWillMount() {
    const { channel } = this.props;
    const { font } = this.state;

    channel.on('font', this.setFont);
    channel.emit('font-set', font);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.font !== prevState.font) {
      this.loadFont(this.state.font);
    }
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.removeListener('font');
    channel.emit('font-unset');
  }

  setFont = (font) =>
    this.setState({
      font,
    });

  loadFont(font) {
    WebFont.load({
      google: {
        families: [font],
      },
    });
  }

  generateCSS() {
    const { font } = this.state;

    return `
* {
  font-family: ${font};
}
    `;
  }

  render() {
    const { story } = this.props;

    return (
      <div>
        <style>
          {this.generateCSS()}
        </style>
        {story()}
      </div>
    );
  }
}

const FontDecorator = (story) => (
  <Font story={story} />
);

export default FontDecorator;
