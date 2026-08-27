import { SupportInbox } from "@/components/admin/admin-workspace-widgets";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";

import { SUPPORT_CONVERSATIONS, SUPPORT_MESSAGES } from "@/lib/admin/workspace-demo-data";



export default function SupportInboxPage() {

  return (

    <>

      <AdminPageIntro>
        <h1 className="text-2xl font-bold text-foreground">Support Inbox</h1>
        <p className="mt-1 text-muted">Customer conversations with shipment and payment context.</p>
      </AdminPageIntro>

      <SupportInbox conversations={SUPPORT_CONVERSATIONS} messages={SUPPORT_MESSAGES} />

    </>

  );

}


