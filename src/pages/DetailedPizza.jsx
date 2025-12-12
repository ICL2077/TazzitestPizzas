import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cartThunk } from '../redux/asyncThunks/cartThunk';

const DetailedPizza = () => {
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => ({
        cart: state.cart.cart,
    }));

    const { id } = useParams();
    const navigate = useNavigate();

    const arrOfTypes = ['традиционный', 'без корочки'];

    const [curSize, setCurSize] = React.useState(0);
    const [curType, setCurType] = React.useState(0);

    const [pizzaObj, setPizzaObj] = React.useState();
    const [cartItem, setCartItem] = React.useState();

    React.useEffect(() => {
        async function getData() {
            try {
                const pizzaResponse = await axios.get(`/api/pizzas?id=${id}`);
                await dispatch(cartThunk());

                setPizzaObj(pizzaResponse.data[0]);
            } catch (error) {
                alert(error);
                navigate('/');
            }
        }

        getData();
    }, []);

    React.useEffect(() => {
        if (pizzaObj && cart) {
            setCartItem(
                cart.find(
                    (obj) =>
                        obj.title === pizzaObj.title &&
                        obj.size === pizzaObj.sizes[curSize] &&
                        obj.type === arrOfTypes[curType],
                ),
            );
        }
    }, [curType, curSize, cart, pizzaObj]);

    const amount = cartItem ? cartItem.amount : 0;

    const handleAddingToCart = React.useCallback(async () => {
        try {
            if (cartItem) {
                const addedAmount = cartItem.amount + 1;
                await axios.patch(`/api/cart/${cartItem.id}`, { amount: addedAmount });

                await dispatch(cartThunk());
            } else {
                await axios.post(`/api/cart`, {
                    imageUrl: pizzaObj.imageUrl,
                    title: pizzaObj.title,
                    price: pizzaObj.price,
                    size: pizzaObj.sizes[curSize],
                    type: arrOfTypes[curType],
                    amount: 1,
                });

                await dispatch(cartThunk());
            }
        } catch (error) {
            alert(error);
        }
    }, [curSize, curType, pizzaObj, cartItem]);

    if (!pizzaObj) {
        return (
            <>
                <h1>Загрузка</h1>
            </>
        );
    }

    return (
        <div className="container">
            <img src={pizzaObj.imageUrl} alt="pizzaImage" />
            <div>
                <div className="pizza-block">
                    <h1 className="pizza-block__title">{pizzaObj.title}</h1>
                    <div className="pizza-block__selector">
                        <ul className="types">
                            {pizzaObj.types.map((type, index) => (
                                <li
                                    onClick={() => setCurType(index)}
                                    key={index}
                                    className={curType === index ? 'active' : ''}>
                                    {arrOfTypes[type]}
                                </li>
                            ))}
                        </ul>

                        <ul className="sizes">
                            {pizzaObj.sizes.map((size, index) => (
                                <li
                                    onClick={() => setCurSize(index)}
                                    key={index}
                                    className={curSize === index ? 'active' : ''}>
                                    {size} см.
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button onClick={handleAddingToCart} className="button button--outline button--add">
                    Добавить в конзину {amount > 0 && amount}
                </button>
            </div>
        </div>
    );
};

export default DetailedPizza;
