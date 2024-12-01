import { useState } from 'react';
import './Dropdown.scss';


interface IProps {
    size: string[] | undefined,
    setDisabledCounter: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveSize: React.Dispatch<React.SetStateAction<string>>,
    activeSize: string
}

const Dropdown = ({size, setDisabledCounter, setActiveSize, activeSize}: IProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="dropdown">
            <button
                className={show ?
                    "dropdown-bttn active" :
                    "dropdown-bttn"}
                onClick={() => setShow(!show)}
            >
                {activeSize ? activeSize: 'Size'}
                {show ?
                    <> &#8679;</>
                    :
                    <> &#8681;</>
                }
            </button>
            {
                show &&
                <div className="dropdown-content">
                    {
                        size?.map(size => (
                            <button
                                key={size} 
                                className="dropdown-content-bttn"
                                onClick={ () => {
                                    setDisabledCounter(false);
                                    setActiveSize(size);
                                    setShow(!show)
                                }}
                            >
                                {size}
                            </button>
                        ))
                    }
                </div>
            }


        </div>
    );
};

export default Dropdown;