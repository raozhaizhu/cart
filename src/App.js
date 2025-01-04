import './App.css';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Modal from './components/Modal';

function App() {
    return (
        <div className='app'>
            <ProductPage />
            <Cart />
            <Modal />
        </div>
    );
}

export default App;
