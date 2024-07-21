import React from 'react'
import Select from 'react-select'
import { categoriesList } from '../data/categories.ts'

interface ICategoriesSelectProps {
	categories: string[]
	setCategories: (el: unknown) => void
}

function CategoriesSelect({
	categories,
	setCategories,
}: ICategoriesSelectProps) {
	return (
		<Select
			unstyled
			noOptionsMessage="Не указано"
			classNames={{
				menuList: () =>
					'text-gray-400 border-2 border-gray-700 rounded bg-gray-800',
				option: () =>
					'p-2 cursor-pointer hover:bg-gray-700 focus:bg-gray-700 rounded text-gray-400',
				control: () =>
					'block w-full mb-3 outline-none rounded-md py-2 px-2 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200',
				multiValue: () => 'text-white border rounded p-1.5',
				multiValueRemove: () => 'font-2xl text-red-500',
			}}
			isMulti
			options={categoriesList}
			placeholder={''}
			value={categories}
			onChange={(selected) => setCategories(selected || [])}
		/>
	)
}

export default CategoriesSelect
