import React from 'react';
import { Name } from '../../types/Types';
import { useAppDispatch, useAppSelector } from '../../Hooks/useDispatch_Selector';
import { changeActiveFilter } from '../../Slices/ProductSlice';

interface IProps {
    name: Name
}

const FilterButton = ({name}: IProps) => {
    const dispatch = useAppDispatch();
    const activeFilter = useAppSelector(state => state.ProductSlice.activeFilter);

    return (
        <button
            disabled={activeFilter === name}
            onClick={() => {
                dispatch(changeActiveFilter(name))
            }}
            className={`content__filter-button ${activeFilter === name && 'active'}`}>
            {name.toUpperCase()}
        </button>
    );
};

export default FilterButton;