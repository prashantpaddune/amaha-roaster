import { Provider } from "@/components/roster/types";


type Props = {
    rosterDetails: Provider;
}

const RosterDetails = ({ rosterDetails }: Props) => {
    return (
        <h1>Roster Details{JSON.stringify(rosterDetails)}</h1>
    )
}

export default RosterDetails;