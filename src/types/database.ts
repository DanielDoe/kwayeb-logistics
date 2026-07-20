export type ShipmentStatus =
  | "processing"
  | "consolidated"
  | "in_transit"
  | "customs"
  | "out_for_delivery"
  | "delivered"
  | "delayed";

export type RequestType = "sourcing" | "shipping" | "both";
export type RequestStatus = "pending" | "reviewing" | "quoted" | "closed";

export interface Database {
  public: {
    Tables: {
      kwayeb_sourcing_requests: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          destination_country: string;
          request_type: RequestType;
          category: string | null;
          product_description: string;
          quantity: string | null;
          budget: string | null;
          additional_notes: string | null;
          status: RequestStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          destination_country: string;
          request_type: RequestType;
          category?: string | null;
          product_description: string;
          quantity?: string | null;
          budget?: string | null;
          additional_notes?: string | null;
          status?: RequestStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["kwayeb_sourcing_requests"]["Insert"]>;
        Relationships: [];
      };
      kwayeb_shipments: {
        Row: {
          id: string;
          tracking_id: string;
          status: ShipmentStatus;
          origin: string;
          destination: string;
          destination_country: string;
          freight_type: "air" | "sea" | "express" | null;
          estimated_delivery: string | null;
          customer_name: string | null;
          customer_email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tracking_id: string;
          status?: ShipmentStatus;
          origin?: string;
          destination: string;
          destination_country: string;
          freight_type?: "air" | "sea" | "express" | null;
          estimated_delivery?: string | null;
          customer_name?: string | null;
          customer_email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["kwayeb_shipments"]["Insert"]>;
        Relationships: [];
      };
      kwayeb_shipment_events: {
        Row: {
          id: string;
          shipment_id: string;
          status_label: string;
          location: string;
          event_at: string;
          sort_order: number;
          created_at: string;
          milestone_code: string | null;
          description: string | null;
          is_public: boolean | null;
        };
        Insert: {
          id?: string;
          shipment_id: string;
          status_label: string;
          location: string;
          event_at?: string;
          sort_order?: number;
          created_at?: string;
          milestone_code?: string | null;
          description?: string | null;
          is_public?: boolean | null;
        };
        Update: Partial<Database["public"]["Tables"]["kwayeb_shipment_events"]["Insert"]>;
        Relationships: [];
      };
      kwayeb_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          phone: string | null;
          whatsapp: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["kwayeb_profiles"]["Insert"]>;
        Relationships: [];
      };
      kwayeb_quote_requests: {
        Row: {
          id: string;
          quote_number: string;
          user_id: string | null;
          status: string;
          origin_country: string;
          origin_city: string | null;
          destination_country: string;
          destination_city: string | null;
          freight_method: string | null;
          contact_name: string;
          contact_email: string;
          item_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      kwayeb_estimates: {
        Row: Record<string, unknown> & { id: string; created_at: string };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      kwayeb_pickup_requests: {
        Row: Record<string, unknown> & { id: string; status: string; created_at: string };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      kwayeb_support_tickets: {
        Row: {
          id: string;
          ticket_number: string;
          subject: string;
          category: string;
          priority: string;
          status: string;
          contact_email: string;
          created_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      kwayeb_invoices: {
        Row: Record<string, unknown> & { id: string; invoice_number: string; status: string; created_at: string };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type ShipmentWithEvents = Database["public"]["Tables"]["kwayeb_shipments"]["Row"] & {
  events: Database["public"]["Tables"]["kwayeb_shipment_events"]["Row"][];
};
