import qs, { ParsedQs } from 'qs';

const toParams = <Type extends ParsedQs>(search: string): Type => qs.parse(search) as Type;

export default toParams;
