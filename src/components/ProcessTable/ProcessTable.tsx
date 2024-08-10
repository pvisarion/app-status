import React, { useState, useMemo } from "react";
import { Process } from "types";
import { ProcessRow, SummaryArea } from "components";
import "./ProcessTable.scss";

type Props = {
	data: Process[]
};

export const ProcessTable = ({ data }: Props) => {
	const [selectedItems, setSelectedItems] = useState<Process[]>([]);
	const selectableItems = useMemo(() => data.filter(item => item.status === 'available'), [data]);
	const isAllSelected = selectedItems.length === selectableItems.length && selectableItems.length > 0;
	const isSomeSelected = selectedItems.length > 0 && selectedItems.length < selectableItems.length;

	const isItemSelected = (item: Process) =>
		selectedItems.some((element) => element.name === item.name);

	const addItem = (item: Process) =>
		setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);

	const removeItem = (item: Process) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.filter((element) => element.name !== item.name)
		);
	};

	const onSelect = (item: Process) => isItemSelected(item) ? removeItem(item) : addItem(item);

	const onSelectAll = () => {
		if (selectedItems.length === selectableItems.length) {
			setSelectedItems([]);
		} else{
			setSelectedItems(selectableItems)
		}
	}

	const onDownloadSelection = () => {
		if (selectedItems.length === 0) return;
		const details = selectedItems.map((item) => (`${item.device} - ${item.path}`)).join('\r\n');
		alert(`Selected items: \r\n${details}`);
	};

	return (
		<div className="process-table-container">
			<SummaryArea
				isChecked={isAllSelected}
				isIndeterminated={isSomeSelected}
				onCheck={onSelectAll}
				onDownload={onDownloadSelection}
				isSelectDisabled={selectableItems.length === 0}
				isDownloadDisabled={selectedItems.length === 0}
				label={selectedItems.length > 0 ? `Selected ${selectedItems.length}` : "None selected"}
			/>

			<table className="process-table" aria-label="process table">
				<thead className="thead">
					<tr>
						<th scope="col" className="col-checkbox"></th>
						<th scope="col" className="col-name">Name</th>
						<th scope="col" className="col-device">Device</th>
						<th scope="col" className="col-path">Path</th>
						<th scope="col" className="col-status">Status</th>
					</tr>
				</thead>

				<tbody className="tbody">
				{data.map((process) => (
					<ProcessRow
						key={process.name}
						process={process}
						isSelected={isItemSelected(process)}
						onSelect={onSelect}
					/>
				))}
				</tbody>
			</table>
		</div>
	);
}