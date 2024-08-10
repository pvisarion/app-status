import React, { memo, useEffect, useRef } from "react";
import "./SummaryArea.scss"

type Props = {
	isChecked: boolean;
	isIndeterminated?: boolean;
	onCheck: () => void;
	label: string;
	onDownload: () => void;
	isDownloadDisabled: boolean;
	isSelectDisabled: boolean;
}

export const SummaryArea = memo(
	function SummaryArea({
		isChecked,
		isIndeterminated,
		onCheck,
		label,
		onDownload,
		isDownloadDisabled,
		isSelectDisabled
	}: Props) {
		const selectAllRef = useRef<HTMLInputElement>(null)

		useEffect(() => {
			if (selectAllRef.current) {
				selectAllRef.current.indeterminate = isIndeterminated ?? false;
			}
		}, [selectAllRef, isIndeterminated])

		return (
			<div
				className="selection-container"
				data-testid="selection-container"
			>
				<div className="main-selector" data-testid="main-selector">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={onCheck}
						ref={selectAllRef}
						aria-checked={isIndeterminated ? 'mixed' : isChecked}
						aria-label="select all"
						disabled={isSelectDisabled}
					/>
				</div>
				<div className="selection-label" data-testid="selection-label">{label}</div>
				<div className="selection-download" data-testid="selection-download">
					<div
						className={`download-label ${isDownloadDisabled ? "disabled" : ""}`}
						role="presentation"
						onClick={onDownload}
					>
						<i className="fa fa-download" style={{fontSize: "20px", marginRight: "15px"}}></i>
						Download Selected
					</div>
				</div>
			</div>
		);
	}
);