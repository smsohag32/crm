
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ChartDashboard = ({ dealsData = [] }) => {
   if (!Array.isArray(dealsData) || dealsData.length === 0) {
      return <div>No data available</div>;
   }

   // Prepare data for Bar Chart
   const lenderData = dealsData.reduce((acc, deal) => {
      const lender = deal?.lender_name || 'Unknown';
      const loanAmount = parseFloat(deal?.loan_amount) || 0;
      acc[lender] = (acc[lender] || 0) + loanAmount;
      return acc;
   }, {});

   const barChartData = Object.entries(lenderData).map(([lender, amount]) => ({ lender, amount }));

   // Prepare data for Pie Chart
   const dealTypeData = dealsData.reduce((acc, deal) => {
      const dealType = deal?.deal_type || 'Other';
      acc[dealType] = (acc[dealType] || 0) + 1;
      return acc;
   }, {});

   const pieChartData = Object.entries(dealTypeData).map(([name, value]) => ({ name, value }));

   // Prepare data for Line Chart
   const lineChartData = dealsData.map(deal => ({
      id: deal?.id || "N/A",
      amount: parseFloat(deal?.loan_amount) || 0
   }));

   // Prepare data for Radar Chart
   const dealStageData = dealsData.reduce((acc, deal) => {
      const stage = deal?.deal_stage || 'Unknown';
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
   }, {});

   const radarChartData = Object.entries(dealStageData).map(([subject, A]) => ({
      subject,
      A,
      fullMark: dealsData.length || 1
   }));



   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
         <Card>
            <CardHeader>
               <CardTitle>Loan Amounts  Time</CardTitle>
            </CardHeader>
            <CardContent>
               <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                     </LineChart>
                  </ResponsiveContainer>
               </ChartContainer>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Deal Stages Distribution</CardTitle>
            </CardHeader>
            <CardContent>
               <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Deals" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                     </RadarChart>
                  </ResponsiveContainer>
               </ChartContainer>
            </CardContent>
         </Card>
      </div>
   );
};

export default ChartDashboard;
