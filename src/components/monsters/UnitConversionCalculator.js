export const calculateMod = stat => Math.floor((stat - 10) / 2);

export const calculateModStr = stat => numberToString(calculateMod(stat));

export const numberToString = number => {
    let numbStr = number.toString();
    if(numbStr.indexOf('-') < 0) {
        numbStr = `+${numbStr}`;
    }
    return numbStr;
}

export const calculateCR = xp => xpToCR[xp];

export const xpToCR = {
    0: '0',
    25: '1/8',
    50: '1/4',
    100: '1/2',
    200: '1',
    450: '2',
    700: '3',
    1100: '4',
    1800: '5',
    2300: '6',
    2900: '7',
    3900: '8',
    5000: '9',
    5900: '10',
    7200: '11',
    8400: '12',
    10000: '13',
    11500: '14',
    13000: '15',
    15000: '16',
    18000: '17',
    20000: '18',
    22000: '19',
    25000: '20',
    33000: '21',
    41000: '22',
    50000: '23',
    62000: '24',
    75000: '25',
    90000: '26',
    105000: '27',
    120000: '28',
    135000: '29',
    155000: '30',
}