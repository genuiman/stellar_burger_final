import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-card.module.css';

import { OrderCardUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ OrderInformation, maxIngredients, locationState }) => (
    <Link
      to={OrderInformation.number.toString()}
      relative='path'
      state={locationState}
      className={`p-6 mb-4 mr-2 ${styles.order}`}
    >
      <div className={styles.order_info}>
        <span className={`text text_type_digits-default ${styles.number}`}>
          #{String(OrderInformation.number).padStart(6, '0')}
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={OrderInformation.date} />
        </span>
      </div>
      <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
        {OrderInformation.name}
      </h4>
      {location.pathname === '/profile/orders' && (
        <OrderStatus status={OrderInformation.status} />
      )}
      <div className={`pt-6 ${styles.order_content}`}>
        <ul className={styles.ingredients}>
          {OrderInformation.ingredientsToShow.map((ingredient, index) => {
            let zIndex = maxIngredients - index;
            let right = 20 * index;
            return (
              <li
                className={styles.img_wrap}
                style={{ zIndex: zIndex, right: right }}
                key={index}
              >
                <img
                  style={{
                    opacity:
                      OrderInformation.remains && maxIngredients === index + 1
                        ? '0.5'
                        : '1'
                  }}
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {maxIngredients === index + 1 ? (
                  <span
                    className={`text text_type_digits-default ${styles.remains}`}
                  >
                    {OrderInformation.remains > 0
                      ? `+${OrderInformation.remains}`
                      : null}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div>
          <span
            className={`text text_type_digits-default pr-1 ${styles.order_total}`}
          >
            {OrderInformation.total}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  )
);
