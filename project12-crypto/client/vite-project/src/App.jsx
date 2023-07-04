
import {Navbar,Welcome,Service,Footer,Transactions} from './components';

const App=() => {
return (
    
    
    <div className="min-h-screen">
       <div className="gradient-bg-welcome">
    <Navbar/>
    <Welcome/>
    </div>
    <Footer/>
    <Transactions/>
    <Service/>
     </div>
)
}

export default App
