import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngridCategoryUIProps } from './type';
import { BurgerIngridient } from '@components';

export const IngridCategoryUI = forwardRef<
  HTMLUListElement,
  TIngridCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
  <>
    <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
      {title}
    </h3>
    <ul className={styles.items} ref={ref} data-cy={title}>
      {ingredients.map((ingredient) => (
        <BurgerIngridient
          ingredient={ingredient}
          key={ingredient._id}
          count={ingredientsCounters[ingredient._id]}
        />
      ))}
    </ul>
  </>
));
