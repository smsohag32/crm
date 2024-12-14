export const stages = [
   { name: "Initial Application" },
   { name: "Submitted To Lender" },
   { name: "Conditional Approval" },
   { name: "Final Approval" },
   { name: "Settlement" },
   { name: "Post Settlement" },
];

export const deals = [
   {
      deal_id: "deal-1",
      lender_name: "Bank ABC",
      security_property_add: "123 Main Street, Springfield",
      deal_type: "Purchase",
      loan_amount: 500000,
      deal_stage: "stage-1", // Initial Application
      assigned_team_members: [
         { role: "Broker", name: "John Doe" },
         { role: "Credit Analyst", name: "Jane Smith" },
         { role: "Loan Processor", name: "Michael Brown" },
      ],
      deal_notes: [
         { team_member: "John Doe", note: "Initial meeting completed with the client." },
         { team_member: "Jane Smith", note: "Credit analysis in progress." },
      ],
   },
   {
      deal_id: "deal-2",
      lender_name: "Lender XYZ",
      security_property_add: "456 Elm Street, Gotham",
      deal_type: "Refinance",
      loan_amount: 300000,
      deal_stage: "stage-3", // Conditional Approval
      assigned_team_members: [
         { role: "Broker", name: "Anna Lee" },
         { role: "Loan Processor", name: "Chris Taylor" },
      ],
      deal_notes: [
         { team_member: "Anna Lee", note: "Discussed refinance options with the client." },
         { team_member: "Chris Taylor", note: "Gathering required documents." },
      ],
   },
   {
      deal_id: "deal-3",
      lender_name: "Capital One",
      security_property_add: "789 Pine Street, Metropolis",
      deal_type: "Construction",
      loan_amount: 750000,
      deal_stage: "stage-4", // Final Approval
      assigned_team_members: [{ role: "Broker", name: "Sarah Connor" }],
      deal_notes: [
         { team_member: "Sarah Connor", note: "Final documents sent to the lender for approval." },
      ],
   },
];
