import React,{useContext} from 'react';
import { TransactionContext } from '../context/TransactionsContext';
import dummyData from '../../utils/dummyData'
import { shortenAddress } from '../../utils/shortendAddress';
const TransactionCard=({addressTo,addressFrom,timestamp,message,keyword,amount})=>{
return 'transactions';}

const transactions =()=>{
    const {currentAccount} =useContext(TransactionContext);
    return(
        <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py -12 px-4'>
           
            {currentAccount?(
                <h3 className="text-white text-3xl text-center my-2">latest Transactions</h3>

            ):(
                <h3 className="text-white text-3xl text-center my-2">Connect your Account to see the latest  transaction</h3>
            )

            }
            <div className= "flex flex-wrap justify-center items-center mt-10">
                {dummyData.reverse().map((transaction,i)=>{
                    <TransactionCard key={i} {...transaction}/>
                })}
            </div>
            </div>
        </div>
       
    )
}
export default transactions;