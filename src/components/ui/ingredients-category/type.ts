import { TIngredient } from '@utils-types';

export type TIngridCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
};
