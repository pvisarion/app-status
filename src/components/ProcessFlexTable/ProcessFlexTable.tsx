import React, { useMemo, useState } from "react";
import { Process } from "types";
import { SummaryArea, ProcessFlexRow } from "components";
import "./ProcessFlexTable.scss";

type Props = {
	data: Process[]
};

export const ProcessFlexTable  = ({ data }: Props) => {
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
		<div className="process-flex-container">
			<SummaryArea
				isChecked={isAllSelected}
				isIndeterminated={isSomeSelected}
				onCheck={onSelectAll}
				onDownload={onDownloadSelection}
				isSelectDisabled={selectableItems.length === 0}
				isDownloadDisabled={selectedItems.length === 0}
				label={selectedItems.length > 0 ? `Selected ${selectedItems.length}` : "None selected"}
			/>

			<div className="process-table">
				<div className="process-row table-header">
					<div className="checkbox-col"></div>
					<div className="name-col">Name</div>
					<div className="device-col">Device</div>
					<div className="path-col">Path</div>
					<div className="status-col">Status</div>
				</div>

				<div className="table-body">
					{data.map((process) => (
						<ProcessFlexRow
							key={process.name}
							process={process}
							isSelected={isItemSelected(process)}
							onSelect={onSelect}
						/>
					))}
				</div>
			</div>
		</div>
	);
}