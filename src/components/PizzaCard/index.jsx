import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartThunk } from '../../redux/slices/cartThunkSlice';

export default function PizzaCard({ id, title, price, sizes, types, imageUrl }) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const arrOfTypes = ['традиционный', 'без корочки'];
    const [typeOfPizza, setTypeOfPizza] = React.useState(0);
    const [curSizeIndex, setCurSizeIndex] = React.useState(0);

    const sizeRef = React.useRef(0);
    const typeRef = React.useRef(0);

    const handleChangeSize = (index) => {
        sizeRef.current = index;
        setCurSizeIndex(index);
    };

    const handleChangeType = (index) => {
        typeRef.current = index;
        setTypeOfPizza(index);
    };

    const handleAddingToCart = React.useCallback(async () => {
        try {
            const pizzaObj = {
                id: id,
                imageUrl: imageUrl,
                title: title,
                price: price,
                size: sizes[sizeRef.current],
                type: arrOfTypes[typeRef.current],
                amount: 1,
            };

            const existingObj = cart.find(
                (obj) =>
                    obj.title === pizzaObj.title &&
                    obj.size === pizzaObj.size &&
                    obj.type === pizzaObj.type,
            );

            if (existingObj) {
                const newAmount = existingObj.amount + 1;

                await axios.patch(
                    `https://68da669423ebc87faa2fff70.mockapi.io/cart/${existingObj.id}`,
                    { amount: newAmount },
                );

                await dispatch(cartThunk());
            } else {
                await axios.post(`https://68da669423ebc87faa2fff70.mockapi.io/cart`, pizzaObj);
                await dispatch(cartThunk());
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

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
                    <span>Добавить</span>
                </div>
            </div>
        </div>
    );
}
