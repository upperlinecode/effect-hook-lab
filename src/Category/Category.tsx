import { CardType } from '../utils';
import Card from '../Card/Card';
import "./Category.css"


function Category(props: { name: string, cards: [CardType] }) {
    return (
        <div className="Category">
            <div className="title-card">
                <h3 className="category-title">{/* CATEGORY NAME HERE*/}</h3>
            </div>
            {/* ADD CARDS HERE */}
        </div>
    )
}


export default Category