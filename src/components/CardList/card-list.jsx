import Card from '../Card/card';
import './card-list.css';

const CardList = ({goods, onProductLike, currentUser}) => {
	return (
		
		<div className='cards'>
			{
				goods.map( (item) => <Card key={item._id} product={item} {...item} onProductLike={onProductLike} currentUser={currentUser}/>)
			}
		</div>
	);
};

export default CardList;