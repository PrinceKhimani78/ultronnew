import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database, EnquiryRecord } from '@/lib/supabase/types';

export const ADMIN_ENQUIRIES_PAGE_SIZE = 20;

const ENQUIRY_LIST_COLUMNS =
  'id, reference_number, full_name, email, phone, company_name, business_type, service, status, priority, source_page, submitted_at, archived_at, created_at';

export function isPartnerLead(
  enquiry: Pick<EnquiryRecord, 'source_page'>,
): boolean {
  return (
    enquiry.source_page === '/partner' ||
    Boolean(
      enquiry.source_page &&
      enquiry.source_page.toLowerCase().includes('partner'),
    )
  );
}

export type EnquiryFilterParams = {
  kind: 'consultation' | 'partner';
  q?: string;
  status?: string;
  service?: string;
  priority?: string;
  page?: string;
  pageSize?: number;
};

export type EnquiryListResult = {
  items: EnquiryRecord[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  fromIndex: number;
  toIndex: number;
  error: string | null;
};

/**
 * Fetches enquiries using the same simple PostgREST query proven on `/admin`
 * and applies partner-vs-consultation classification, filters, search, and
 * pagination in TypeScript so PostgREST filter-syntax quirks cannot drop rows.
 */
export async function fetchFilteredEnquiries(
  supabase: SupabaseClient<Database>,
  params: EnquiryFilterParams,
): Promise<EnquiryListResult> {
  const pageSize = params.pageSize ?? ADMIN_ENQUIRIES_PAGE_SIZE;
  const parsedPage = Number.parseInt(params.page || '1', 10);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const fromIndex = (currentPage - 1) * pageSize;
  const toIndex = fromIndex + pageSize - 1;

  let query = supabase
    .from('enquiries')
    .select(ENQUIRY_LIST_COLUMNS)
    .order('created_at', { ascending: false });

  if (params.status === 'archived') {
    query = query.not('archived_at', 'is', null);
  } else {
    query = query.is('archived_at', null);
  }

  const { data: rawEnquiries, error } = await query;

  if (error) {
    console.error(`Failed to load ${params.kind} enquiries:`, error);
    return {
      items: [],
      totalRecords: 0,
      totalPages: 0,
      currentPage,
      fromIndex,
      toIndex,
      error: error.message || 'Database query error',
    };
  }

  const allRows = (rawEnquiries || []) as unknown as EnquiryRecord[];
  const searchTerm = params.q?.trim().toLowerCase() || '';

  const filtered = allRows.filter((item) => {
    const partner = isPartnerLead(item);
    if (params.kind === 'partner' ? !partner : partner) {
      return false;
    }

    if (
      params.status &&
      params.status !== 'all' &&
      params.status !== 'archived' &&
      item.status !== params.status
    ) {
      return false;
    }

    if (
      params.service &&
      params.service !== 'all' &&
      item.service !== params.service
    ) {
      return false;
    }

    if (
      params.priority &&
      params.priority !== 'all' &&
      item.priority !== params.priority
    ) {
      return false;
    }

    if (searchTerm) {
      const haystack = [
        item.reference_number,
        item.full_name,
        item.email,
        item.phone,
        item.company_name,
        item.business_type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });

  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const items = filtered.slice(fromIndex, toIndex + 1);

  return {
    items,
    totalRecords,
    totalPages,
    currentPage,
    fromIndex,
    toIndex,
    error: null,
  };
}

export function buildEnquiryPageHref(
  basePath: string,
  pageNumber: number,
  filters: {
    q?: string;
    status?: string;
    service?: string;
    priority?: string;
  },
): string {
  const search = new URLSearchParams();
  search.set('page', String(pageNumber));
  if (filters.q) search.set('q', filters.q);
  if (filters.status) search.set('status', filters.status);
  if (filters.service) search.set('service', filters.service);
  if (filters.priority) search.set('priority', filters.priority);
  return `${basePath}?${search.toString()}`;
}
