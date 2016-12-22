import React, { Component, PropTypes } from 'react';

import Search from 'js-search';

const fontsJSON = require('google-fonts-complete');

const styles = {
  container: {
    paddingRight: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    height: '2rem',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid rgb(234, 234, 234)',
    boxShadow: 'none',
    fontSize: 11,
    padding: '0.3125rem',
    color: '#555',
    boxSizing: 'border-box',
  },
  options: {
    overflowY: 'scroll',
    overflowX: 'Hidden',
  },
  option: {
    fontSize: 11,
    lineHeight: '1rem',
    padding: '0.3125rem',
    color: 'rgb(68, 68, 68)',
    opacity: 0.5,
    letterSpacing: '0.0625rem',
    cursor: 'pointer',
  },
};

const fonts = Object.keys(fontsJSON).map((font) => ({
  'font-family': font,
  ...(fontsJSON[font]),
}));

class Select extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      font: undefined,
      input: undefined,
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.search = this.initSearch();
  }

  componentDidUpdate(_, prevState) {
    const { onChange } = this.props;

    if (this.state.font !== prevState.font) {
      onChange(this.state.font);
    }
  }

  onChange(evt) {
    this.setState({
      input: evt.target.value,
    });
  }

  onBlur() {
    this.setState((prevState) => ({
      font: prevState.input,
    }));
  }

  selectFont = (font) => () =>
    this.setState({
      font,
      input: font,
    });

  initSearch() {
    const search = new Search.Search('font-family');

    search.addIndex('font-family');
    search.addDocuments(fonts);

    return search;
  }

  render() {
    const { input } = this.state;

    const items = (Boolean(input)
      ? this.search.search(input)
      : fonts);

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          type="text"
          value={input}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Put font-family here..."
        />
        <div style={styles.options}>
          {items.map((font, index) => (
            <div
              style={styles.option}
              key={index}
              onClick={this.selectFont(font['font-family'])}
            >
              {font['font-family']}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Select;
