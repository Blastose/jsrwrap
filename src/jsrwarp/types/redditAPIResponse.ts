export type ListingResponse<T> = {
	kind: 'listing';
	data: {
		before: string | null;
		after: string | null;
		dis: number;
		modhash: string;
		geo_filter: string;
		children: TResponse<T>[];
	};
};

export type TResponse<T> = {
	kind: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
	data: T;
};

export type MoreResponse = {
	kind: 'more';
	data: {
		count: number;
		name: string;
		id: string;
		parent_id: string;
		depth: number;
		children: string[];
	};
};
