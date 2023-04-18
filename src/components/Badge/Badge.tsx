import './Badge.scss';

interface IProps {
    amount: number
}

const Badge = ({amount}: IProps) => {
    return (
        <span className='badge'>{amount > 0 && amount}</span>
    );
};

export default Badge;