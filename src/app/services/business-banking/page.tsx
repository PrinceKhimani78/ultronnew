import ServiceDetailPage, {
  generateMetadata as getServiceMetadata,
} from '../[slug]/page';

export async function generateMetadata() {
  return getServiceMetadata({
    params: Promise.resolve({ slug: 'business-banking' }),
  });
}

export default async function BusinessBankingPage() {
  return ServiceDetailPage({
    params: Promise.resolve({ slug: 'business-banking' }),
  });
}
