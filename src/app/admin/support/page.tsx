import { SupportInbox } from "@/components/admin/admin-workspace-widgets";

import { SUPPORT_CONVERSATIONS, SUPPORT_MESSAGES } from "@/lib/admin/workspace-demo-data";



export default function SupportInboxPage() {

  return (

    <>

      <div className="mb-6">

        <p className="text-sm font-medium text-[#ff6600]">Support</p>

        <h1 className="mt-1 text-2xl font-bold text-foreground">Support Inbox</h1>

        <p className="mt-1 text-muted">Customer conversations with shipment and payment context.</p>

      </div>

      <SupportInbox conversations={SUPPORT_CONVERSATIONS} messages={SUPPORT_MESSAGES} />

    </>

  );

}


