import { render, screen } from '@testing-library/react'
import ExpandButton from './ExpandButton'

describe('ExpandButton component', () => {
	test('Renders "Show Less" button', () => {
		// Arrange
		render(<ExpandButton isExpand/>)
		// Assert
		const rowElement = screen.getByText('Show Less')
		expect(rowElement).toBeInTheDocument()
	})

	test('Renders "Show More" button', () => {
		// Arrange
		render(<ExpandButton isExpand={false}/>)
		// Assert
		const rowElement = screen.getByText('Show More')
		expect(rowElement).toBeInTheDocument()
	})
})