import React, { Component, PropTypes } from 'react';

const fontsJSON = require('google-fonts-complete');

const styles = {
  container: {
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
  },
  part: {
    paddingBottom: '0.6325rem',
  },
  title: {
    padding: '0.25rem',
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: '1rem',
    color: 'rgb(68, 68, 68)',
    borderBottom: '1px solid rgb(234, 234, 234)',
  },
  value: {
    padding: '0.25rem 0.3125rem',
    color: 'rgba(68, 68, 68, 0.5)',
    fontSize: 11,
  },
};

class Info extends Component {
  static propTypes = {
    font: PropTypes.string,
  }

  getInfo(font) {
    return (fontsJSON[font] || {});
  }

  render() {
    const { font } = this.props;

    if (!font) return null;

    const { category, variants, subsets } = this.getInfo(font);

    return (
      <div style={styles.container}>
        <div style={styles.part}>
          <div style={styles.title}>
            Font Family
          </div>
          <div style={styles.value}>
            {font}
          </div>
        </div>
        {category && (
          <div style={styles.part}>
            <div style={styles.title}>
              Category
            </div>
            <div style={styles.value}>
              {category}
            </div>
          </div>
        )}
        {variants && (
          <div style={styles.part}>
            <div style={styles.title}>
              Variants
            </div>
            <div style={styles.value}>
              {Object.keys(variants).join(', ')}
            </div>
          </div>
        )}
        {subsets && (
          <div style={styles.part}>
            <div style={styles.title}>
              Subsets
            </div>
            <div style={styles.value}>
              {subsets.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Info;
