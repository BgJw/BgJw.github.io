import { useAppSelector } from '../../Hooks/useDispatch_Selector';
import { sizes } from '../../services/ClothesService';
import './Sizes.scss';

interface IProps {
    setSize: React.Dispatch<React.SetStateAction<string[]>>,
    size: string[],
    product: string
}
const Sizes = ({ setSize, size, product }: IProps) => {
    const { data } = useAppSelector(state => state.BadgeSlice.cart);

    const isCheckSize = (size: string) => {
        if (setSize) {
            setSize(prev => {
                if (!prev.includes(size)) {
                    return [...prev, size]
                } else {
                    return prev.length > 1 ? prev.filter(el => el !== size) : prev
                }
            })
        }
    };




    return (
        <div className="sizes">
            {data.find(el => el.id === product) ?
                ''
                :
                sizes.map(el => (
                    <button
                        className={ size.includes(el) ? 'active' : ''}
                        onClick={() => isCheckSize(el)}
                        key={el}
                    >
                        {el}
                    </button>
                ))

            }
        </div>
    );
};

export default Sizes;