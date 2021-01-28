import qs, { ParsedQs } from 'qs';

const toSearch = (params: ParsedQs): string => qs.stringify(params, { addQueryPrefix: true });

export default toSearch;
