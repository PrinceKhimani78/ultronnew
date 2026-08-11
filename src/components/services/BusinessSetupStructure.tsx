import { SERVICES } from '@/content/services';
import { ServiceProcessStructure } from './ServiceProcessStructure';

const businessSetupService = SERVICES.find((s) => s.slug === 'business-setup')!;

export function BusinessSetupStructure() {
  return <ServiceProcessStructure service={businessSetupService} />;
}
