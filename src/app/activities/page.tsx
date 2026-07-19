import ActivitiesPage from "@/page/activities/ActivitiesPage";
import { getActivities } from "@/services/catalog";

export const dynamic = "force-dynamic";

export default async function Activities() {
  const activities = await getActivities({ page: 0, perPage: 100 });
  return <ActivitiesPage activities={activities.data} />;
}
