export const fl = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const removeEndingDot = (str: string) => {
  return str.endsWith('.') ? str.slice(0, -1) : str;
};

export function transliterate(text: string, spaces_as: string = ' '): string {
  const map: Record<string, string> = {
    '\u0410': 'A',
    '\u0411': 'B',
    '\u0412': 'V',
    '\u0413': 'G',
    '\u0414': 'D',
    '\u0415': 'E',
    '\u0401': 'Yo',
    '\u0416': 'Zh',
    '\u0417': 'Z',
    '\u0418': 'I',
    '\u0419': 'Y',
    '\u041A': 'K',
    '\u041B': 'L',
    '\u041C': 'M',
    '\u041D': 'N',
    '\u041E': 'O',
    '\u041F': 'P',
    '\u0420': 'R',
    '\u0421': 'S',
    '\u0422': 'T',
    '\u0423': 'U',
    '\u0424': 'F',
    '\u0425': 'Kh',
    '\u0426': 'Ts',
    '\u0427': 'Ch',
    '\u0428': 'Sh',
    '\u0429': 'Shch',
    '\u042A': '',
    '\u042B': 'Y',
    '\u042C': '',
    '\u042D': 'E',
    '\u042E': 'Yu',
    '\u042F': 'Ya',
    '\u0430': 'a',
    '\u0431': 'b',
    '\u0432': 'v',
    '\u0433': 'g',
    '\u0434': 'd',
    '\u0435': 'e',
    '\u0451': 'yo',
    '\u0436': 'zh',
    '\u0437': 'z',
    '\u0438': 'i',
    '\u0439': 'y',
    '\u043A': 'k',
    '\u043B': 'l',
    '\u043C': 'm',
    '\u043D': 'n',
    '\u043E': 'o',
    '\u043F': 'p',
    '\u0440': 'r',
    '\u0441': 's',
    '\u0442': 't',
    '\u0443': 'u',
    '\u0444': 'f',
    '\u0445': 'kh',
    '\u0446': 'ts',
    '\u0447': 'ch',
    '\u0448': 'sh',
    '\u0449': 'shch',
    '\u044A': '',
    '\u044B': 'y',
    '\u044C': '',
    '\u044D': 'e',
    '\u044E': 'yu',
    '\u044F': 'ya',
  };

  let transliterated = text
    .split('')
    .map((char) => map[char] ?? '')
    .join('');

  transliterated = transliterated.replace(/\s+/g, spaces_as);

  transliterated = transliterated.toLowerCase();

  return transliterated;
}
