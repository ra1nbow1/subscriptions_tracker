import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import popularServices from '../data/popularServices.ts'

interface IServicesSuggestProps {
	title: string
	setTitle: (title: string) => void
}

function ServicesSuggest({ title, setTitle }: IServicesSuggestProps) {
	const [suggestions, setSuggestions] = useState<string[]>([])

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		setSuggestions(getSuggestions(value))
	}

	const onSuggestionsClearRequested = () => {
		setSuggestions([])
	}

	const getSuggestions = (value: string) => {
		const inputValue = value.trim().toLowerCase()
		const inputLength = inputValue.length

		return inputLength === 0
			? []
			: popularServices.filter((service) =>
					service.toLowerCase().includes(inputValue),
				)
	}
	const getSuggestionValue = (suggestion: string) => suggestion

	const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>
	return (
		<Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			onSuggestionsClearRequested={onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={{
				value: title,
				onChange: (e, { newValue }) => setTitle(newValue),
				className:
					'block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200',
			}}
			theme={
				title
					? {
							container: 'relative',
							suggestionsContainer:
								(!title ? 'hidden' : '') +
								'absolute w-full z-10 bg-gray-800 border-2 border-gray-700 rounded-md mt-1',
							suggestionsList: 'list-none p-0 m-0',
							suggestion:
								'p-2 cursor-pointer hover:bg-gray-700 rounded text-gray-400',
							suggestionHighlighted: 'bg-gray-700',
							suggestionsHidden: 'hidden display-none',
						}
					: {
							display: 'none',
						}
			}
		/>
	)
}

export default ServicesSuggest
