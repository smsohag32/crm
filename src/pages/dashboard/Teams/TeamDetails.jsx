
import { useGetTeamQuery } from "@/redux-store/api/teamApi"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Notebook } from 'lucide-react'
import TeamHeader from './TeamHeader'
import TeamMembers from './TeamMembers'
import TeamNotes from './TeamNotes'
import { useParams } from "react-router-dom"

export default function TeamDetails() {
   const { id } = useParams()
   const { data: team, isLoading, refetch } = useGetTeamQuery(id)

   if (isLoading) {
      return <TeamDetailsSkeleton />
   }

   if (!team) {
      return <div className="flex justify-center items-center h-screen text-lg">Team not found</div>
   }

   return (
      <div className="  px-2  pt-2">
         <TeamHeader refetch={refetch} members={team?.user} name={team.name} teamId={id} />
         <Tabs defaultValue="notes" className="mt-4">
            <TabsList className="grid bg-transparent w-full grid-cols-2">
               <TabsTrigger value="notes" className="flex text-title items-center">
                  <Notebook className="mr-2 h-4 w-4" />
                  Notes
               </TabsTrigger>
               <TabsTrigger value="members" className="flex text-title items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Members
               </TabsTrigger>
            </TabsList>
            <TabsContent value="members">
               <TeamMembers members={team.user} />
            </TabsContent>
            <TabsContent value="notes">
               <TeamNotes refetch={refetch} notes={team.team_note} teamId={team.id} />
            </TabsContent>
         </Tabs>

      </div>
   )
}

function TeamDetailsSkeleton() {
   return (
      <div className="container mx-auto px-4 py-8">
         <Skeleton className="h-12 w-3/4 mb-4" />
         <Skeleton className="h-8 w-1/4 mb-8" />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
               <Skeleton key={i} className="h-24 w-full" />
            ))}
         </div>
      </div>
   )
}

