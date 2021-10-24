import { format } from 'date-fns-jalali'
import jalaliday from "jalaliday";
import dayjs from "dayjs";

import { TIMES, convertFromGregorian, compare, convertFromGregorian2ndImplementation, benchmark } from "./utils.js";

if (typeof dayjs.calendar !== "function") {
    dayjs.extend(jalaliday);
}

// date-fns
const getDateFnsDates = () => TIMES.map(time => format(new Date(time), 'yyyy-MM-dd'));
// const dateFnsDates = getDateFnsDates();
// const dateFnsBench = benchmark(getDateFnsDates);

// dayjs
const getDayjsDates = () => TIMES.map(time => dayjs(new Date(time)).calendar("jalali").locale("fa").format("YYYY-MM-DD"));
// const dayjsDates = getDayjsDates();
// const dayjsBench = benchmark(getDayjsDates);

// native js
const getNativeDates = () => TIMES.map(time => convertFromGregorian2ndImplementation(new Date(time)));
const nativeDates = getNativeDates();
// const dayjsBench = benchmark(getNativeDates);

console.log(nativeDates)

// performance comparison
// const performance = compare(getNativeDates, getDateFnsDates, getDayjsDates);
// console.log(performance);

