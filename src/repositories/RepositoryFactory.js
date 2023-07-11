import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import areaRepository from './areaRepository';
import newsRepository from './newsRepository';
import mediaRepository from './mediaRepository';
import tagRepository from './tagRepository';
import userRepository from './userRepository';
import registrationRepository from './registrationRepository';
import templateRepository from './templateRepository';
import popupBannersRepository from './popupBannerRepository';
import infographicsBannerRepository from './infographicsBannerRepository';
import quickLinkRepository from './quickLinkRepository';
import masterDataServiceRepository from './masterDataServiceRepository';
import masterDataPublicationRepository from './masterDatapublicationRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  area: areaRepository,
  news: newsRepository,
  media: mediaRepository,
  tag: tagRepository,
  user: userRepository,
  registration: registrationRepository,
  template: templateRepository,
  popupBanner: popupBannersRepository,
  infographicsBanner: infographicsBannerRepository,
  quickLink: quickLinkRepository,
  masterDataService: masterDataServiceRepository,
  masterDataPublication: masterDataPublicationRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
