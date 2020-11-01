import React from 'react';

const StockRow = ({stockName , price, color, createdAt, onItemSelection, isSelected}) => {

    const getTwoDigitFixedValue = (price) => {
        return price.toFixed(2);
    }

    const capitalizeWords = (text) => {
        return text.toUpperCase();
    }

    return (
        <tr className={`${isSelected ? "active" : ''}`} onClick={() => onItemSelection(stockName)}>
            <td>{capitalizeWords(stockName)}</td>
            <td style={{color : `${color}`}}>{getTwoDigitFixedValue(price)}</td>
            <td >{timeSince(createdAt)}</td>
        </tr>
    );
}


function timeSince(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    const seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }
    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    if(intervalType === "seconds" && interval < 10){
        return 'A few seconds ago';
    }else{
        return formatAMPM(date);
    }
    //return interval + ' ' + intervalType + ' ago';
};

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default StockRow;