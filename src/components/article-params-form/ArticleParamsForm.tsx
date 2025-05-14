import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { useState } from 'react';
import { Text } from '../text';
import { Spacing } from '../spacing';
import { Select } from '../select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
} from '../../constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	setArticleState: (
		value: ArticleStateType | ((prev: ArticleStateType) => ArticleStateType)
	) => void;
}

/*(alias) type ArticleStateType = {
    fontFamilyOption: OptionType;
    fontColor: OptionType;
    backgroundColor: OptionType;
    contentWidth: OptionType;
    fontSizeOption: OptionType;
}*/

/*export const fontSizeOptions: OptionType[] = [
	{ title: '18px', value: '18px', className: 'font-size-18' },
	{ title: '25px', value: '25px', className: 'font-size-25' },
	{ title: '38px', value: '38px', className: 'font-size-38' },
];*/

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);

	function openFormHandle() {
		setOpen((prevValue) => !prevValue);
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setArticleState((prev) => {
			return {
				...prev,
				fontFamilyOption: fontFamily,
			};
		});
	}

	return (
		<>
			<ArrowButton onClick={openFormHandle} isFormOpen={open} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: open,
				})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text as={'p'} size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='Шрифты'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
