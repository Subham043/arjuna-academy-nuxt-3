import { API_ROUTES } from '~/utils/api_routes'

const runtimeConfig = useRuntimeConfig()

export default defineSitemapEventHandler(async () => {
  const achievers = await $fetch<{ achiverCategory: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.achieverCategory)
  const legals = await $fetch<{ legal: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.legal)
  const branch = await $fetch<{ branch: { slug: string, courses: { slug: string }[] }[] }>(runtimeConfig.public.apiURL + API_ROUTES.branch + '/all')
  const blog = await $fetch<{ blogs: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.blog + '/all')
  const event = await $fetch<{ events: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.event + '/all')
  const expertTip = await $fetch<{ expertTips: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.expertTip + '/all')
  const campaign = await $fetch<{ campaigns: { slug: string }[] }>(runtimeConfig.public.apiURL + API_ROUTES.campaign + '/all')

  return [
    ...achievers.achiverCategory.map(p => asSitemapUrl({
      loc: `/achievers/${p.slug}`
    })),
    ...legals.legal.map(p => asSitemapUrl({
      loc: `/legal/${p.slug}`
    })),
    ...branch.branch.map(i => i.courses.map(p => `/${i.slug}/courses/${p.slug}`)).flat().map(i => asSitemapUrl({
      loc: i
    })),
    ...blog.blogs.map(p => asSitemapUrl({
      loc: `/knowledge-desk/${p.slug}`
    })),
    ...event.events.map(p => asSitemapUrl({
      loc: `/events/${p.slug}`
    })),
    ...expertTip.expertTips.map(p => asSitemapUrl({
      loc: `/expert-tips/${p.slug}`
    })),
    ...campaign.campaigns.map(p => asSitemapUrl({
      loc: `/${p.slug}`
    }))
  ]
})
