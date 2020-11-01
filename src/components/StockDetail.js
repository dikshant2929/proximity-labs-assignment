import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const capitalizeWords = (text) => {
    return text.toUpperCase();
}

const StockDetail = (props) => {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        const data = {};
        props.data && Object.keys(props.data).forEach((stockName) => {
            const { isSelected } = props.data[stockName];
            if(isSelected){
                const { history } = props.data[stockName];
                data[stockName] = history;
            }
        });
        setData(data);
    },[props]);

    const getToFixedValue = (value) => value.toFixed(2);

    const getMapData = (array) => {
        const data = {
            labels : [],
            datasets : [],
            options: {
                legend: {
                    display: false
                }
            }
        }
        const datasets = {
            label: 'Lastest 50 records', 
            fill: true,
            backgroundColor: 'rgba(0,103,184,.05)',
            borderColor: 'rgba(0,103,184,1)',
            borderWidth: 3,
            data : []
        };
        const prices = [];
        array.forEach(({price, createdAt}) => {
            prices.push(price);
            data.labels.push(formatAMPM(new Date(createdAt)));
            datasets.data.push(Number(price.toFixed(2)))
        });
        const min = getToFixedValue(Math.min(...prices));
        const max = getToFixedValue(Math.max(...prices));
        //datasets.label = capitalizeWords(name) +` (Low: ${min} | High: ${max})`;
        data.datasets.push(datasets);
        return { data, min, max };
    }
    

    return (
        <div className="stock-detail">
            {data && (Object.keys(data).length > 0) &&Object.keys(data).map(( stockName, index) => {
                const history = data[stockName];
                const {data : mapData, min, max} = getMapData(history);
                const { price } = history[history.length - 1];
                const currentPrice = getToFixedValue(price);
                const currentValueStyle = (currentPrice === min) ? 'red-font' : ((currentPrice === max) ? 'green-font' : "blue-font");

                return (
                    <div className="container" key = {index}>
                        <div className="title-bar">
                            <h1 className="blue-font block">{capitalizeWords(stockName)}</h1>
                            <div className="mb-10 mt-24">
                                <span className={currentValueStyle}> Current: {currentPrice}</span>
                                <span className="red-font"> Low: {min}</span>
                                <span className="green-font"> High: {max}</span>
                            </div>
                        </div>
                        <Line
                            data={mapData}
                            width={500}
                            height={300}  
                        />
                    </div>
                );
                
            })}
        </div>
    );
}

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    const strTime = hours + ':' + minutes + ":"+seconds + ' ' + ampm;
    return strTime;
}
export default StockDetail;