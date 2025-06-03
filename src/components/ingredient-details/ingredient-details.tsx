import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngridDetailUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { getIngrSelector } from '@slices';
import { useParams } from 'react-router-dom';

export const IngridDetail: FC = () => {
  const ingridientId = useParams().id;

  const ingredients = useSelector(getIngrSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingridientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngridDetailUI ingredientData={ingredientData} />;
};
