function svgLoader(source) {
    return `export default function Icon(props) { return (${source.replace('<svg ', '<svg {...props} ')}); }`;
}

module.exports = svgLoader;
