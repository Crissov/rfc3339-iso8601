                //  31  28  31  30   31   30   31   31   30   31   30   31
const month_index = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

/**
 * @param {number} year
 */
export function isLeapYear(year) {
    return (year % 4 === 0 && (year % 400 === 0 || year % 100 !== 0));
}

/**
 * @param {Date} dt
 */
export function getYearDay(dt) {
    const leap_day = dt.getUTCMonth() > 1 && isLeapYear(dt.getUTCFullYear()) ? 1 : 0;
    return month_index[dt.getUTCMonth()] + dt.getUTCDate() + leap_day;
}

/**
 * @param {Date} d
 */
export function getMonthLength (d) {
    const m = d.getUTCMonth();
    if (m === 1) return isLeapYear(d.getUTCFullYear()) ? 29 : 28;
    return [31,0,31,30,31,30,31,31,30,31,30,31][m];
}
/**
 * @param {Date} d
 */
export function getSeasonLength (d) {
    const s = getYearDay(d) - (isLeapYear(d.getUTCFullYear()) ? 81 : 80); /* TODO */
/* ISO 8601-2 / EDTF
21≈25=31     Spring - Northern Hemisphere = Autumn - Southern Hemisphere ~ 93 days
22≈26=32     Summer - Northern Hemisphere = Winter - Southern Hemisphere ~ 94 days
23≈27=29     Autumn - Northern Hemisphere = Spring - Southern Hemisphere ~ 90 days
24≈28=30     Winter - Northern Hemisphere = Summer - Southern Hemisphere ~ 89 days
*/
    if (s > 0) {
      if (s <= 93)
        return 93;
      else if (s <= 187)
        return 94;
      else if (s <= 277)
        return 90;
    }
    return 89;
}
/**
 * @param {Date} d
 */
export function getTrimesterLength (d) {
    const s = Math.floor(d.getUTCMonth() / 3);
/* ISO 8601-2 / EDTF
33     Quarter 1 (3 months in duration)
34     Quarter 2 (3 months in duration)
35     Quarter 3 (3 months in duration)
36     Quarter 4 (3 months in duration)
*/
    return [31+(isLeapYear(d.getUTCFullYear()) ? 29 : 28)+31, 30+31+30, 31+31+30, 31+30+31][s];
}
/**
 * @param {Date} d
 */
export function getQuadrimesterLength (d) {
    const s = Math.floor(d.getUTCMonth() / 4);
/* ISO 8601-2 / EDTF
37     Quadrimester 1 (4 months in duration)
38     Quadrimester 2 (4 months in duration)
39     Quadrimester 3 (4 months in duration)
*/
    return [31+(isLeapYear(d.getUTCFullYear()) ? 29 : 28)+31+30, 31+30+31+31, 30+31+30+31][s];
}
/**
 * @param {Date} d
 */
export function getSemesterLength (d) {
    const s = Math.floor(d.getUTCMonth() / 6);
/* ISO 8601-2 / EDTF
40     Semestral 1 (6 months in duration)
41     Semestral 2 (6 months in duration)
*/
    return [31+(isLeapYear(d.getUTCFullYear()) ? 29 : 28)+31+30+31+30, 31+31+30+31+30+31][s];
}

/**
 * @param {Date} d
 */
export function getLastWeekInYear (d) {
    const d2 = new Date(d);
    d2.setUTCMonth(11);
    d2.setUTCDate(31);
    return getWeek(d2);
}

/**
 * Gives ISO Week Number for a given date. Week 1 is the first week the majority of days
 * in the new year. (Also the week with 4th January and the first Thursday of the year)
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeek (dt) {
    let n, g, s;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }

    if (n < 0) {
        return 53 - int((g - s) / 5);
    }
    else if (n > 364 + s) {
        return 1;
    }
    else {
        return int(n / 7) + 1;
    }
}

/**
 * Returns the ISO Week Year for the given date. The returned year may be
 * one lower, one higher, or the same as the calendar year.
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeekYear (dt) {
    let n, g, s;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        g = (a + b) % 7;
        const d = (f + g - e) % 7;
        n = f + 3 - d;
    }

    if (n < 0) {
        return dt.getUTCFullYear() - 1;
    }
    else if (n > 364 + s) {
        return dt.getUTCFullYear() + 1;
    }
    else {
        return dt.getUTCFullYear();
    }
}

/**
 * Return the ISO Week Day for a given date with 1 being Monday, 7 being Sunday
 *
 * Algorithm from https://www.tondering.dk/claus/cal/week.php
 * Uses UTC values
 * @param {Date} dt
 */
export function getWeekDay (dt) {
    let d;

    if (dt.getUTCMonth() < 2) {
        const a = dt.getUTCFullYear() - 1;
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const e = 0;
        const f = dt.getUTCDate() - 1 + int(31 * dt.getUTCMonth());
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }
    else {
        const a = dt.getUTCFullYear();
        const b = int(a / 4) - int(a / 100) + int(a / 400);
        const c = int((a - 1) / 4) - int((a - 1) / 100) + int((a - 1) / 400);
        const s = b - c;
        const e = s + 1;
        const f = dt.getUTCDate() + int((153 * int(dt.getUTCMonth() - 2) + 2) / 5) + 58 + s;
        const g = (a + b) % 7;
        d = (f + g - e) % 7;
    }

    return d + 1;
}

function int (n) {
    return n|0;
}
