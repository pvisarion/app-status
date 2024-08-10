import React, {memo, useCallback} from "react";
import { Process } from "types";
import "./ProcessRow.scss";

type Props = {
	process: Process,
	isSelected: boolean,
	onSelect: (process: Process) => void,
}

export const ProcessRow = memo(
	function ProcessRow({ process, isSelected, onSelect }: Props) {
		const onKeyDown = useCallback((event: { key: string; preventDefault: () => void; }) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				onSelect(process);
			}
		}, [onSelect, process]);

		return (
			<tr
				className={`table-row ${isSelected ? "selected" : ""}`}
				data-testid="process-row"
			>
				<td className="col-checkbox" data-testid="col-checkbox">
					<input
						type="checkbox"
						disabled={process.status !== 'available'}
						checked={isSelected}
						onChange={() => onSelect(process)}
						onKeyDown={onKeyDown}
						aria-disabled={process.status !== 'available'}
						aria-label={`select process ${process.name}`}
					/>
				</td>
				<td className="col-name" data-testid="col-name">
					{process.name}
				</td>
				<td className="col-device" data-testid="col-device">
					{process.device}
				</td>
				<td className="col-path" data-testid="col-path">
					<div className="path-label">
						{process.path}
					</div>
				</td>
				<td className="col-status" data-testid="col-status">
					<div className="status-container">
						<div className="status-label">{process.status}</div>
						{process.status === 'available' && (
							<div className="status-icon">
								<div className="available-icon"></div>
							</div>
						)}
					</div>
				</td>
			</tr>
		);
	},
	function (oldProps, newProps) {
		return (
			oldProps.process.name === newProps.process.name &&
			oldProps.process.status === newProps.process.status &&
			oldProps.isSelected === newProps.isSelected
		);
	}
);