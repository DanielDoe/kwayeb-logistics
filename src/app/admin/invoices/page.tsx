import { redirect } from "next/navigation";



export default function LegacyInvoicesRedirect() {

  redirect("/admin/finance/invoices");

}


