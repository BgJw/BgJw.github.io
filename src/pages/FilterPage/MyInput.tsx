import { IFilter } from "./FilterPage";

interface IProps {
    name: string,
    data: string[],
    filterOption: IFilter,
    setFilter: (value: React.SetStateAction<IFilter>) => void
};

const MyInput = ({ name, data, filterOption, setFilter }: IProps) => {

    type key = keyof typeof filterOption;

    const isCheck = (e: { target: HTMLInputElement; }, name: string) => {

        let filterName = filterOption[name as key] as string[];
        
        !e.target.checked ?
            filterName = filterName.filter(size => size !== e.target.name)
            :
            filterName.push(e.target.name);

            setFilter({
            ...filterOption,
            [name]: filterName
        });}


    return (
            <div className='input'>
                <span>
                    {name}:
                </span>
                {data.map((el) => (
                    <label
                        key={el}
                        className='input__label'>
                            {el}
                        <input
                            type="checkbox"
                            checked={ filterOption[name as key].includes(el)}
                            className='input__checkbox'
                            name={el}
                            onChange={(e) => { isCheck(e, name) }}
                        />
                        <span className="checkmark" />
                    </label>
                ))}

            </div>
    );
};

export default MyInput;