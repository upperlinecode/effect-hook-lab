import { useState } from 'react';
import './Card.css';
import { CardType } from '../utils';

export default function Card(props: { data: CardType }) {
    const [showing, setShowing] = useState("front")
    const [clickable, setClickable] = useState(true)


    const handleClick = () => {
        if (clickable) {
            setShowing("back")
        }
    }

    return (
        <div className="Card" >
            <div className={`card-front ${showing === "back" ? "hidden" : ""}`} onClick={handleClick}>
                <p className="card-value">{/* CARD VALUE HERE */}</p>
            </div>
            <div className={`card-back ${showing === "front" ? "hidden" : ""}`}>
                <p className="card-question">{/* CARD QUESTION HERE */}</p>
            </div>
        </div>
    )

}
