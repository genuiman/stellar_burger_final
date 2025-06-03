import { forwardRef, useMemo } from 'react';
import { TIngridCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngridCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '@store';
import { getConstructorSelector } from '@slices';

export const IngridCategory = forwardRef<
  HTMLUListElement,
  TIngridCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const BurgerConstructor = useSelector(
    getConstructorSelector
  ).constructorItems;

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = BurgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [BurgerConstructor]);

  return (
    <IngridCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
