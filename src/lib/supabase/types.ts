export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';
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

export type BlogPostRecord = Database['public']['Tables']['blog_posts']['Row'];
export type ServiceRecord = Database['public']['Tables']['services']['Row'];
export type TeamMemberRecord =
  Database['public']['Tables']['team_members']['Row'];
export type WebsiteSettingRecord =
  Database['public']['Tables']['website_settings']['Row'];

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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image_url: string;
          featured_image_alt: string;
          category: string;
          tags: string[];
          author_name: string;
          status: 'draft' | 'published';
          is_featured: boolean;
          featured_position: 'left' | 'right' | null;
          published_at: string | null;
          seo_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image_url: string;
          featured_image_alt?: string;
          category: string;
          tags?: string[];
          author_name: string;
          status?: 'draft' | 'published';
          is_featured?: boolean;
          featured_position?: 'left' | 'right' | null;
          published_at?: string | null;
          seo_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          featured_image_url?: string;
          featured_image_alt?: string;
          category?: string;
          tags?: string[];
          author_name?: string;
          status?: 'draft' | 'published';
          is_featured?: boolean;
          featured_position?: 'left' | 'right' | null;
          published_at?: string | null;
          seo_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          short_description: string;
          hero_title: string;
          hero_description: string;
          hero_image_url: string | null;
          icon_url: string | null;
          content_blocks: Json;
          cta_label: string;
          cta_url: string;
          seo_title: string | null;
          meta_description: string | null;
          status: 'draft' | 'published';
          show_in_navigation: boolean;
          show_on_homepage: boolean;
          display_order: number;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          short_description: string;
          hero_title: string;
          hero_description: string;
          hero_image_url?: string | null;
          icon_url?: string | null;
          content_blocks?: Json;
          cta_label?: string;
          cta_url?: string;
          seo_title?: string | null;
          meta_description?: string | null;
          status?: 'draft' | 'published';
          show_in_navigation?: boolean;
          show_on_homepage?: boolean;
          display_order?: number;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          short_description?: string;
          hero_title?: string;
          hero_description?: string;
          hero_image_url?: string | null;
          icon_url?: string | null;
          content_blocks?: Json;
          cta_label?: string;
          cta_url?: string;
          seo_title?: string | null;
          meta_description?: string | null;
          status?: 'draft' | 'published';
          show_in_navigation?: boolean;
          show_on_homepage?: boolean;
          display_order?: number;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          full_name: string;
          job_title: string;
          profile_image_url: string | null;
          image_alt: string;
          bio: string | null;
          email: string | null;
          phone: string | null;
          linkedin_url: string | null;
          social_url: string | null;
          show_email_publicly: boolean;
          show_phone_publicly: boolean;
          is_visible: boolean;
          display_order: number;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
          archived_at: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          job_title: string;
          profile_image_url?: string | null;
          image_alt?: string;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
          social_url?: string | null;
          show_email_publicly?: boolean;
          show_phone_publicly?: boolean;
          is_visible?: boolean;
          display_order?: number;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          job_title?: string;
          profile_image_url?: string | null;
          image_alt?: string;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          linkedin_url?: string | null;
          social_url?: string | null;
          show_email_publicly?: boolean;
          show_phone_publicly?: boolean;
          is_visible?: boolean;
          display_order?: number;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
          archived_at?: string | null;
        };
        Relationships: [];
      };
      website_settings: {
        Row: {
          id: string;
          setting_group: string;
          setting_key: string;
          setting_value: Json;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_group: string;
          setting_key: string;
          setting_value: Json;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_group?: string;
          setting_key?: string;
          setting_value?: Json;
          updated_by?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
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
    Enums: {
      admin_role: AdminRole;
      enquiry_status: EnquiryStatus;
      enquiry_priority: EnquiryPriority;
      delivery_status: DeliveryStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
