export type ReportProps<T> = {
    value: string; 
    onChange: (v: string) => void; 
    onSelect: (item: T) => void;
    getItemUrl: (item: T) => string;
    placeholder?: string;
    minLength?: number;
    debounceMS?: number;    
    maxItems?: number; 
}