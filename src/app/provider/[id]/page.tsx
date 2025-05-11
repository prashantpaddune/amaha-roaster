import RosterDetails from "@/components/roster-details/roster-details";
import { getRosterDetails } from "@/components/roster-details/get-roster-details";

type Props = {
    readonly params: Promise<{ id?: string; }>
}

const Page = async ({ params }: Props) => {
    const id = (await params).id ?? "";
    const rosterDetails = await getRosterDetails(id)
    return <RosterDetails rosterDetails={rosterDetails}/>
}

export default Page;