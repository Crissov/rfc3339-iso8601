import * as isoFormats from './iso';
import * as rfcFormats from './rfc';
import * as htmlFormats from './html';
import * as edtfFormats from './edtf';

export const date = [...new Set([
    ...rfcFormats.date,
    ...isoFormats.date,
    ...htmlFormats.date,
    ...edtfFormats.date,
])].map(f => ({
    format: f,
    rfc: rfcFormats.date.includes(f),
    iso: isoFormats.date.includes(f),
    html: htmlFormats.date.includes(f),
    edtf: edtfFormats.date.includes(f),
}));

export const time = [...new Set([
    ...rfcFormats.time,
    ...isoFormats.time,
    ...htmlFormats.time,
    ...edtfFormats.time,
])].map(f => ({
    format: f,
    rfc: rfcFormats.time.includes(f),
    iso: isoFormats.time.includes(f),
    html: htmlFormats.time.includes(f),
    edtf: edtfFormats.time.includes(f),
}));

export const dateTime = [...new Set([
    ...rfcFormats.dateTime,
    ...isoFormats.dateTime,
    ...htmlFormats.dateTime,
    ...edtfFormats.dateTime,
])].map(f => ({
    format: f,
    rfc: rfcFormats.dateTime.includes(f),
    iso: isoFormats.dateTime.includes(f),
    html: htmlFormats.dateTime.includes(f),
    edtf: edtfFormats.dateTime.includes(f),
}));

export const period = [...new Set([
    ...isoFormats.period,
    ...htmlFormats.period,
    ...edtfFormats.period,
])].map(f => ({
    format: f,
    rfc: false,
    iso: isoFormats.period.includes(f),
    html: htmlFormats.period.includes(f),
    edtf: edtfFormats.period.includes(f),
}));

export const range = isoFormats.range.map(f => ({
    format: f,
    rfc: false,
    iso: isoFormats.range.includes(f),
    html: false,
    edtf: edtfFormats.range.includes(f),
}));
