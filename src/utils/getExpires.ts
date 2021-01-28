const getExpires = (expiresIn: string): number => Date.now() + +expiresIn * 1000;

export default getExpires;
