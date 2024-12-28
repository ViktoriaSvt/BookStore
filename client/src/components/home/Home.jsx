import SponsorshipBanner from "../home/sponsorship-banner/Sponsorship-banner";
import Reccomended from "../home/reccomended-books/Reccomended-books";
import RewardsBanner from "../home/rewards-banner/Rewards-banner";

export default function Home() {
    return (
        <>
            <RewardsBanner />
            <SponsorshipBanner />
            <Reccomended />
        </>
    )
}