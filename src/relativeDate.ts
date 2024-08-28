export function relativeDate(date: Date): string {
    const diff = Math.round(
        (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;

    let n: number | undefined = undefined;
    let u: string | undefined = undefined;

    const s = (n: number): string => (n === 1 ? "" : "s");

    if (diff < 30) {
        u = "just now";
    } else if (diff < minute) {
        n = diff;
        u = ` second${s(n)} ago`;
    } else if (diff < 2 * minute) {
        u = "a minute ago";
    } else if (diff < hour) {
        n = Math.floor(diff / minute);
        u = ` minute${s(n)} ago`;
    } else if (Math.floor(diff / hour) == 1) {
        u = "one hour ago";
    } else if (diff < day) {
        n = Math.floor(diff / hour);
        u = " hours ago";
    } else if (diff < day * 2) {
        u = "yesterday";
    } else if (diff < week) {
        n = week;
        u = " days ago";
    } else if (diff < month) {
        n = Math.floor(diff / week);
        u = ` week${s(n)} ago`;
    } else if (diff < year) {
        n = Math.floor(diff / month);
        u = ` month${s(n)} ago`;
    } else {
        n = Math.floor(diff / year);
        u = ` year${s(n)} ago`;
    }

    return `${n ?? ""}${u ?? ""}`;
}
