import { useAppSelector } from "../../Hooks/useDispatch_Selector";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Content from "./Content";
import { useState } from "react";
import PriceSection from "./PriceSection/PriceSection";
import './CartPage.scss';



const CartPage = () => {
    const data = useAppSelector(state => state.BadgeSlice.cart.data);
    const [totalPrice, setTotalPrice] = useState<{ [x: string]: number }>({});
    console.log('render price Section');
    
    return (
        <>
            <Helmet>
                <title>Cart products</title>
            </Helmet>

            <Breadcrumbs />

            <h2 className="pageName">Cart</h2>

            {data.length ?

                <div className="carts">

                    <div className="cart">
                        {
                            data.map(product => (
                                <Content key={product.id} product={product} totalPrice={totalPrice} setPrice={setTotalPrice} />
                            ))
                        }
                    </div>
                    {/* Total Price  */}
                    <PriceSection totalPrice={totalPrice} />
                </div>
                :
                // if cart is empty
                <h3 className="pageEmpty">Cart list is empty</h3>
            }
        </>
    );
};

export default CartPage;