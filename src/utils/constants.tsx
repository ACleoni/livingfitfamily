type Link = {
  name: string;
  href: string;
};

export const menuLinks: Array<Link> = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Services',
    href: '/#services',
  },
  {
    name: 'Merch',
    href: '/merch',
  },
  {
    name: 'Contact',
    href: '/#contact',
  },
  {
    name: 'Login',
    href: '/login',
  },
];

export const api = Object.freeze({
  stripe: `https://api.stripe.com/v1/search?query="alexander.cleoni@gmail.com"&prefix=false`,
});
