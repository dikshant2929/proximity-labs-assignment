import React from 'react';
import StockRow from './StockRow';

const defaultProps = {
    header : [
        'Symbol' , 'Price' , 'Last Update'
    ]
}
const StockList = (props) => {

    const getListItemInfo = (stockItem) => {
        let color = 'green';
        const lastAddedItem = stockItem.history[stockItem.history.length - 1];
        if(stockItem.history.length >= 2){
            const secondLastAddedItem = stockItem.history[stockItem.history.length - 2];
            color = lastAddedItem.price < secondLastAddedItem.price ? 'red' : 'green';
        }
        return {
            color, 
            price : lastAddedItem.price,
            createdAt : lastAddedItem.createdAt,
            isSelected : stockItem.isSelected
        }
    }

    return (
        <div style={{'overflowX':'auto'}}>
            <table>
                <thead>
                    <tr>
                        {props.header.map((title, index) => <th key = {index}>{title}</th>)}
                    </tr>
                </thead>

                <tbody>

                    {
                        props.data && Object.keys(props.data).map(( stockName, index) => {
                            const {color, price, createdAt, isSelected} = getListItemInfo(props.data[stockName])
                            return (
                                <StockRow  
                                    isSelected = {isSelected}
                                    onItemSelection = {props.onItemSelection}
                                    key = {index}
                                    stockName = {stockName} 
                                    price = {price}
                                    color = {color}
                                    createdAt = {createdAt}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}


StockList.defaultProps = defaultProps;
export default StockList;