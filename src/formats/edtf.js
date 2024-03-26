import { crossJoin } from "../util/crossJoin";
// https://www.loc.gov/standards/datetime/

export const date = [
    "%Y",          // L0
    "%Y-%M",       // L0: 01…12; L1: 21…24, L2: 21…41
    "%Y-%M-%D",    // L0
    "-%Y",         // L1
    "-%Y-%M",      // L1
    "-%Y-%M-%D",   // L1
];

export const year = [
    "%Y",          // L0
    "-%Y",         // L1
    // letter-prefixed calendar year, without month etc.
    "Y%Y",         // L1
    "Y-%Y",        // L1
    "Y%CE2",       // L1
    "Y-%CE2",      // L1
    "Y%C%XE1",     // L1
    "Y-%C%XE1",    // L1
    "Y\d+E\d",     // L1
    "Y-\d+E\d",    // L1
    // significant digits
    "%YS1",        // L2
    "-%YS1",       // L2
    "%YS2",        // L2
    "-%YS2",       // L2
    "%YS3",        // L2
    "-%YS3",       // L2
    "Y%YS1",       // L2
    "Y-%YS1",      // L2
    "Y%CE2S1",     // L2
    "Y-%CE2S1",    // L2
];
export const season = [
    // independent of location
    "%Y-21",       // L1: spring
    "%Y-22",       // L1: summer
    "%Y-23",       // L1: autumn
    "%Y-24",       // L1: winter
    // Northern Hemisphere
    "%Y-25",       // L2: Northern Spring
    "%Y-26",       // L2: Northern Summer
    "%Y-27",       // L2: Northern Autumn
    "%Y-28",       // L2: Northern Winter
    // Southern Hemisphere
    "%Y-29",       // L2: Southern Spring
    "%Y-30",       // L2: Southern Summer
    "%Y-31",       // L2: Southern Autumn
    "%Y-32",       // L2: Southern Winter
    // 3 months
    "%Y-33",       // L2: Quarter 1
    "%Y-34",       // L2: Quarter 2
    "%Y-35",       // L2: Quarter 3
    "%Y-36",       // L2: Quarter 4
    // 4 months
    "%Y-37",       // L2: Quadrimester 1
    "%Y-38",       // L2: Quadrimester 2
    "%Y-39",       // L2: Quadrimester 3
    // 6 months
    "%Y-40",       // L2: Semestral 1
    "%Y-41",       // L2: Semestral 2
];

const base_time = [
    "%h",          // L0
    "%h:%m",       // L0
    "%h:%m:%s",    // L0
];

const timezone_time = [
    ...base_time,
    ...base_time.map(f => `${f}Z`),
    ...base_time.map(f => `${f}%Z`),
    ...base_time.map(f => `${f}%Z:%z`),
];

const prefixed_time = [
    ...timezone_time,
    ...timezone_time.map(f => `T${f}`),
];

const basic_time = [
    ...prefixed_time,
    // Sample of positive 00:00 timezone
    "%h:%m:%s+00:00",
];

export const time = [...new Set(basic_time)];

const full_date = [
  "%Y-%M-%D",
];

// Time Interval
//   L0: only support for date intervals required, no times
//   L1: start or end date may be omitted if unknown
//   L1: `..` for start or end date if unspecified
// Qualification of a date (complete)
//   L1:
//     `?` "uncertain"
//     `~` "approximate"
//     `%` "uncertain and approximate"
//   L1: postfix at the end of the date
//   L2: postfix (before separator) for all components left of the qualifier
//   L2: prefix only for the component following
//   L2: also in intervals
// Unspecified digit(s) from the right
//   L1:
//     "%Y-XX" month
//     "%Y-XX-XX" day and month
//     "%Y-%M-XX" day
//     "%CXX" decade
//     "%C%XX" year of decade
//   L2: X for any digit in any component
// Set representation
//   L2:
//     [2021,2022] single-choice list
//     {2021,2022} inclusive list
//     [2020..2024] {2020..2024} values between, inclusive
//     [..2024] {2020..} "on or before" or "on or after" respectively.

export const dateTime = [
    ...crossJoin(full_date, timezone_time).map(([d, t]) => `${d}T${t}`),
    // Sample of positive timezone
    "%Y-%M-%DT%h:%m:%s+08",
    "%Y-%M-%DT%h:%m:%s+08:45",
    // Sample of negative timezone
    "%Y-%M-%DT%h-12",
    "%Y-%M-%DT%h-12:00",
    "%Y-%M-%DT%h:%m-12",
    "%Y-%M-%DT%h:%m-12:00",
    // Sample of positive 00:00 timezone
    "%Y-%M-%DT%h:%m:%s+00:00",
];

export const period = [
    "P1Y",
    "P1,5Y",
    "P1.5Y",
    "P1M",
    "P1W",
    "P1D",
    "PT1H",
    "P1H",
    "PT1M",
    "PT1S",
    "P1S",
    "PT1,5S",
    "PT1.5S",
    "P1Y1M",
    "P1Y1D",
    "P1Y1M1D",
    "P1Y1M1DT1H1M1S",
    "P1DT1H",
    "P1MT1M",
    "P1DT1M",
    "P1.5W",
    "P1,5W",
    "P1DT1.000S",
    "P1DT1.00000S",
    "P1DT1H1M1.1S",
    "P1H1M1.1S",
];

const example_periods = [
    "P1Y",
    "P1M",
    "P1D",
];

const example_dateTimes = crossJoin(full_date, ["%h","%h:%m","%h:%m:%s","%h:%mZ"]).map(([d,t]) => `${d}T${t}`);

export const range = [
  ...crossJoin(full_date, example_periods).map(([d, p]) => `${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `${d1}/${d2}`),
  ...crossJoin(example_periods, full_date).map(([p, d]) => `${p}/${d}`),

  ...crossJoin(example_dateTimes, ["P1DT1H"]).map(([d, p]) => `${d}/${p}`),
  ...crossJoin(example_dateTimes, ["P1DT1H"]).map(([d, p]) => `${p}/${d}`),

  ...crossJoin(full_date, ["P1Y"]).map(([d, p]) => `R/${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `R/${d1}/${d2}`),

  ...crossJoin(full_date, ["P1Y"]).map(([d, p]) => `R10/${d}/${p}`),
  ...crossJoin(full_date, full_date).map(([d1, d2]) => `R10/${d1}/${d2}`),
];
