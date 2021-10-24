// config constants
const COUNTING_DAYS = 20;
const STARTING_TIME = 1635073979200;
const BENCHMARK_LOOP_COUNT = 10000;
export const TIMES = Array(COUNTING_DAYS).fill().map((_, idx) => STARTING_TIME + 86400000 * idx);

// helpers
export const areEqual = (arr1 = [], arr2 = []) => arr1.length === arr2.length && arr1.every((item, idx) => item === arr2[idx]);
export const benchmark = (fn, percision = 1, iterations = BENCHMARK_LOOP_COUNT) => {
    const results = [];
    const bench = () => {
        const t1 = new Date().getTime();
        for (let i = 0; i < iterations; i += 1){
            fn();
        }
        const t2 = new Date().getTime();
        return t2 - t1;
    }
    for (let i = 0; i < percision; i += 1){
        results.push(bench());
    }
    return Math.floor(results.reduce((sum, acc) => sum + acc, 0) / percision);
}

export const compare = (...fns) => {
    const t1 = new Date().getTime();
    const result = fns.map(fn => benchmark(fn));
    const t2 = new Date().getTime();
    console.log("duration:", Math.floor((t2 - t1) / 1000), "seconds");
    return result;
}

// number conversion helpers
const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "/"];
const enDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"];

const faToEnDict = new Map();
const enToFaDict = new Map();

faDigits.forEach((digit, idx) => { faToEnDict.set(digit, enDigits[idx]); });
enDigits.forEach((digit, idx) => { enToFaDict.set(digit, faDigits[idx]); });

export const enToFaDigits = (num) => `${num}`.split("").map(n => enToFaDict.get(n) || n).join("");
export const faToEnDigits = (num) => `${num}`.split("").map(n => faToEnDict.get(n) || n).join("");

// native js conversion
export const convertFromGregorian = (date = new Date(), convertString = false) => {
    const persianDate = date.toLocaleDateString("fa-ir", { year: "numeric", month: "2-digit", day: "2-digit" });
    return convertString ? faToEnDigits(persianDate) : persianDate;
}

// common numberingSystems: 'latn' | 'arab' | 'arabext'
const Xoptions = { year: "numeric", month: "2-digit", day: "2-digit", numberingSystem: 'latn' }
const XdateFormat = new Intl.DateTimeFormat("fa-ir", Xoptions);
// const usedOptions = XdateFormat.resolvedOptions();

export const convertFromGregorian2ndImplementation = (date = new Date()) => {
    return XdateFormat.format(date);
}
