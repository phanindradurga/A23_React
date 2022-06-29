export const getFormattedDate = (timestamp) => {
    var formattedTime = "NA"
    try {
        if (timestamp !== 0) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var date = new Date(timestamp);
            var month = monthNames[date.getMonth()];
            var day = date.getDay();
            var year = date.getFullYear().toString().slice(-2);
            formattedTime = day + ' ' + month + '\'' + year;
        }
    } catch (e) {

    }
    return formattedTime

}