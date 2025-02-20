import React, { useState, useEffect, useContext, useCallback } from "react";
import "../public/PizzaGridMenu.css";
import Pizza from "./Pizza";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "./contexts/CartContext";

const API_URL = import.meta.env.VITE_API_URL;
const INR_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
});

const PizzaGridMenu = () => {
    const [pizzaList, setPizzaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [pizzaSizes, setPizzaSizes] = useState({});
    const [pizzaQuantities, setPizzaQuantities] = useState({});
    const { updateCart } = useContext(CartContext);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Fetch pizza types using useCallback for memoization
    const fetchPizzaTypes = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/pizzas`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Use the 'id' property from the API response directly
            const pizzaListWithCorrectIds = data.map(pizza => ({
                ...pizza,
                id: pizza.id // Use pizza.id directly
            }));
            setPizzaList(pizzaListWithCorrectIds);
        } catch (error) {
            console.error("Error fetching pizzas:", error);
            // In a real-world scenario, handle error states to inform the user.
        } finally {
            setIsLoading(false); // Ensure loading indicator is always turned off
        }
    }, []); // No external dependencies

    useEffect(() => {
        fetchPizzaTypes();
    }, [fetchPizzaTypes]);

    const handleSizeChange = (pizzaId, size) => {
        setPizzaSizes(prevSizes => ({
            ...prevSizes,
            [pizzaId]: size,
        }));
    };

    // Memoized function to update cart items for performance optimization
    const updateCartItem = useCallback(
        (pizzaId, quantity) => {
            const selectedSize = pizzaSizes[pizzaId] || 'M';
            const pizza = pizzaList.find((p) => p.id === pizzaId);

            if (!pizza || !pizza.sizes) {
                console.error("Selected pizza or sizes data missing for pizzaId:", pizzaId);
                return;
            }

            const itemPrice = pizza.sizes[selectedSize];
            const totalPrice = itemPrice * quantity;
            const formattedPrice = INR_FORMATTER.format(totalPrice);

            const cartItem = {
                pizza: pizza,
                size: selectedSize,
                quantity: quantity,
                price: totalPrice,
                formattedPrice: formattedPrice,
                name: pizza.name,
                description: pizza.description,
                image: pizza.image
            };

            updateCart(prevCart => {
                let updatedCart;
                if (quantity <= 0) {
                    updatedCart = prevCart.filter(item => !(item.pizza.id === pizzaId && item.size === selectedSize));
                } else {
                    const existingItemIndex = prevCart.findIndex(item => item.pizza.id === pizzaId && item.size === selectedSize);
                    if (existingItemIndex > -1) {
                        updatedCart = [...prevCart];
                        updatedCart[existingItemIndex] = { ...cartItem, quantity: quantity, price: totalPrice, formattedPrice: formattedPrice };
                    } else {
                        updatedCart = [...prevCart, cartItem];
                    }
                }

                // Log updated cart information to console
                console.log("Updated Cart:");
                updatedCart.forEach(item => {
                    console.log(`- Item ID: ${item.pizza.id}, Item Name: ${item.name}, Size: ${item.size}, Price: ${item.pizza.sizes[item.size]}, Quantity: ${item.quantity}, Total Price: ${item.price}`);
                });
                if (updatedCart.length === 0) {
                    console.log("- Cart is empty");
                }

                return updatedCart;
            });
        },
        [pizzaList, pizzaSizes, updateCart]
    );

    // Use useEffect to call updateCartItem when pizzaQuantities changes
    useEffect(() => {
        Object.keys(pizzaQuantities).forEach(pizzaIdStr => {
            const pizzaId = pizzaIdStr; // No need to parse to int, use string id
            if (pizzaId) { // Check if pizzaId is valid
                updateCartItem(pizzaId, pizzaQuantities[pizzaIdStr]);
            } else {
                console.warn("Invalid pizzaId in pizzaQuantities:", pizzaIdStr); // Warn about invalid pizzaId
            }
        });
    }, [pizzaQuantities, updateCartItem]); // Depend on pizzaQuantities and memoized updateCartItem

    const handleIncrement = (pizzaId) => {
        setPizzaQuantities(prevQuantities => ({
            ...prevQuantities,
            [pizzaId]: (prevQuantities[pizzaId] || 0) + 1,
        }));
    };

    const handleDecrement = (pizzaId) => {
        setPizzaQuantities(prevQuantities => {
            const currentQuantity = prevQuantities[pizzaId] || 0;
            return {
                ...prevQuantities,
                [pizzaId]: Math.max(0, currentQuantity - 1),
            };
        });
    };

    const toggleDescription = (pizzaId) => {
        setExpandedDescriptions(prevState => ({
            ...prevState,
            [pizzaId]: !prevState[pizzaId]
        }));
    };

    return (
        <div className="pizza-grid-menu-page">
            <h2>Pizza Menu</h2>
            {isLoading ? (
                <p>Loading pizzas...</p>
            ) : (
                <div className="pizza-grid">
                    {pizzaList.map((pizza) => {
                        const quantity = pizzaQuantities[pizza.id] || 0;
                        const isExpanded = expandedDescriptions[pizza.id] || false;
                        const descriptionToShow = isExpanded ? pizza.description : pizza.description;
                        const shouldTruncate = !isExpanded;

                        return (
                            <div key={pizza.id} className="pizza-grid-item">
                                <div className="pizza-image-container">
                                    <img src={pizza.image || "https://picsum.photos/200"} alt={pizza.name} className="pizza-image" />
                                </div>
                                <div className="pizza-details">
                                    <h3 className="pizza-title">{pizza.name}</h3>
                                    <div className="pizza-description-container">
                                        <p className={`pizza-description ${shouldTruncate ? 'truncated' : ''}`}>
                                            {descriptionToShow}
                                        </p>
                                        {shouldTruncate && pizza.description.length > 40 && (
                                            <button className="read-more-link" onClick={() => toggleDescription(pizza.id)}>
                                                Read More
                                            </button>
                                        )}
                                        {isExpanded && (
                                            <button className="read-more-link" onClick={() => toggleDescription(pizza.id)}>
                                                Read Less
                                            </button>
                                        )}
                                    </div>
                                    <div className="actions-row">
                                        <div className="size-selection">
                                            <label htmlFor={`size-select-${pizza.id}`}>Size:</label>
                                            <select
                                                id={`size-select-${pizza.id}`}
                                                className="size-dropdown"
                                                value={pizzaSizes[pizza.id] || 'M'}
                                                onChange={(e) => handleSizeChange(pizza.id, e.target.value)}
                                            >
                                                <option value="S">Small</option>
                                                <option value="M">Medium</option>
                                                <option value="L">Large</option>
                                            </select>
                                        </div>
                                        <div className="quantity-control">
                                            <div className="quantity-buttons">
                                                <button className="quantity-button" onClick={() => handleDecrement(pizza.id)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className="item-quantity">{quantity}</span>
                                                <button className="quantity-button" onClick={() => handleIncrement(pizza.id)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedPizza && (
                <div className="selected-pizza-preview">
                    <h3>Selected Pizza Preview:</h3>
                    <Pizza {...selectedPizza} />
                </div>
            )}
        </div>
    );
};

export default PizzaGridMenu;