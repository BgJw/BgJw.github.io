import { useAppSelector } from "../../Hooks/useDispatch_Selector";
import { Helmet } from "react-helmet";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Content from "./Content";
import { useState } from "react";
import './CartPage.scss';
import PriceSection from "./PriceSection/PriceSection";



const CartPage = () => {
    const { data } = useAppSelector(state => state.BadgeSlice.cart);
    const [totalPrice, setTotalPrice] = useState<{ [x: string]: number }>({});
    
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
                <span className="pageEmpty">Cart list is empty</span>
            }
        </>
    );
};

export default CartPage;