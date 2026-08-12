export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AdminRole = 'super_admin' | 'admin' | 'viewer';
export type EnquiryStatus =
  | 'new'
  | 'reviewing'
  | 'contacted'
  | 'qualified'
  | 'not_qualified'
  | 'converted'
  | 'closed';
export type EnquiryPriority = 'low' | 'normal' | 'high' | 'urgent';
export type DeliveryStatus = 'pending' | 'delivered' | 'failed';

export type AdminProfile =
  Database['public']['Tables']['admin_profiles']['Row'];
export type EnquiryRecord = Database['public']['Tables']['enquiries']['Row'];
export type EnquiryNoteRecord =
  Database['public']['Tables']['enquiry_notes']['Row'];
export type EnquiryActivityRecord =
  Database['public']['Tables']['enquiry_activity']['Row'];
export type IntegrationDeliveryRecord =
  Database['public']['Tables']['integration_deliveries']['Row'];

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string;
          full_name: string;
          role: AdminRole;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: AdminRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: AdminRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enquiries: {
        Row: {
          id: string;
          reference_number: string;
          full_name: string;
          email: string;
          phone: string | null;
          country_code: string | null;
          company_name: string | null;
          business_type: string | null;
          service: string | null;
          message: string | null;
          source_page: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_term: string | null;
          utm_content: string | null;
          status: EnquiryStatus;
          priority: EnquiryPriority;
          assigned_to: string | null;
          submitted_at: string;
          last_contacted_at: string | null;
          archived_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          country_code?: string | null;
          company_name?: string | null;
          business_type?: string | null;
          service?: string | null;
          message?: string | null;
          source_page?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_term?: string | null;
          utm_content?: string | null;
          status?: EnquiryStatus;
          priority?: EnquiryPriority;
          assigned_to?: string | null;
          submitted_at?: string;
          last_contacted_at?: string | null;
          archived_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          country_code?: string | null;
          company_name?: string | null;
          business_type?: string | null;
          service?: string | null;
          message?: string | null;
          source_page?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_term?: string | null;
          utm_content?: string | null;
          status?: EnquiryStatus;
          priority?: EnquiryPriority;
          assigned_to?: string | null;
          submitted_at?: string;
          last_contacted_at?: string | null;
          archived_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      enquiry_notes: {
        Row: {
          id: string;
          enquiry_id: string;
          admin_id: string;
          note: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_id: string;
          admin_id: string;
          note: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          enquiry_id?: string;
          admin_id?: string;
          note?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      enquiry_activity: {
        Row: {
          id: string;
          enquiry_id: string;
          admin_id: string | null;
          action: string;
          previous_value: Json | null;
          new_value: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          enquiry_id: string;
          admin_id?: string | null;
          action: string;
          previous_value?: Json | null;
          new_value?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          enquiry_id?: string;
          admin_id?: string | null;
          action?: string;
          previous_value?: Json | null;
          new_value?: Json | null;
          created_at?: string;
        };
      };
      integration_deliveries: {
        Row: {
          id: string;
          enquiry_id: string;
          destination: string;
          status: DeliveryStatus;
          attempt_count: number;
          last_attempt_at: string;
          external_id: string | null;
          last_error_code: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          enquiry_id: string;
          destination: string;
          status?: DeliveryStatus;
          attempt_count?: number;
          last_attempt_at?: string;
          external_id?: string | null;
          last_error_code?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          enquiry_id?: string;
          destination?: string;
          status?: DeliveryStatus;
          attempt_count?: number;
          last_attempt_at?: string;
          external_id?: string | null;
          last_error_code?: string | null;
          created_at?: string;
        };
      };
    };
    Functions: {
      is_active_admin: {
        Args: { user_id: string };
        Returns: boolean;
      };
      update_enquiry_with_activity: {
        Args: {
          p_enquiry_id: string;
          p_status?: EnquiryStatus;
          p_priority?: EnquiryPriority;
          p_assigned_to?: string;
          p_admin_id?: string;
        };
        Returns: Json;
      };
      add_enquiry_note_with_activity: {
        Args: {
          p_enquiry_id: string;
          p_note: string;
          p_admin_id: string;
        };
        Returns: Json;
      };
      archive_enquiry_with_activity: {
        Args: {
          p_enquiry_id: string;
          p_archive: boolean;
          p_admin_id: string;
        };
        Returns: Json;
      };
    };
  };
}
