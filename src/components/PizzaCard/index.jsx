import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartThunk } from '../../redux/asyncThunks/cartThunk';

export default function PizzaCard({ id, title, price, sizes, types, imageUrl }) {
    const dispatch = useDispatch();

    const arrOfTypes = ['традиционный', 'без корочки'];
    const [typeOfPizza, setTypeOfPizza] = React.useState(0);
    const [curSizeIndex, setCurSizeIndex] = React.useState(0);

    const cartItem = useSelector((state) =>
        state.cart.cart.find(
            (obj) =>
                obj.title === title &&
                obj.size === sizes[curSizeIndex] &&
                obj.type === arrOfTypes[typeOfPizza],
        ),
    );

    const amount = cartItem ? cartItem.amount : 0;

    const handleChangeSize = (index) => {
        setCurSizeIndex(index);
    };

    const handleChangeType = (index) => {
        setTypeOfPizza(index);
    };

    const handleAddingToCart = React.useCallback(async () => {
        try {
            const pizzaObj = {
                id: id,
                imageUrl: imageUrl,
                title: title,
                price: price,
                size: sizes[curSizeIndex],
                type: arrOfTypes[typeOfPizza],
                amount: 1,
            };

            if (cartItem) {
                const newAmount = cartItem.amount + 1;

                await axios.patch(`/api/cart/${cartItem.id}`, { amount: newAmount });

                await dispatch(cartThunk());
            } else {
                await axios.post(`/api/cart`, pizzaObj);
                await dispatch(cartThunk());
            }
        } catch (error) {
            console.log(error);
        }
    }, [curSizeIndex, typeOfPizza, cartItem]);

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type, index) => (
                        <li
                            key={type}
                            className={typeOfPizza === index ? 'active' : ''}
                            onClick={() => handleChangeType(index)}>
                            {arrOfTypes[type]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, index) => (
                        <li
                            key={size}
                            className={curSizeIndex === index ? 'active' : ''}
                            onClick={() => handleChangeSize(index)}>
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div onClick={handleAddingToCart} className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить {amount > 0 && amount}</span>
                </div>
            </div>
        </div>
    );
}
