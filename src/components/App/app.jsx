import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './app.css';
import SeachInfo from '../SeachInfo';
import api from '../../shared/api';
import useDebounce from '../../hooks/useDebounce';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const debounceValue = useDebounce(searchQuery, 1000);

  const handleRequest = () => {
    api.search(debounceValue)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    handleRequest();
  }, [debounceValue])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err));
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      });
  }

  function handleProductLike(product) {
    const isLiked = product.likes.some(id => id === currentUser._id);
    api.changeLikeProductStatus(product._id, isLiked)
      .then((newCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === newCard._id ? newCard : cardState
        })
        setCards(newProducts);
      })
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className='content__cards'>
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App;