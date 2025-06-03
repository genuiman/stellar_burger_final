import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngridientUI } from '@ui';
import { TBurgerIngridientProps } from './type';
import { useDispatch } from '@store';
import { addIngredient } from '@slices';

export const BurgerIngridient: FC<TBurgerIngridientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngridientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
