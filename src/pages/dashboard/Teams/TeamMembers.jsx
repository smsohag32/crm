import Empty from "@/components/Empty/Empty"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamMembers({ members }) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-des">Team Members  ({members?.length || 0})</CardTitle>
         </CardHeader>
         <CardContent>
            {members?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {members?.map((memberId) => (
                  <div key={memberId} className="flex items-start space-x-4">
                     <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=Member${memberId}`} />
                        <AvatarFallback>M{memberId}</AvatarFallback>
                     </Avatar>
                     <div>
                        <p className="text-[20px] text-title font-normal">Member {memberId}</p>
                        <p className="text-sm text-muted-foreground">+8805955455</p>
                     </div>
                  </div>
               ))}
            </div> : <Empty message={"No data found."} />}
         </CardContent>
      </Card>
   )
}

