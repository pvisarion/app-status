import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import { SummaryArea } from "./SummaryArea";


describe('SummaryArea', () => {
	it('should render correctly', () => {
		const label = "None Selected";
		const { getByTestId } = render(
			<SummaryArea
				isChecked={false}
				onCheck={() => {}}
				label={label}
				onDownload={() => {}}
				isDownloadDisabled={true}
				isSelectDisabled={false}
			/>
		);

		const labelEl = getByTestId("selection-label");
		const downloadEl = getByTestId("selection-download");
		expect(getByTestId("selection-container")).toBeInTheDocument();
		expect(getByTestId("main-selector")).toBeInTheDocument();
		expect(labelEl).toBeInTheDocument();
		expect(labelEl.textContent).toEqual(label);
		expect(downloadEl).toBeInTheDocument();
		expect(downloadEl.textContent).toEqual("Download Selected");
	});

	it("should be checked", () => {
		const { getByTestId } = render(
			<SummaryArea
				isChecked={true}
				onCheck={() => {}}
				label="Selected 2"
				onDownload={() => {}}
				isDownloadDisabled={false}
				isSelectDisabled={false}
			/>
		);
		const checkboxContainer = getByTestId("selection-container");
		const checkboxEl = checkboxContainer.querySelector('input[type="checkbox"]');
		expect(checkboxEl).toBeChecked();
	});

	it("should not be checked", () => {
		const { getByTestId } = render(
			<SummaryArea
				isChecked={false}
				onCheck={() => {}}
				label="None Selected"
				onDownload={() => {}}
				isDownloadDisabled={true}
				isSelectDisabled={false}
			/>
		);
		const checkboxContainer = getByTestId("selection-container");
		const checkboxEl = checkboxContainer.querySelector('input[type="checkbox"]');
		expect(checkboxEl).not.toBeChecked();
	});

	it("should call onSelect when check/uncheck", () => {
		const onCheck = jest.fn();
		const { getByTestId } = render(
			<SummaryArea
				isChecked={true}
				onCheck={onCheck}
				label="Selected 2"
				onDownload={() => {}}
				isDownloadDisabled={false}
				isSelectDisabled={false}
			/>
		);

		const checkboxContainer = getByTestId("selection-container");
		const checkboxEl = checkboxContainer.querySelector('input[type="checkbox"]')
		if (checkboxEl) {
			fireEvent.click(checkboxEl);
			waitFor(() => expect(onCheck).toHaveBeenCalled());
		}
	});

	it("should download at click", () => {
		const onDownload = jest.fn();
		const { getByTestId } = render(
			<SummaryArea
				isChecked={true}
				onCheck={() => {}}
				label="Selected 2"
				onDownload={onDownload}
				isDownloadDisabled={false}
				isSelectDisabled={false}
			/>
		);

		const downloadEl = getByTestId("selection-download");
		if (downloadEl) {
			fireEvent.click(downloadEl);
			waitFor(() => expect(onDownload).toHaveBeenCalled());
		}
	});

	it("should have checkbox disabled", () => {
		const { getByTestId } = render(
			<SummaryArea
				isChecked={true}
				onCheck={() => {}}
				label="Selected 2"
				onDownload={() => {}}
				isDownloadDisabled={false}
				isSelectDisabled={true}
			/>
		);

		const checkboxContainer = getByTestId("selection-container");
		const checkboxEl = checkboxContainer.querySelector('input[type="checkbox"]');
		expect(checkboxEl).toBeDisabled();
	});
})