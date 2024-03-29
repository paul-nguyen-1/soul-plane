// Function below copied with small changes from dev.to post:
// Source URL: https://dev.to/kevinluo201/set-value-of-datetime-local-input-field-3435
// Date: 3/8/24
export function convertToSQLDateTime(dateString: string) {
    const date = new Date(dateString)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const dateTimeString = `${year}/${month}/${day} ${hours}:${minutes}:00`

    return dateTimeString
}
