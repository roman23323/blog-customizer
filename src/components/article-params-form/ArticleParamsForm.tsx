import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { useState } from 'react';
import { Text } from '../text';
import { Spacing } from '../spacing';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

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
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	function openFormHandle() {
		setOpen((prevValue) => !prevValue);
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setArticleState( {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	}

	function onReset() {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	}

	return (
		<>
			<ArrowButton onClick={openFormHandle} isFormOpen={open} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: open,
				})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
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
					<Spacing size={50} />
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
						title={'Размер шрифта'}
					/>
					<Spacing size={50} />
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Spacing size={50} />
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
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
