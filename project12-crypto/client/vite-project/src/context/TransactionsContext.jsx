

import React ,{useEffect,useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress,contractABI} from '../../utils/constants'
export const TransactionContext =React.createContext();
const {ethereum} =window;
const getEthereum =() =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);
   return transactionContract;
};
export const TransactionProvider=({children})=>{
    const [currentAccount,setCurrentAccount]=useState('');
    const [formData,setFormData]=useState({addressTo:"",amount:"",keyword:"",message:""});
    const [isLoading,setIsLoading] =useState(false);
    const [transactionCount,setTransactionCount]= useState(localStorage.getItem('transactionCount'));
    const[transactions,setTransaction]=useState([]);
    const handleChange=(e,name)=>{
        setFormData((prevstate)=>({...prevstate,[name]:e.target.value}));
    };
    

    const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereum();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransaction(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };



    const checkIfWalletConnected=async()=>{
        try{
        if(!ethereum)
        return alert("Please install Metamask")
        
        const accounts = await ethereum.request({method:'eth_accounts'});
        if(accounts.length){
            setCurrentAccount(accounts[0]);
           getAllTransactions();
        }
        else{
            console.log("No Accounts Found");
        }
    }
    catch (error) {
        console.log(error);
      }
      
    };


    const checkIfTransactionsExists = async () => {
      try {
        if (ethereum) {
          const transactionsContract = getEthereum();
          const currentTransactionCount = await transactionsContract.getTransactionCount();
  
          window.localStorage.setItem("transactionCount", currentTransactionCount);
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };


    const connectWallet=async()=>{
        try{
            if(!ethereum)
            return alert("please install metamask")
        const accounts =await ethereum.request({method:'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
        window.location.reload();
        
        }
        catch(error){
            console.log(error);
            throw new Error("No ethereum")
        }
    };
    const sendTransaction =async ()=>{
        try{
            if(!ethereum)
            return alert("please install metamask")
            console.log("send transaction is working");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereum();
            const parseAmount =ethers.utils.parseEther(amount);
            
            await ethereum.request({
                method:`eth_sendTransaction`,
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:'0x5208',//21000 gwei
                    value:parseAmount._hex//0.00001
                }],
            });
        

        const transactionHash=await transactionContract.addToblockchain(addressTo,parseAmount,message,keyword);
        setIsLoading(true);
        console.log(`Loading-${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Sucess-${transactionHash.hash}`);
        setIsLoading(false);
        const transactionCount =await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber())
        window.location.reload();
    }
        catch(error){
            console.log(error);
            throw new Error("No ethereum")
        }
        
    }
    useEffect(() =>{
        checkIfWalletConnected();
        checkIfTransactionsExists();
    },[transactionCount]);

    return(
     <TransactionContext.Provider value={{connectWallet,transactions,currentAccount,formData,handleChange,sendTransaction,isLoading,transactionCount}}>
     {children}
     </TransactionContext.Provider>
    );
}
