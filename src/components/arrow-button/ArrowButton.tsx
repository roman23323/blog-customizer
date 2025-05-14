import { useState, FC } from 'react';
import clsx from 'clsx';
import arrow from '../../images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export interface ArrowButtonProps {
	onClick: OnClick;
	isFormOpen: boolean;
}

export const ArrowButton: FC<ArrowButtonProps> = (props) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			props.onClick();
		}
	};

	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			onClick={props.onClick}
			onKeyDown={handleKeyDown}
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: props.isFormOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: props.isFormOpen,
				})}
			/>
		</div>
	);
};
