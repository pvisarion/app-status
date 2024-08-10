import React, { memo, useCallback } from "react";
import { Process } from "types";
import "./ProcessFlexRow.scss"

type Props = {
	process: Process,
	isSelected: boolean,
	onSelect: (process: Process) => void,
}

export const ProcessFlexRow = memo(
	function ProcessFlexRow({ process, isSelected, onSelect }: Props) {
		const onKeyDown = useCallback((event: { key: string; preventDefault: () => void; }) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				onSelect(process);
			}
		}, [onSelect, process]);

		return (
			<div className="process-row">
				<div className="checkbox-col">
					<input
						type="checkbox"
						disabled={process.status !== 'available'}
						checked={isSelected}
						onChange={() => onSelect(process)}
						onKeyDown={onKeyDown}
						aria-disabled={process.status !== 'available'}
						aria-label={`select process ${process.name}`}
					/>
				</div>
				<div className="name-col">{process.name}</div>
				<div className="device-col">{process.device}</div>
				<div className="path-col">{process.path}</div>
				<div className="status-col">{process.status}</div>
			</div>
		);
	}
);