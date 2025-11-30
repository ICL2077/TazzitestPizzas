import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCartItem } from '../redux/slices/cartSlice';
import axios from 'axios';

const DetailedPizza = () => {
    const { id } = useParams();

    const arrOfTypes = ['традиционный', 'без корочки'];

    const [curSize, setCurSize] = React.useState(0);
    const [curType, setCurType] = React.useState(0);

    const [pizzaObj, setPizzaObj] = React.useState();
    const [cart, setCart] = React.useState();
    const [cartItem, setCartItem] = React.useState();

    React.useEffect(() => {
        async function getData() {
            try {
                const pizzaResponse = await axios.get(`/api/pizzas?id=${id}`);
                const cartResponse = await axios.get('/api/cart');

                setCart(cartResponse.data);
                setPizzaObj(pizzaResponse.data[0]);
            } catch (error) {
                alert(error);
            }
        }

        getData();
    }, []);

    React.useEffect(() => {
        if (pizzaObj && cart) {
            async function getData() {
                try {
                    setCartItem(
                        cart.find(
                            (obj) =>
                                obj.title === pizzaObj.title &&
                                obj.size === pizzaObj.sizes[curSize] &&
                                obj.type === arrOfTypes[curType],
                        ),
                    );
                } catch (error) {
                    alert(error);
                }
            }

            getData();
        }
    }, [curType, curSize, cart, pizzaObj]);

    const amount = cartItem ? cartItem.amount : 0;

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

                <button className="button button--outline button--add">
                    Добавить в конзину {amount > 0 && amount}
                </button>
            </div>
        </div>
    );
};

export default DetailedPizza;
