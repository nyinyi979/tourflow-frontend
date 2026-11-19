import { pageMetadata } from "@/lib/i18n/server";
import AccountPage from "@/features/account/components/AccountPage";

export const generateMetadata = () =>
  pageMetadata("account", "accountDescription");

export default function Page() {
  return <AccountPage />;
}
