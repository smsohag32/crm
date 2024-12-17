import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamMembers({ members }) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Team Members</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {members.map((memberId) => (
                  <div key={memberId} className="flex items-center space-x-4">
                     <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=Member${memberId}`} />
                        <AvatarFallback>M{memberId}</AvatarFallback>
                     </Avatar>
                     <div>
                        <p className="text-sm font-medium">Member {memberId}</p>
                        <p className="text-sm text-muted-foreground">Role</p>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   )
}

