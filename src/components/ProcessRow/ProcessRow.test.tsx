import React from 'react';
import {fireEvent, render, waitFor} from "@testing-library/react";
import { ProcessRow } from "./ProcessRow";
import {Process} from "types";

const PROCESS: Process =  {
	name: "7za.exe",
	device: "Baratheon",
	path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
	status: "available"
};

type Props = {
	process: Process,
	isSelected: boolean,
	onSelect: (process: Process) => void,
}

const MockRowInTable = ({ process, isSelected, onSelect }: Props) => (
	<table>
		<tbody>
			<ProcessRow
				process={process}
				isSelected={isSelected}
				onSelect={onSelect}
			/>
		</tbody>
	</table>
)

describe('ProcessRow', () => {
	it("should render a process with the desired columns", () => {
		const { getByTestId, getByText } = render(
			<MockRowInTable
				process={PROCESS}
				isSelected={false}
				onSelect={() => {}}
			/>
		);

		const colName = getByTestId("col-name");
		const colDevice = getByTestId("col-device");
		const colPath = getByTestId("col-path");
		const colStatus = getByTestId("col-status");

		expect(colName).toBeInTheDocument();
		expect(colName.textContent).toEqual(PROCESS.name);
		expect(colDevice).toBeInTheDocument();
		expect(colDevice.textContent).toEqual(PROCESS.device);
		expect(colPath).toBeInTheDocument();
		expect(colPath.textContent).toEqual(PROCESS.path);
		expect(colStatus).toBeInTheDocument();
		expect(colStatus.textContent).toEqual(PROCESS.status);
	});

	it('should render a not selected process', () => {
		const { getByTestId } = render(
			<MockRowInTable
				process={PROCESS}
				isSelected={false}
				onSelect={() => {}}
			/>
		);

		const inputCol = getByTestId("col-checkbox");
		const checkboxEl = inputCol.querySelector('input[type="checkbox"]')
		expect(checkboxEl).not.toBeChecked();
	});

	it('should render a selected process', () => {
		const { getByTestId } = render(
			<MockRowInTable
				process={PROCESS}
				isSelected={true}
				onSelect={() => {}}
			/>
		);

		const inputCol = getByTestId("col-checkbox");
		const checkboxEl = inputCol.querySelector('input[type="checkbox"]')
		expect(checkboxEl).toBeChecked();
	});

	it('should call onSelect when click on checkbox', () => {
		const onSelect = jest.fn();
		const { getByTestId } = render(
			<MockRowInTable
				process={PROCESS}
				isSelected={true}
				onSelect={onSelect}
			/>
		);

		const inputCol = getByTestId("col-checkbox");
		const checkboxEl = inputCol.querySelector('input[type="checkbox"]')
		if (checkboxEl) {
			fireEvent.click(checkboxEl);
			waitFor(() => expect(onSelect).toHaveBeenCalled());
		}
	});

	it("should have checkbox disabled", () => {
		const { getByTestId } = render(
			<MockRowInTable
				process={{...PROCESS, status: "scheduled"}}
				isSelected={false}
				onSelect={() => {}}
			/>
		);

		const inputCol = getByTestId("col-checkbox");
		const checkboxEl = inputCol.querySelector('input[type="checkbox"]')
		expect(checkboxEl).toBeDisabled();
	});
})