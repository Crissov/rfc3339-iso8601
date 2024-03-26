import { crossJoin } from "../util/crossJoin";
// https://www.loc.gov/standards/datetime/

export const date = [
    "%Y",          // L0
    "%Y-%M",       // L0
    "%Y-%M-%D",    // L0
    "%Y-%O",       // unclear if support required
    "%V-W%W",      // unclear if support required
    "%V-W%W-%w",   // unclear if support required
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
  "%V-W%W-%w",
  "%Y-%O",
];

// Time Interval
//   L0: only support for date intervals required, no times
//   L1: start or end date may be omitted if unknown
//   L1: `..` for start or end date if unspecified
// Year
//   L1: Y-?\d*%Y letter-prefixed calendar year, without month etc.
//   L1: -%Y negative year, also with month etc.
//   L2: Y-?\d+E\d
// Significant digits
//   L2: $yearS\d
// Seasons
//   L1: 21…24 (%M)
//   L2: 21…41
// Qualification of a date (complete)
//   `?` "uncertain"
//   `~` "approximate"
//   `%` "uncertain and approximate"
//   L1: postfix at the end of the date
//   L2: postfix (before separator) for all components left of the qualifier
//   L2: prefix only for the component following
//   L2: also in intervals
// Unspecified digit(s) from the right
//  L1:
//   "%Y-XX" month
//   "%Y-XX-XX" day and month
//   "%Y-%M-XX" day
//   "%CXX" decade
//   "%C%XX" year of decade
//  L2: any digit
// Set representation
//   [2021,2022] single-choice list
//   {2021,2022} inclusive list
//   [2020..2024] {2020..2024} values between, inclusive
//   [..2024] {2020..} "on or before" or "on or after" respectively.
// Qualification
//   

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
    "%Y-%M-%DT%h:%m:%.3s+00:00",
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
