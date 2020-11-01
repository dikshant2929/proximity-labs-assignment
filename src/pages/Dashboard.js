import React from 'react';
import StockList from '../components/StockList';
import StockDetail from '../components/StockDetail';
import Connection from '../connection';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            stocks : {}
        }

        this.connection = new Connection();
    }
    
    
    componentDidMount(){
        this.connection.connect(this.addNewStockValue);
    }

    componentWillUnmount(){
        this.connection.disconnect();
    }

    onItemSelection = (stockName) => {
        const { stocks } = this.state;
        Object.keys(stocks).forEach(stockName => {
            const isSelected = stocks[stockName].isSelected || false;
            if(isSelected){
                stocks[stockName].isSelected = false;
            }
        })
        const existingStockItem = stocks[stockName];
        existingStockItem.isSelected = true;
        this.setState({
            stock : existingStockItem
        })
    }

    addNewStockValue = (stock) => {

        const timestamp = Date.now();
        const { stocks : existingStocks} = this.state;

        stock.forEach(([name, price]) => {
            const _price = Number(price);
            if(existingStocks[name]){
                const existingStockItem = existingStocks[name];
                existingStockItem.price = _price;
                existingStockItem.isSelected = existingStockItem.isSelected || false;
                
                //Show Last 50 Items
                existingStockItem.history = existingStockItem.history.length > 50 ? existingStockItem.history.slice(existingStockItem.history.length - 40) : existingStockItem.history
                
                existingStockItem.history.push({ createdAt : timestamp, price : _price});
            }else{
                if(Object.keys(existingStocks).length === 0){
                    existingStocks[name] = { price : _price, history : [{ createdAt : timestamp, price : _price}], isSelected : true};
                }else{
                    existingStocks[name] = { price : _price, history : [{ createdAt : timestamp, price : _price}], isSelected : false};
                }
                
            }
        });
        this.setState({
            stocks : existingStocks
        })
    }

    render(){
        const { stocks } = this.state;
        const isStocksAvailable = Object.keys(stocks).length > 0;
        
        return (
            <div className="dashboard">
                {
                    isStocksAvailable ? 
                    <>
                        <main className="data-list">
                        {stocks && 
                            <StockList 
                                data={stocks} 
                                onItemSelection={this.onItemSelection}
                            />
                        }
                        </main>
                        <aside className="data-detail">
                            <StockDetail 
                                data={stocks} 
                            />
                        </aside>
                    </> 
                    : 
                    <center style={{'flex' : 1}}>
                        <p>Please wait while we are fetching the data from server...</p>
                    </center>
                }
                
            </div>
        );
    }
}


export default Dashboard;