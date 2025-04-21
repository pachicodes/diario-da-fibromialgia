export function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export function compareDates(date1, date2) {
    return new Date(date1).getTime() === new Date(date2).getTime();
}

export function getCurrentDate() {
    return new Date();
}