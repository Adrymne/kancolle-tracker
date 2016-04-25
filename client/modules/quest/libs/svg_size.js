// TODO: Get rid of magic numbers
const HEADER = 52; // navbar height
const FOOTER = 30; // arbitrary spacing at the bottom

export default function calcSvgSize() {
  return {
    width: '100%',
    height: `${window.innerHeight - HEADER - FOOTER}px`,
  };
}
