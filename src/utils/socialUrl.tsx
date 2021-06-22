type SocialArgs = { id: string, base: string }

export default function createSocialUrl(social: SocialArgs): string {
  return `${social.base}${social.id}`;
}
