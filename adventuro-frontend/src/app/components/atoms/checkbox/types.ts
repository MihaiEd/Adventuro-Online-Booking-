export interface CheckboxProps {
	readonly setValue?: (value: boolean) => void;
	value: boolean;
	text?: string;
	disabled: boolean;
}
