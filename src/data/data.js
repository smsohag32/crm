export const stages = [
   { id: "stage-1", name: "Stage One", clients: [1, 2] },
   { id: "stage-2", name: "Stage Two", clients: [3, 4] },
   { id: "stage-3", name: "Stage Three", clients: [] },
];

export const clients = [
   { id: 1, name: "John Doe", status: "On Hold", amount: "$200", isHold: true },
   { id: 2, name: "Jane Smith", status: "Active", amount: "$500", isHold: false },
   { id: 3, name: "Alice Johnson", status: "STALE", amount: "$150", isHold: true },
   { id: 4, name: "Bob Brown", status: "Active", amount: "$300", isHold: false },
];
