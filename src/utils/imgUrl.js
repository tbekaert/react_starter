import PropTypes from 'prop-types';

let imgUrl = (opts) => {
  return [
    'https://source.unsplash.com/random/',
    [
      opts.width && opts.width,
      opts.height && opts.height
    ].filter(a => a).join('x')
  ].join('');
};

imgUrl.propType = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

export default imgUrl;

// <img src={ imgUrl({ p: path, w: width, h: height, q: quality }) } alt="" />